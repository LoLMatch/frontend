import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.const';
import { environment } from '@env/environment';
import { ContactsListFromApi } from '../interfaces/contacts.interface';
import { MessagesApiResponse } from '../interfaces/messages.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMessages(params: {firstUserId: string, secondUserId: string}){
    return this.http.get<MessagesApiResponse>(`${environment.httpChat}${API.MESSAGES}`, { params });
  }

  getContacts(params: {id: string}){
    return this.http.get<ContactsListFromApi>(`${environment.httpChat}${API.CONTACTS}`, { params });
  }
}
