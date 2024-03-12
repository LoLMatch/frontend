import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.const';
import { environment } from '@env/environment';
import { ContactsListFromApi } from '@pages/messages/interfaces/contacts.interface';
import { MessagesApiResponse } from '@pages/messages/interfaces/messages.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatApiService {

  constructor(private http: HttpClient) { }

  getMessages(params: {firstUserId: string, secondUserId: string}){
    return this.http.get<MessagesApiResponse>(`${environment.httpChat}${API.MESSAGES}`, { params });
  }

  getContacts(params: {id: string}){
    return this.http.get<ContactsListFromApi>(`${environment.httpChat}${API.CONTACTS}`, { params });
  }
}
