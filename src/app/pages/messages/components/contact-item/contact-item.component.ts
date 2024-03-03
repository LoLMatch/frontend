import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactListItem } from '@pages/messages/interfaces/contacts.interface';

@Component({
  selector: 'ds-contact-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactItemComponent {
  @Input() chat: ContactListItem;
}
