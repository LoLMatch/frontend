import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { convertDate } from '@pages/messages/constants/convert-date.const';
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
export class ContactItemComponent implements OnInit, OnChanges {
  @Input() chat: ContactListItem;
  createdAt: string;

  ngOnInit(): void {
    this.createdAt = convertDate(this.chat?.createdAt);    
  }

  ngOnChanges(): void {
    this.createdAt = convertDate(this.chat?.createdAt);  
  }
}
