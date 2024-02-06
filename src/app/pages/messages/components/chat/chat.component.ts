import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ApiChatRoutes } from '@core/constants/api.chat.const';
import { RoutesPath } from '@core/constants/routes.const';
import { ActionType } from '@pages/messages/enums/action-type.enum';
import { MessageTemplate } from '@pages/messages/interfaces/messages.interface';
import { MOCK_MESSAGES } from '@pages/messages/mock/messages.mock';
import { rxStompServiceFactory } from '@pages/messages/services/rx-stomp-service-factory';
import { RxStompService } from '@pages/messages/services/rx-stomp.service';
import { Message } from '@stomp/stompjs';
import { Subject, filter, map, takeUntil } from 'rxjs';

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
      useFactory: rxStompServiceFactory,
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
  messages = MOCK_MESSAGES;
  receivedMessages: string[] = [];
  recipientId: string;
  linkToMessages = `/${RoutesPath.HOME}/${RoutesPath.MESSAGES}`;
  private onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rxStompService: RxStompService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipientId = this.route.snapshot.paramMap.get('id');
    this.rxStompService.watch(ApiChatRoutes.WATCH + 'fd0a67ca-1fe7-4759-854b-4ba0a1ac818e').pipe(takeUntil(this.onDestroy$)).subscribe((message: Message) => {
      const sth = JSON.parse(message.body) as MessageTemplate;

      if (sth.senderId == this.recipientId) {
        this.messages = [
          {
            text: sth.content,
            isMe: false
          },
          ...this.messages,
        ];
        this.cdr.detectChanges();
      } else {
        // TODO zrobić serwis zarządzający listą kontaktów z wiadomościami
      }
    });

    this.route.params.pipe(
      map((params) => params['id'] as string),
      takeUntil(this.onDestroy$),
    ).subscribe((id) => {
      this.recipientId = id;
    }
    );

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.recipientId = this.route.snapshot.paramMap.get('id');
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  sendMessage() {
    const messageToSend = this.form.value.message;
    if (messageToSend != "" && messageToSend != null) {
      this.form.reset();

      const message: MessageTemplate = {
        type: ActionType.SEND,
        time: new Date(),
        content: messageToSend,
        senderId: "fd0a67ca-1fe7-4759-854b-4ba0a1ac818e",
        recipientId: this.recipientId
      };

      this.messages = [
        {
          text: messageToSend,
          isMe: true
        },
        ...this.messages,
      ];
      this.rxStompService.publish({ destination: ApiChatRoutes.PUBLISH, body: JSON.stringify(message) });
    }

  }

}
