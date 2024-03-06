import { DisplayedMessage } from "@pages/messages/interfaces/messages.interface";

export class SaveMessage {
  static readonly type = '[Chat] Save message';
  constructor(public message: DisplayedMessage) { }
}

export class SetMessagesPageAndRecipient {
  static readonly type = '[Chat] Set messages page and recipientId';
  constructor(public page: number, public recipientId: string) { }
}

export class LoadHistoricalMessages {
  static readonly type = '[Chat] Load historical messages';
  constructor() { }
}

export class MarkChatRead {
  static readonly type = '[Chat] Mark chat read';
  constructor(public seenAt: string) { }
}

export class ClearChatStore {
  static readonly type = '[Chat] Clear chat';
  constructor() { }
}
