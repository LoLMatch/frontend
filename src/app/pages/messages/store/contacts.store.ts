import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { lastActiveFormatter } from "@pages/messages/constants/convert-last-active.const";
import { sortContacts } from "@pages/messages/constants/sort-contacts.const";
import { Status } from "@pages/messages/enums/action-type.enum";
import { ContactListItem, ContactsListFromApi } from "@pages/messages/interfaces/contacts.interface";
import { ChatApiService } from "@pages/messages/services/chat-api.service";
import {
  ChangeStatus,
  LoadContacts,
  OpenChat,
  ReceiveNewMessageOnActiveChat,
  ReceiveNewMessageOnSomeChat,
  ReceiveNewMessageOnSomeChatFromMe,
  SendMessageOnActiveChat
} from "@pages/messages/store/contacts.actions";
import { map, tap } from "rxjs";

export interface ContactsStateModel {
  contacts: ContactListItem[];
  contactId: string;
}

@State<ContactsStateModel>({
  name: 'contacts',
  defaults: {
    contacts: [],
    contactId: null
  }
})
@Injectable()
export class ContactsState {

  constructor(private apiService: ChatApiService) { }

  @Selector()
  static getContactsState(state: ContactsStateModel): ContactsStateModel {
    return state;
  }
  @Selector()
  static getContacts(state: ContactsStateModel): any[] {
    return state?.contacts;
  }

  @Selector()
  static getUsername(state: ContactsStateModel): string {
    const contact = state.contacts?.find(con => con.id === state.contactId);
    return contact ? contact.name : "";
  }

  @Selector()
  static getNotifications(state: ContactsStateModel): boolean {
    return state.contacts.some(con => con.unreadMessages > 0);
  }

  @Selector()
  static getLastActiveTimestamp(state: ContactsStateModel): string {
    const contact = state.contacts?.find(con => con.id === state.contactId);
    if (contact.isActive){
      return "now"
    }
    return lastActiveFormatter(contact.lastActive);
  }

  @Action(OpenChat)
  openChat({ getState, patchState }: StateContext<ContactsStateModel>, action: OpenChat) {
    const state = getState();
    const updatedContacts = state.contacts.map(contact => {
      if (contact.id === action.id) {
        return {
          ...contact,
          unreadMessages: 0,
        };
      }
      return contact;
    });
    patchState({
      contactId: action.id,
      contacts: updatedContacts,
    });
  }

  @Action(ReceiveNewMessageOnActiveChat)
  receiveMessageOnActiveChat({ getState, patchState }: StateContext<ContactsStateModel>, action: ReceiveNewMessageOnActiveChat) {
    const state = getState();
    const updatedContacts = state.contacts.map(contact => {
      if (contact.id === state.contactId) {
        return {
          ...contact,
          message: action.message,
          createdAt: action.createdAt
        };
      }
      return contact;
    });
    patchState({
      contacts: sortContacts(updatedContacts),
    });
  }

  @Action(ReceiveNewMessageOnSomeChat)
  receiveMessageOnSomeChat({ getState, patchState }: StateContext<ContactsStateModel>, action: ReceiveNewMessageOnSomeChat) {
    const state = getState();
    const updatedContacts = state.contacts.map(contact => {
      if (contact.id === action.message.senderId) {
        return {
          ...contact,
          message: action.message.content,
          unreadMessages: contact.unreadMessages + 1,
          createdAt: action.message.createdAt
        };
      }
      return contact;
    });
    patchState({
      contacts: sortContacts(updatedContacts),
    });
  }

  @Action(ReceiveNewMessageOnSomeChatFromMe)
  receiveMessageOnSomeChatFromMe({ getState, patchState }: StateContext<ContactsStateModel>, action: ReceiveNewMessageOnSomeChatFromMe) {
    const state = getState();
    const updatedContacts = state.contacts.map(contact => {
      if (contact.id === action.message.recipientId) {
        return {
          ...contact,
          message: "Ty: " + action.message.content,
          unreadMessages: contact.unreadMessages,
          createdAt: action.message.createdAt
        };
      }
      return contact;
    });
    patchState({
      contacts: sortContacts(updatedContacts),
    });
  }

  @Action(SendMessageOnActiveChat)
  sendMessageOnActiveChat({ getState, patchState }: StateContext<ContactsStateModel>, action: SendMessageOnActiveChat) {
    const state = getState();
    const updatedContacts = state.contacts.map(contact => {
      if (contact.id === state.contactId) {
        return {
          ...contact,
          message: "Ty: " + action.message,
          createdAt: action.createdAt
        };
      }
      return contact;
    });
    patchState({
      contacts: sortContacts(updatedContacts),
    });
  }

  @Action(ChangeStatus)
  changeStatus({ getState, patchState }: StateContext<ContactsStateModel>, action: ChangeStatus) {
    const state = getState();
    const updatedContacts = state.contacts.map(contact => {
      if (contact.id === action.message.id) {
        return {
          ...contact,
          isActive: action.message.status == Status.ACTIVE ? true : false,
          lastActive: action.message.status == Status.INACTIVE ? new Date().toString() : contact.lastActive,
        };
      }
      return contact;
    });
    patchState({
      contacts: updatedContacts,
    });
  }

  @Action(LoadContacts)
  loadContacts({ patchState }: StateContext<ContactsStateModel>, action: LoadContacts) {
    const params = {
      id: action.myId,
    };
    return this.apiService.getContacts(params).pipe(
      map((res: ContactsListFromApi) => {
        return res.contacts.map((con) => {
          const contact: ContactListItem = {
            id: con.contactId,
            name: con.username,
            unreadMessages: con.unreadMessages,
            message: con.lastMessageSenderId == params.id ? "Ty: " + con.lastMessage : con.lastMessage,
            isActive: con.isActive,
            createdAt: con.lastMessageTimestamp,
            lastActive: con.lastActiveTimestamp
          };
          return contact;
        });
      }),
      tap(allContacts => {
        patchState({
          contacts: sortContacts(allContacts),
        });
      })
    );
  }
}
