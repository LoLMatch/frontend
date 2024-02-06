import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { ApiChatRoutes } from '@core/constants/api.chat.const';
import { RoutesPath } from '@core/constants/routes.const';
import { ActiveLinkDirective } from '@layout/components/side-bar/link/link.directive';
import { ContactItemComponent } from '@pages/messages/components/contact-item/contact-item.component';
import { ContactsListFromApi } from '@pages/messages/interfaces/contacts.interface';
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

  filteredChats: {
    id: string,
    name: string;
    message: string;
    unreadMessages: number;
  }[] = this.chats;

  form = this.fb.group({
    nameToFilter: [null as string],
  });
  pathToMessages = `/${RoutesPath.HOME}/${RoutesPath.MESSAGES}`;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJscE0yWVV5RjF0N1RqM1c4NmV2SlRxRjRPYllpWk9vXzFPcDJteDBCLUEwIn0.eyJleHAiOjE3MDcyMzQ0NzQsImlhdCI6MTcwNzIzNDE3NCwianRpIjoiNDhmNWIyYjktMTIwYi00MGM2LWI0ZTUtMTk2NzY2ODA5NWFhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4NDQzL3JlYWxtcy9sb2xtYXRjaCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJmZDBhNjdjYS0xZmU3LTQ3NTktODU0Yi00YmEwYTFhYzgxOGUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJmcm9udGVuZCIsInNlc3Npb25fc3RhdGUiOiI0YzY1NDM4My1lNGU4LTQyNGItOWNkMy05M2RmMDlhZjkwYTUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJkZWZhdWx0LXJvbGVzLWxvbC1tYXRjaCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjRjNjU0MzgzLWU0ZTgtNDI0Yi05Y2QzLTkzZGYwOWFmOTBhNSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYm9iIn0.XHAMKBtKMwmgwm477Qa49_8zpuW15Oe-10_J-dU0qnvIR5XcFgGxUUuQllfFKxFqnEQEnROcFo9-NLM4QxlWxMSCGuk2PCEn0TAq9VWO-af6v6oY5kFOpXhl-NEgudaGx4k9BfYRvfVGSyELgUuOi6c3EBQCb2qgFTyuwV6xXS2cGVQBjRHgPKKfkjJDneuMoHlPsYf02ayCxefSBKc6A9sx1qKa76OXQpCOaoC5cB7qd6ZP3HG_M4jj_mDXA5Q9pp4japTQ3e85ksCiMw4CDV_SycGRdCFWgGrtPR0aMZmnh2BQ3JiBf7lBQcWbLc0ZPk_tPvg3wupc1gTHKEeSCg'
    });

    const params = {
      id: "fd0a67ca-1fe7-4759-854b-4ba0a1ac818e",
    };

    this.http.get<ContactsListFromApi>(`${ApiChatRoutes.CHAT_PATH}${ApiChatRoutes.CONTACTS}`, { headers, params }).subscribe((res: ContactsListFromApi) => {
      for (let i = 0; i < res.contacts.length; i++) {
        this.chats[i].id = res.contacts[i].id;
        this.chats[i].name = res.contacts[i].username;
      }
      this.filteredChats = this.chats;
      this.cdr.detectChanges();
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
