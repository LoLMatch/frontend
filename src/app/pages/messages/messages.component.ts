import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';

@Component({
  selector: 'ds-messages',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContactsListComponent
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesComponent { }
