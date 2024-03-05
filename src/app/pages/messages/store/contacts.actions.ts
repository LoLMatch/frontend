import { MessageFromWebsocket, MessageTemplate } from "@pages/messages/interfaces/messages.interface";

export class LoadContacts {
  static readonly type = '[Contacts] Load all my contacts';
  constructor(public myId: string) { }
}

export class OpenChat {
  static readonly type = '[Contacts] Open chat and set unread messages to 0';
  constructor(public id: string) {}
}

export class ReceiveNewMessageOnActiveChat {
  static readonly type = '[Contacts] Set last message';
  constructor(public message: string, public createdAt: string) {}
}

export class ReceiveNewMessageOnSomeChat {
  static readonly type = '[Contacts] Set last message and other stuff';
  constructor(public message: MessageFromWebsocket) {}
}

export class ReceiveNewMessageOnSomeChatFromMe {
  static readonly type = '[Contacts] Set last message and other stuff when it is send by myself';
  constructor(public message: MessageFromWebsocket) {}
}

export class SendMessageOnActiveChat {
  static readonly type = '[Contacts] Set last message and time of sent message';
  constructor(public message: string, public createdAt: string) {}
}

export class ChangeStatus {
  static readonly type = '[Contacts] Change status';
  constructor(public message: MessageFromWebsocket) {}
}