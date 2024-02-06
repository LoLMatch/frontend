export class SaveMessage {
  static readonly type = '[Chat] Save message';
  constructor(public message: unknown) { }
}

export class LoadHistoricalMessages {
  static readonly type = '[Chat] Load historical messages';
  constructor(public recipientId: string) { }
}