import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { Select, Store } from '@ngxs/store';
import { DisplayedMessage } from '@pages/messages/interfaces/messages.interface';
import { ChatService } from '@pages/messages/services/chat.service';
import { ClearChatStore, LoadHistoricalMessages, SetMessagesPageAndRecipient } from '@pages/messages/store/chat.actions';
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
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    message: [null as string, [Validators.minLength(1), Validators.maxLength(512)]]
  });

  @Select(ChatState.getMessages) messages$: Observable<DisplayedMessage[]>;
  @Select(ContactsState.getUsername) username$: Observable<string>;
  @Select(ChatState.getLastReadAt) readAt$: Observable<string>;

  linkToMessages = `/${RoutesPath.HOME}/${RoutesPath.MESSAGES}`;
  private onDestroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private chatService: ChatService,
  ) { }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    if (element.scrollTop === (element.scrollHeight - element.clientHeight) * -1) {
      this.store.dispatch(new LoadHistoricalMessages());
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map((params) => params['id'] as string),
      takeUntil(this.onDestroy$),
    ).subscribe((id) => {
      this.chatService.setActiveContactId(id);
      this.store.dispatch(new ClearChatStore());
      this.store.dispatch(new SetMessagesPageAndRecipient(0, id));
      this.chatService.markChatRead(true); // tu jest problem z odświeżaniem
      this.store.dispatch(new LoadHistoricalMessages());
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.onDestroy$),
    ).subscribe(() => {
      this.chatService.setActiveContactId(this.route.snapshot.paramMap.get('id'));
      this.chatService.markChatRead(true);
      this.store.dispatch(new LoadHistoricalMessages());
    });
    this.chatService.markChatRead(true);
    this.store.dispatch(new LoadHistoricalMessages());
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
