import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { LoadHistoricalMessages, SaveMessage } from "@pages/messages/store/chat.actions";
import { map, tap } from "rxjs";
import { DisplayedMessage, MessageFromApi, MessagesApiResponse } from "../interfaces/messages.interface";
import { ApiService } from "../services/api.service";

export interface ChatStateModel {
  messages: DisplayedMessage[];
  recipentId: string;
  lastReadAt: string;
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    messages: [],
    recipentId: null,
    lastReadAt: null,
  }
})
@Injectable()
export class ChatState {
  
  constructor(private apiService: ApiService) {}

  @Selector()
  static getChatState(state: ChatStateModel): ChatStateModel {
    return state;
  }

  @Selector()
  static getMessages(state: ChatStateModel): any[] {
    return state?.messages;
  }

  @Selector()
  static getLastReadAt(state: ChatStateModel): any {
    return state?.lastReadAt;
  }

  @Action(SaveMessage)
  saveMessage({ getState, patchState }: StateContext<ChatStateModel>, action: SaveMessage) {
    const state = getState();
    patchState({
      messages: [action.message, ...state.messages,]
    });
  }

  @Action(LoadHistoricalMessages)
  loadHistoricalMessages({ patchState }: StateContext<ChatStateModel>, action: LoadHistoricalMessages) {
    const params = {
      firstUserId: action.myId,
      secondUserId: action.recipientId  
    };
    let readAt: string;
    this.apiService.getMessages(params).pipe(
      map((response: MessagesApiResponse) => {
        console.log(response)
        readAt = response.messages[0]?.readAt;
        return response.messages.map((message: MessageFromApi) => {
          const isMe = message.sender.id == action.myId;
          const text = message.content || '';
          return { text, isMe };
        });
      }),
      tap(displayedMessages => {
        patchState({
          messages: displayedMessages,
          lastReadAt: this.convertDate(readAt),
        });
      })
    ).subscribe()
  }

  private convertDate(date: string): string {
    if (date == null){
      return "";
    }
    const messageDate = new Date(date);
    const currentDate = new Date();

    if (
      currentDate.getFullYear() === messageDate.getFullYear() &&
      currentDate.getMonth() === messageDate.getMonth() &&
      currentDate.getDate() === messageDate.getDate()
    ) {
      const timeOnly = messageDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      return timeOnly;

    } else {
      const fullDate = messageDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      return fullDate;
    }
  }
}