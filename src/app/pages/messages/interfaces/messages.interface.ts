import { ActionType } from "@pages/messages/enums/action-type.enum";

export interface MessageTemplate {
  type: ActionType;
  senderId: string;
  recipientId: string;
  content?: string | null;
  time: Date;
  parentId?: string | null;
}
