import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
export class ContactItemComponent { }
