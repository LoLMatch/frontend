import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.const';
import { Store } from '@ngxs/store';
import { ActionType } from '@pages/messages/enums/action-type.enum';
import { MessageFromWebsocket, MessageTemplate } from '@pages/messages/interfaces/messages.interface';
import { RxStompService } from '@pages/messages/services/rx-stomp.service';
import { SaveMessage } from '@pages/messages/store/chat.actions';
import { ChangeStatus, ReceiveNewMessageOnActiveChat, ReceiveNewMessageOnSomeChat, SendMessageOnActiveChat } from '@pages/messages/store/contacts.actions';
import { RxStomp } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private rxStomp: RxStomp;
  private myId: string;
  private activeContactId: string;

  constructor(
    private rxStompService: RxStompService,
    private store: Store,
  ) {  }

  init(){
    if (this.rxStomp == null){
      this.rxStomp = this.rxStompService.stomp();
    }
    console.log("init działa ", this.rxStomp);
    this.rxStomp.watch(API.WATCH + this.myId)
      .subscribe((message: Message) => {
        const sth = JSON.parse(message.body) as MessageFromWebsocket;
        console.log(sth)
        switch (sth.action) {
          case ActionType.MESSAGE: {
            if (sth.senderId == this.activeContactId){
              this.store.dispatch(new SaveMessage({
                text: sth.content,
                isMe: false
              }));
              this.store.dispatch(new ReceiveNewMessageOnActiveChat(sth.content, sth.createdAt));
              this.markChatRead();
            } else {
              this.store.dispatch(new ReceiveNewMessageOnSomeChat(sth));
            }   
            break;   
          }
          case ActionType.MESSAGE_READ: {

            break;
          }
          case ActionType.CHANGE_STATUS: {
            this.store.dispatch(new ChangeStatus(sth));
            break
          }
        }
    });
  }

  setActiveContactId(id: string){
    this.activeContactId = id;
  }

  setMyId(id: string){
    this.myId = id;
  }

  sendMessage(messageToSend: string){
    const message: MessageTemplate = {
      type: ActionType.SEND,
      time: new Date(),
      content: messageToSend,
      senderId: this.myId,
      recipientId: this.activeContactId
    };

    this.store.dispatch(new SaveMessage({
      text: messageToSend,
      isMe: true
    }));
    this.rxStomp.publish({ destination: API.PUBLISH, body: JSON.stringify(message) });
    console.log(message.time)
    this.store.dispatch(new SendMessageOnActiveChat(message.content, message.time.toISOString()));
  }

  markChatRead(){
    const message: MessageTemplate = {
      type: ActionType.MARK_READ,
      time: new Date(),
      content: null,
      senderId: this.myId,
      recipientId: this.activeContactId
    };
    this.rxStomp.publish({ destination: API.PUBLISH, body: JSON.stringify(message) });
  }
}
