export interface Contact {
  contactId: string,
  username: string,
  isActive: boolean,
  unreadMessages: number,
  lastMessage: string,
  lastMessageSenderId: string
}

export interface User {
    contactId: string,
    username: string
    group: string[],
}

export interface ContactsListFromApi {
    contacts: Contact[],
    user: User,
}

export interface ContactListItem {
  name: string,
  message: string,
  unreadMessages: number,
  id: string,
  isActive: boolean,
}
