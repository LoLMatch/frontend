import { ActionType, Status } from "@pages/messages/enums/action-type.enum";
import { User } from "./contacts.interface";

export interface MessageTemplate {
  type: ActionType;
  senderId: string;
  recipientId: string;
  content?: string | null;
  time: Date;
  parentId?: string | null;
}

export interface MessageFromWebsocket {
  id: string;
  action: ActionType;
  senderId: string;
  recipientId: string;
  content?: string | null;
  parentMessageId?: string | null;
  readAt?: string | null;
  createdAt: string;
  status?: Status | null;
}

export interface DisplayedMessage {
  text: string;
  isMe: boolean;
}

export interface MessageFromApi {
  id: string;
  content: string;
  createdAt: string;
  groupRecipientId?: string | null;
  parentMessage?: MessageFromApi | null;
  readAt: string;
  recipient: User;
  sender: User;
}

export interface MessagesApiResponse {
  amount: number;
  page: number;
  totalMessages: number;
  messages: MessageFromApi[]
}