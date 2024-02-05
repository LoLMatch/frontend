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
import { ContactsListFromApi } from '@pages/messages/interfaces/contacts.interface';
import { ContactItemComponent } from '../contact-item/contact-item.component';

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
export class ContactsListComponent implements OnInit{
  chats = [
    {
      name: "marek",
      message: "cos tam cos tam",
      unreadMessages: 0,
      id: '1'
    },
    {
      name: "anna",
      message: "zagrajmy w grę",
      unreadMessages: 2,
      id: '2'
    },
    {
      name: "username1",
      message: "cos tam cos tam ale takie dłuższe wwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwww wwwwwwwwww www",
      unreadMessages: 3,
      id: '3'
    },
    {
      name: "username2",
      message: "zagrajmy w grę",
      unreadMessages: 0,
      id: '4'
    },
    {
      name: "username3",
      message: "cos tam cos tam",
      unreadMessages: 0,
      id: '5'
    },
    {
      name: "username4",
      message: "zagrajmy w grę",
      unreadMessages: 1,
      id: '6'
    },
    {
      name: "username5",
      message: "cos tam cos tam",
      unreadMessages: 0,
      id: '7'
    },
    {
      name: "username6",
      message: "zagrajmy w grę",
      unreadMessages: 2,
      id: '8'
    },
    {
      name: "username7",
      message: "cos tam cos tam",
      unreadMessages: 5,
      id: '9'
    },
    {
      name: "username8",
      message: "zagrajmy w grę",
      unreadMessages: 0,
      id: '10'
    },
  ];

  filteredChats: {
    id: string,
    name: string;
    message: string;
    unreadMessages: number;
  }[] = this.chats;

  form: FormGroup;
  pathToMessages = `${RoutesPath.HOME}/${RoutesPath.MESSAGES}`;   //<----- z jakiegoś powodu to nie działa z dyrektywą na zmianę koloru tła jak jest aktywny, 
                                                                  //       więc w htmlu jest zwykły string przekazany, ale tutaj w funkcji goToChat jest to
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.form = this.fb.group({
      nameToFilter: [null as string],
    });

    const headers = new HttpHeaders({
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJscE0yWVV5RjF0N1RqM1c4NmV2SlRxRjRPYllpWk9vXzFPcDJteDBCLUEwIn0.eyJleHAiOjE3MDcwODkzMTYsImlhdCI6MTcwNzA4NzUxNiwianRpIjoiNmViNjRiMTAtYzI1ZS00YzVmLTg3YTgtNTFhZWI0YzAxZmY3IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjg0NDMvcmVhbG1zL2xvbG1hdGNoIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjNkZjUyOGEyLThlNTktNDQ5NS1iZjA2LWIzZTgwOTZiMDliOSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kIiwic2Vzc2lvbl9zdGF0ZSI6ImQ4Y2I2Yjk3LTNjYTUtNDQ5NS1hMTQ4LWM4ZjhmOWY2YmQ4MiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtbG9sLW1hdGNoIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZDhjYjZiOTctM2NhNS00NDk1LWExNDgtYzhmOGY5ZjZiZDgyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbm5hIn0.l1ERDb__8M5Rrh8pPq0KJdertDNzV7YH7tAVDb2qNHPFSnXnF_E1CzDU0xgcsMi5Y5dfZlv7zgBjaiObG3O_CloIvKsUBcyA1_hHSby3Tbngg5DplTM4q1xMtOZbU2Gl6V3pnZBZxHAataIHWTFc6aC9Jl00ZnxKbWAIdvPoo-gSR1xl99I138_eYiDIwKGZEMEPh3UI0AEHrSpRL4f_c2lG5qH1USAU9uHv1-QOEx3AiDqHCuFw6LGnzDWmd1UuWE_TQbEZzRthm4MnHYP6WRmzQvaYXseOQf16PcarqNzeIxISfyCgusgjFjNidoobSQ_42OU-3Xxd-HlaJXIiyw'
    });

    const params = {
      id: "fd0a67ca-1fe7-4759-854b-4ba0a1ac818e",
    };

    this.http.get<ContactsListFromApi>(`${ApiChatRoutes.CHAT_PATH}${ApiChatRoutes.CONTACTS}`, { headers, params }).subscribe((res: ContactsListFromApi)=>{
      for(let i = 0; i < res.contacts.length; i++){
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
