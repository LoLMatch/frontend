import { Injectable, OnDestroy } from '@angular/core';
import { API } from '@core/constants/api.const';
import { Store } from '@ngxs/store';
import { ActionType } from '@pages/messages/enums/action-type.enum';
import { MessageFromWebsocket, MessageTemplate } from '@pages/messages/interfaces/messages.interface';
import { RxStompService } from '@pages/messages/services/rx-stomp.service';
import { MarkChatRead, SaveMessage } from '@pages/messages/store/chat.actions';
import { ChangeStatus, ReceiveNewMessageOnActiveChat, ReceiveNewMessageOnSomeChat, ReceiveNewMessageOnSomeChatFromMe, SendMessageOnActiveChat } from '@pages/messages/store/contacts.actions';
import { RxStomp } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {

  private rxStomp: RxStomp;
  private myId: string;
  private activeContactId: string;
  private onDestroy$ = new Subject<void>();

  constructor(
    private rxStompService: RxStompService,
    private store: Store,
  ) { }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  init(token: string) {
    this.rxStomp = this.rxStompService.init(token);
    this.rxStomp.watch(API.WATCH + this.myId)
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe(
        (message: Message) => {
          const sth = JSON.parse(message.body) as MessageFromWebsocket;
          console.log(sth);
          switch (sth.action) {
            case ActionType.MESSAGE: {
              if (sth.senderId == this.myId) {
                if (sth.recipientId == this.activeContactId){
                  this.store.dispatch(new SendMessageOnActiveChat(sth.content, sth.createdAt));
                  this.store.dispatch(new SaveMessage({
                    text: sth.content,
                    isMe: true,
                    readAt: null,
                    sentAt: sth.createdAt
                  }));
                } else {
                  this.store.dispatch(new ReceiveNewMessageOnSomeChatFromMe(sth));
                }
              } else if (sth.senderId == this.activeContactId) {
                this.store.dispatch(new SaveMessage({
                  text: sth.content,
                  isMe: false,
                  readAt: new Date().toString(),
                  sentAt: sth.createdAt
                }));
                this.store.dispatch(new ReceiveNewMessageOnActiveChat(sth.content, sth.createdAt));
                this.markChatRead(false);
              } else {
                this.store.dispatch(new ReceiveNewMessageOnSomeChat(sth));
              }
              break;
            }
            case ActionType.MESSAGE_READ: {
              if (sth.senderId == this.myId) {
                this.store.dispatch(new MarkChatRead(sth.readAt));
              }
              break;
            }
            case ActionType.CHANGE_STATUS: {
              this.store.dispatch(new ChangeStatus(sth));
              break;
            }
          }
        }
      );
  }

  setActiveContactId(id: string) {
    this.activeContactId = id;
  }

  setMyId(id: string) {
    this.myId = id;
  }

  sendMessage(messageToSend: string) {
    const message: MessageTemplate = {
      type: ActionType.SEND,
      time: new Date(),
      content: messageToSend,
      senderId: this.myId,
      recipientId: this.activeContactId
    };
    this.store.dispatch(new SaveMessage({
      text: messageToSend,
      isMe: true,
      readAt: null,
      sentAt: message.time.toISOString()
    }));
    this.rxStomp.publish({ destination: API.PUBLISH, body: JSON.stringify(message) });
    this.store.dispatch(new SendMessageOnActiveChat(message.content, message.time.toISOString()));
    this.store.dispatch(new MarkChatRead(null));
  }

  markChatRead(isFirstTime?: boolean) {
    const message: MessageTemplate = {
      type: ActionType.MARK_READ,
      time: new Date(),
      content: null,
      senderId: this.activeContactId,
      recipientId: this.myId
    };
    this.rxStomp?.publish({ destination: API.PUBLISH, body: JSON.stringify(message) });
    if (!isFirstTime) {
      this.store.dispatch(new MarkChatRead(message.time.toISOString()));
    }
  }
}
