import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { AuthService } from '@core/services/auth/auth.service';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { ActiveLinkDirective } from '@layout/components/side-bar/link/link.directive';
import { Select, Store } from '@ngxs/store';
import { ContactItemComponent } from '@pages/messages/components/contact-item/contact-item.component';
import { ContactListItem } from '@pages/messages/interfaces/contacts.interface';
import { MOCK_CONTACTS } from '@pages/messages/mock/contacts.mock';
import { LoadContacts, OpenChat } from '@pages/messages/store/contacts.actions';
import { ContactsState } from '@pages/messages/store/contacts.store';
import { Observable, combineLatest, debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'ds-contacts-list',
  standalone: true,
  imports: [
    CommonModule,
    ContactItemComponent,
    MatInputModule,
    MatIconModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    ActiveLinkDirective,
    HttpClientModule
  ],
  providers: [
    HttpClient
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent implements OnInit {
  chats = MOCK_CONTACTS;

  control = this.fb.control(null as string)
  pathToMessages = `/${RoutesPath.HOME}/${RoutesPath.MESSAGES}/`;

  @Select(ContactsState.getContacts) contacts$: Observable<ContactListItem[]>;
  filteredChats$: Observable<ContactListItem[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.filteredChats$ = combineLatest([this.contacts$,this.control.valueChanges.pipe(startWith(""))]).pipe(
      debounceTime(400),
      map(([list,value])=> value ? list?.filter((item) => item?.name?.toLowerCase()?.includes(value?.toLowerCase())) || [] : list)
    )
    this.authService.loadProfile().subscribe((user) => {
      this.localStorageService.setItem(KeyStorage.UserId, user.id);
      this.store.dispatch(new LoadContacts(user.id));
    });
  }

  goToChat(chatId: string) {
    this.store.dispatch(new OpenChat(chatId));
    void this.router.navigate([this.pathToMessages, chatId]);
  }
}
