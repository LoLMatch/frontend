import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Status } from "@pages/messages/enums/action-type.enum";
import { ContactListItem, ContactsListFromApi } from "@pages/messages/interfaces/contacts.interface";
import { ApiService } from "@pages/messages/services/api.service";
import {
  OpenChat,
  ReceiveNewMessageOnActiveChat,
  ReceiveNewMessageOnSomeChat,
  SendMessageOnActiveChat,
  LoadContacts,
  ChangeStatus
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

  constructor(private apiService: ApiService) {}

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
    const contact = state.contacts.find(con => con.id === state.contactId);
    return contact ? contact.name : "";
  }

  @Selector()
  static getNotifications(state: ContactsStateModel): boolean {
    return state.contacts.some(con => con.unreadMessages > 0);
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
          createdAt: this.convertDate(action.createdAt)
        };
      }
      return contact;
    });
    patchState({
      contacts: updatedContacts,
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
          createdAt: this.convertDate(action.message.createdAt)
        };
      }
      return contact;
    });
    patchState({
      contacts: updatedContacts,
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
          createdAt: this.convertDate(action.createdAt)
        };
      }
      return contact;
    });
    patchState({
      contacts: updatedContacts,
    });
  }

  @Action(ChangeStatus)
  changeStatus({ getState, patchState }: StateContext<ContactsStateModel>, action: ChangeStatus) {
    const state = getState();
    const updatedContacts = state.contacts.map(contact => {
      if (contact.id === action.message.id) {
        return {
          ...contact,
          isActive: action.message.status == Status.ACTIVE ? true : false
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
          console.log(res);
          return res.contacts.map((con) => {
              const contact: ContactListItem = {
                  id: con.contactId,
                  name: con.username,
                  unreadMessages: con.unreadMessages,
                  message: con.lastMessageSenderId == params.id ? "Ty: " + con.lastMessage : con.lastMessage,
                  isActive: con.isActive,
                  createdAt: this.convertDate(con.lastMessageTimestamp)
              };
              return contact;
          });
        }),
        tap(allContacts => {
            patchState({
                contacts: allContacts,
            });
        })
    );
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
