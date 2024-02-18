import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { API } from '@core/constants/api.const';
import { RoutesPath } from '@core/constants/routes.const';
import { KeyStorage } from '@core/enums/key-storage.enum';
import { AuthService } from '@core/services/auth/auth.service';
import { LocalStorageService } from '@core/services/localStorage/local-storage.service';
import { environment } from '@env/environment';
import { ActiveLinkDirective } from '@layout/components/side-bar/link/link.directive';
import { ContactItemComponent } from '@pages/messages/components/contact-item/contact-item.component';
import { ContactListItem, ContactsListFromApi } from '@pages/messages/interfaces/contacts.interface';
import { MOCK_CONTACTS } from '@pages/messages/mock/contacts.mock';

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

  filteredChats: ContactListItem[] = this.chats;

  form = this.fb.group({
    nameToFilter: [null as string],
  });
  pathToMessages = `/${RoutesPath.HOME}/${RoutesPath.MESSAGES}/`;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.authService.loadProfile().subscribe((user) => {
      const params = {
        id: user.id,
      };

      this.localStorageService.setItem(KeyStorage.UserId, user.id);

      this.http.get<ContactsListFromApi>(`${environment.httpChat}${API.CONTACTS}`, { params }).subscribe((res: ContactsListFromApi) => {
        console.log(res);
        for (let i = 0; i < res.contacts.length; i++) {
          const contact: ContactListItem = {
            id: res.contacts[i].contactId,
            name: res.contacts[i].username,
            unreadMessages: res.contacts[i].unreadMessages,
            message: res.contacts[i].lastMessageSenderId == user.id ? "Ty: " + res.contacts[i].lastMessage : res.contacts[i].lastMessage,
            isActive: res.contacts[i].isActive
          };
          this.chats = [
            ...this.chats.slice(0, i),
            contact,
            ...this.chats.slice(i + 1),
          ];
        }
        this.filteredChats = this.chats;
        this.cdr.detectChanges();
      });
    });

  }

  filterChats() {
    const name: string = this.form.value.nameToFilter;

    this.filteredChats = this.chats.filter((elem) => {
      return elem.name.includes(name);
    });
  }

  goToChat(chatId: string) {
    const indexToUpdate = this.chats.findIndex(chat => chat.id === chatId);
    this.chats[indexToUpdate].unreadMessages = 0;
    void this.router.navigate([this.pathToMessages, chatId]);
  }
}
