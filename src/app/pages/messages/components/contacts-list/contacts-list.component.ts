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
import { environment } from '@env/environment';
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
  pathToMessages = `/${RoutesPath.HOME}/${RoutesPath.MESSAGES}/`;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJscE0yWVV5RjF0N1RqM1c4NmV2SlRxRjRPYllpWk9vXzFPcDJteDBCLUEwIn0.eyJleHAiOjE3MDcyMzkyMzQsImlhdCI6MTcwNzIzODkzNCwianRpIjoiNDk3YWEwMjMtOTFmMi00MWE2LTg2YWItZjYxYTg2NDNiNjg5IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjg0NDMvcmVhbG1zL2xvbG1hdGNoIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImZkMGE2N2NhLTFmZTctNDc1OS04NTRiLTRiYTBhMWFjODE4ZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6IjRmOGY1YjBiLWNmNDYtNGJlMi1hNmRkLTA0MGYzOGM5OTVlZCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbG9sLW1hdGNoIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiNGY4ZjViMGItY2Y0Ni00YmUyLWE2ZGQtMDQwZjM4Yzk5NWVkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJib2IifQ.Y1oHBvqQuynhpeY2J6gMqrzQwlqmfPiXbnmQzyUuhs6BkYVyjuQoFysLBZUg1zgjg2aNq8c-yGrMzd7OHGuE6gcUfDpK2sHQfiwZMqPerDP_rjaMYhYOo2h7rot1_QS0ZOV95oURxM3xO2Gzmxw80eN7aJknGyiJ1fHwrbPGnZ052NgIW5-R0Pg_B0IXlr-G9xtx1_fkIIPiWJsPmpYLVvShDbKxno3Fk62G6z2P-B63R6KTmWVjtdHRf9nce3QnufFVOq7QGCO76Fb7nkxRRpsvVIwmcNAH13i8d6_TwTq2uiXcJ8FPLn2jI-3IT7a1fjpomAINwBgPJ4CcVIa45A'
    });

    const params = {
      id: "fd0a67ca-1fe7-4759-854b-4ba0a1ac818e",
    };

    this.http.get<ContactsListFromApi>(`${environment.httpChat}${API.CONTACTS}`, { headers, params }).subscribe((res: ContactsListFromApi) => {
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
