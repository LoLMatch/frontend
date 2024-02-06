/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Message } from '@stomp/stompjs';
import { Subscription, filter } from 'rxjs';
// import * as SockJS from 'sockjs-client';
import { ApiChatRoutes } from '@core/constants/api.chat.const';
import { rxStompServiceFactory } from '@pages/messages/services/rx-stomp-service-factory';
import { RxStompService } from '@pages/messages/services/rx-stomp.service';
import { MessageTemplate } from '@pages/messages/interfaces/messages.interface';
import { ActionType } from '@pages/messages/enums/action-type.enum';

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
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  messages = [
    {
      text: "wwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwrrrrrrrrrrrrrrrrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrrd wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "aaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaaaaaaaaaaaaaaaaa",
      isMe: false
    },
  ];

  form: FormGroup;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  receivedMessages: string[] = [];
  recipientId: string;
  private topicSubscription: Subscription;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private rxStompService = inject(RxStompService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    this.recipientId = this.route.snapshot.paramMap.get('id');

    this.form = this.fb.group({
      message: [null as string, [Validators.minLength(1), Validators.maxLength(512)]]
    });

    this.topicSubscription = this.rxStompService.watch(ApiChatRoutes.WATCH + 'fd0a67ca-1fe7-4759-854b-4ba0a1ac818e').subscribe((message: Message) => {
      const sth = JSON.parse(message.body);
      if (sth.senderId == this.recipientId){
        this.messages = [
          ...this.messages,
          {
            text: sth.content,
            isMe: false
          }
        ];
        this.cdr.detectChanges();
      } else {
        // TODO zrobić serwis zarządzający listą kontaktów z wiadomościami
      }
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.recipientId = this.route.snapshot.paramMap.get('id');
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    });
  }

  ngAfterViewInit() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  sendMessage(){
    const messageToSend = this.form.value.message;
    if (messageToSend != "" && messageToSend != null){
      this.form.reset();

      const message : MessageTemplate = {
        type: ActionType.SEND,
        time: new Date(),
        content: messageToSend,
        senderId: this.recipientId,
        recipientId: "fd0a67ca-1fe7-4759-854b-4ba0a1ac818e"
      };

      this.messages = [
        ...this.messages,
        {
          text: messageToSend,
          isMe: true
        }
      ];
      this.rxStompService.publish({destination: ApiChatRoutes.PUBLISH, body: JSON.stringify(message)});
    }

  }

}
