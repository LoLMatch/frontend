import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { Select, Store } from '@ngxs/store';
import { ChatService } from '@pages/messages/services/chat.service';
// import { rxStompServiceFactory } from '@pages/messages/services/rx-stomp-service-factory';
import { RxStompService } from '@pages/messages/services/rx-stomp.service';
import { LoadHistoricalMessages } from '@pages/messages/store/chat.actions';
import { ChatState } from '@pages/messages/store/chat.store';
import { ContactsState } from '@pages/messages/store/contacts.store';
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
    RouterModule
  ],
  providers: [
    {
      provide: RxStompService,
      // useFactory: rxStompServiceFactory,
    },
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
  @Select(ContactsState.getUsername) username$: Observable<string>;
  @Select(ChatState.getLastReadAt) readAt$: Observable<string>;

  receivedMessages: string[] = [];
  linkToMessages = `/${RoutesPath.HOME}/${RoutesPath.MESSAGES}`;
  private onDestroy$ = new Subject<void>();
  private myId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private rxStompService: RxStompService,
    private route: ActivatedRoute,
    private store: Store,
    private localStorageService: LocalStorageService,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    // console.log("init w czacie działa ", this.rxStomp);
    this.myId = this.localStorageService.getItem(KeyStorage.UserId);
    this.chatService.setMyId(this.myId);

    this.route.params.pipe(
      map((params) => params['id'] as string),
      takeUntil(this.onDestroy$),
    ).subscribe((id) => {
      this.chatService.setActiveContactId(id);
      this.store.dispatch(new LoadHistoricalMessages(this.myId, id));
      this.chatService.markChatRead();
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.chatService.setActiveContactId(this.route.snapshot.paramMap.get('id'));
    });
    this.chatService.init();
    // this.chatService.markChatRead();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  sendMessage() {
    const messageToSend = this.form.valid ? this.form.value.message : null;
    if (messageToSend != "" && messageToSend != null) {
      this.form.reset();
      this.chatService.sendMessage(messageToSend);
    }

  }

}
