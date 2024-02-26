import { DisplayedMessage } from "@pages/messages/interfaces/messages.interface";

export class SaveMessage {
  static readonly type = '[Chat] Save message';
  constructor(public message: DisplayedMessage) { }
}

export class LoadHistoricalMessages {
  static readonly type = '[Chat] Load historical messages';
  constructor(public myId: string, public recipientId: string) { }
}

export class MarkChatRead {
  static readonly type = '[Chat] Mark chat read';
  constructor(public seenAt: string) { }
}