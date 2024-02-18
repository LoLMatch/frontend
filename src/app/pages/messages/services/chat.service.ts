import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.const';
import { Store } from '@ngxs/store';
import { ActionType } from '@pages/messages/enums/action-type.enum';
import { MessageTemplate } from '@pages/messages/interfaces/messages.interface';
import { RxStompService } from '@pages/messages/services/rx-stomp.service';
import { SaveMessage } from '@pages/messages/store/chat.actions';
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
    this.rxStomp = this.rxStompService.stomp();
    console.log("init działa ", this.rxStomp);
    this.rxStomp.watch(API.WATCH + this.myId)
      .subscribe((message: Message) => {
        const sth = JSON.parse(message.body) as MessageTemplate;
        // this.receivedMessages.push(sth.content);
        console.log(sth);
        if (sth.senderId == this.activeContactId) {
          this.store.dispatch(new SaveMessage({
            text: sth.content,
            isMe: false
          }));
        } else {
          // TODO zrobić serwis zarządzający listą kontaktów z wiadomościami
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
  }



}
