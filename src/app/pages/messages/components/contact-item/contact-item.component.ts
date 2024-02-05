import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
  @Input() name : string;// = "YOUR NAME";
  @Input() message: string;// = "your last message";
  @Input() unreadMessages: number;
  @Input() isOnline: boolean;
  time = "12:47";
}
