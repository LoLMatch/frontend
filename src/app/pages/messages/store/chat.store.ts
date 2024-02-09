import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MOCK_CONTACTS } from "@pages/messages/mock/contacts.mock";
import { MOCK_MESSAGES } from "@pages/messages/mock/messages.mock";
import { LoadHistoricalMessages, SaveMessage } from "@pages/messages/store/chat.actions";

export interface ChatStateModel {
  messages: unknown[];
  recipentId: string;
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    messages: [],
    recipentId: null,
  }
})
@Injectable()
export class ChatState {

  @Selector()
  static getChartState(state: ChatStateModel): ChatStateModel {
    return state;
  }
  @Selector()
  static getMessages(state: ChatStateModel): any[] {
    return state?.messages;
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
    //tu powinien isc strzal do api o historie
    patchState({
      messages: MOCK_MESSAGES,
    });
  }

}