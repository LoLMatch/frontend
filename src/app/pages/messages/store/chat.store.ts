import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DisplayedMessage, MessagesApiResponse, MessageFromApi } from "@pages/messages/interfaces/messages.interface";
import { ApiService } from "@pages/messages/services/api.service";
import { ClearChatStore, LoadHistoricalMessages, MarkChatRead, MarkChatReadOnNewChat, SaveMessage } from "@pages/messages/store/chat.actions";
import { map, tap } from "rxjs";

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

  @Action(MarkChatReadOnNewChat)
  markChatReadOnNewChat({getState, patchState }: StateContext<ChatStateModel>, action: MarkChatReadOnNewChat){
    const state = getState();
    console.log("na otwarciu ", state.messages[0], state.lastReadAt);
    if (state.messages[0].isMe || (!state.messages[0].isMe && state.messages[0].readAt)){
      return;
    }
    let seen = this.convertDate(new Date().toISOString());
    patchState({
      lastReadAt: seen
    });
  }

  @Action(MarkChatRead)
  markChatRead({getState, patchState }: StateContext<ChatStateModel>, action: MarkChatRead){
    if(action.seenAt == null){
      patchState({
        lastReadAt: null
      });
      return;
    }
    const state = getState();
    console.log(state.messages[0], state.lastReadAt);
    if ((state.messages[0].isMe && state.messages[0].readAt) || (!state.messages[0].isMe && state.lastReadAt)){
      return;
    }
    let seen = this.convertDate(action.seenAt);
    patchState({
      lastReadAt: seen
    });
  }

  @Action(LoadHistoricalMessages)
  loadHistoricalMessages({ patchState }: StateContext<ChatStateModel>, action: LoadHistoricalMessages) {
    const params = {
      firstUserId: action.myId,
      secondUserId: action.recipientId
    };
    let readAt: string;
    return this.apiService.getMessages(params).pipe(
      map((response: MessagesApiResponse) => {
        console.log(response)
        readAt = response.messages[0]?.readAt;
        return response.messages.map((message: MessageFromApi) => {
          const isMe = message.sender.id == action.myId;
          const text = message.content || '';
          const readAt = message.readAt;
          return { text, isMe, readAt };
        });
      }),
      tap(displayedMessages => {
        patchState({
          messages: displayedMessages,
          lastReadAt: this.convertDate(readAt),
        });
      })
    )
  }

  @Action(ClearChatStore)
  clearChatStore({ setState }: StateContext<ChatStateModel>){
    setState({
      messages: [],
      recipentId: null,
      lastReadAt: null,
    })
  }

  private convertDate(date: string): string {
    if (date == null){
      return "";
    };
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
