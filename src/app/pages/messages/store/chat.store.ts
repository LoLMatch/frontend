import { Injectable } from "@angular/core";
import { KeyStorage } from "@core/enums/key-storage.enum";
import { LocalStorageService } from "@core/services/localStorage/local-storage.service";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { DisplayedMessage, MessageFromApi, MessagesApiResponse } from "@pages/messages/interfaces/messages.interface";
import { ApiService } from "@pages/messages/services/api.service";
import { ClearChatStore, LoadHistoricalMessages, MarkChatRead, SaveMessage, SetMessagesPageAndRecipient } from "@pages/messages/store/chat.actions";
import { map, tap } from "rxjs";

export interface ChatStateModel {
  messages: DisplayedMessage[];
  recipientId: string;
  messagesPage: number;
  totalMessages: number
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    messages: [],
    recipientId: null,
    messagesPage: null,
    totalMessages: null,
  }
})
@Injectable()
export class ChatState {

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService  
  ) {}

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
    return state?.messages[0]?.readAt;
  }

  @Action(SaveMessage)
  saveMessage({ getState, patchState }: StateContext<ChatStateModel>, action: SaveMessage) {
    const state = getState();
    const message: DisplayedMessage = {
      text: action.message.text,
      isMe: action.message.isMe,
      readAt: this.convertDate(action.message.readAt)
    }
    patchState({
      messages: [message, ...state.messages,],
      totalMessages: state.totalMessages + 1,
    });
  }

  @Action(MarkChatRead)
  markChatRead({getState, patchState }: StateContext<ChatStateModel>, action: MarkChatRead){
    const state = getState();
    if (state.messages.length === 0) {
      return;
    }
    if ((state.messages[0]?.isMe && state.messages[0]?.readAt) || (!state.messages[0]?.isMe && state.messages[0]?.readAt)){
      return;
    };
    const message = {
      text: state.messages[0]?.text,
      isMe: state.messages[0]?.isMe,
      readAt: this.convertDate(action.seenAt)
    }
    const updatedMessages = [message, ...state.messages.slice(1)];
    patchState({
      messages: updatedMessages
    })
  }

  @Action(SetMessagesPageAndRecipient)
  setMessagesPageAndRecipient({ patchState }: StateContext<ChatStateModel>, action: SetMessagesPageAndRecipient){
    patchState({
      messagesPage: action.page,
      recipientId: action.recipientId,
      totalMessages: null,
    });
  }

  @Action(LoadHistoricalMessages)
  loadHistoricalMessages({ getState, patchState }: StateContext<ChatStateModel>) {
    const myId: string = this.localStorageService.getItem(KeyStorage.UserId);
    const state = getState();
    const params = {
      firstUserId: myId,
      secondUserId: state.recipientId,
      page: state.messagesPage,
    };
    let total: number;
    if (state.messages.length == state.totalMessages){
      return 0;
    }
    return this.apiService.getMessages(params).pipe(
      map((response: MessagesApiResponse) => {
        total = response.totalMessages;
        return response.messages.map((message: MessageFromApi) => {
          const isMe = message.sender.id == myId;
          const text = message.content || '';
          const readAt = this.convertDate(message.readAt);
          return { text, isMe, readAt };
        });
      }),
      tap(displayedMessages => {
        patchState({
          messages: state.messages.concat(displayedMessages),
          messagesPage: state.messagesPage + 1,
          totalMessages: total,
        });
      })
    )
  }

  @Action(ClearChatStore)
  clearChatStore({ setState }: StateContext<ChatStateModel>){
    setState({
      messages: [],
      recipientId: null,
      messagesPage: null,
      totalMessages: null,
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
