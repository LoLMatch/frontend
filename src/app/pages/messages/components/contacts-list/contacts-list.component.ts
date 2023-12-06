import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-contacts-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent { }
