import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { API } from '@core/constants/api.const';
import { RoutesPath } from '@core/constants/routes.const';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { Select, Store } from '@ngxs/store';
import { ActionType } from '@pages/messages/enums/action-type.enum';
import { MessageTemplate } from '@pages/messages/interfaces/messages.interface';
import { ChatService } from '@pages/messages/services/chat.service';
// import { rxStompServiceFactory } from '@pages/messages/services/rx-stomp-service-factory';
import { RxStompService } from '@pages/messages/services/rx-stomp.service';
import { LoadHistoricalMessages, SaveMessage } from '@pages/messages/store/chat.actions';
import { ChatState } from '@pages/messages/store/chat.store';
import { RxStomp } from '@stomp/rx-stomp';
import { Message } from '@stomp/stompjs';
import { Observable, Subject, filter, map, takeUntil } from 'rxjs';

@Component({
  selector: 'ds-chat',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    {
      provide: RxStompService,
      // useFactory: rxStompServiceFactory,
    },
    HttpClient,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    message: [null as string, [Validators.minLength(1), Validators.maxLength(512)]]
  });
  @Select(ChatState.getMessages) messages$: Observable<any[]>;

  receivedMessages: string[] = [];
  recipientId: string;
  linkToMessages = `/${RoutesPath.HOME}/${RoutesPath.MESSAGES}`;
  private onDestroy$ = new Subject<void>();
  private rxStomp: RxStomp;
  private myId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rxStompService: RxStompService,
    private route: ActivatedRoute,
    private store: Store,
    private localStorageService: LocalStorageService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    // this.rxStomp = this.rxStompService.stomp();
    // console.log("init w czacie działa ", this.rxStomp);
    this.myId = this.localStorageService.getItem(KeyStorage.UserId);
    this.chatService.setMyId(this.myId);

    // this.rxStomp.watch(API.WATCH + this.myId)
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe((message: Message) => {
    //     const sth = JSON.parse(message.body) as MessageTemplate;
    //     this.receivedMessages.push(sth.content);
    //     console.log(sth);
    //     if (sth.senderId == this.recipientId) {
    //       this.store.dispatch(new SaveMessage({
    //         text: sth.content,
    //         isMe: false
    //       }));
    //     } else {
    //       // TODO zrobić serwis zarządzający listą kontaktów z wiadomościami
    //     }
    // });

    this.route.params.pipe(
      map((params) => params['id'] as string),
      takeUntil(this.onDestroy$),
    ).subscribe((id) => {
      this.recipientId = id;
      this.chatService.setActiveContactId(id);
      this.store.dispatch(new LoadHistoricalMessages(id));
    }
    );

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.recipientId = this.route.snapshot.paramMap.get('id');
    });

    this.chatService.init();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  sendMessage() {
    const messageToSend = this.form.value.message;
    if (messageToSend != "" && messageToSend != null) {
      this.form.reset();

      // const message: MessageTemplate = {
      //   type: ActionType.SEND,
      //   time: new Date(),
      //   content: messageToSend,
      //   senderId: this.myId,
      //   recipientId: this.recipientId
      // };

      // this.store.dispatch(new SaveMessage({
      //   text: messageToSend,
      //   isMe: true
      // }));
      // this.rxStomp.publish({ destination: API.PUBLISH, body: JSON.stringify(message) });
      this.chatService.sendMessage(messageToSend);
    }

  }

}
