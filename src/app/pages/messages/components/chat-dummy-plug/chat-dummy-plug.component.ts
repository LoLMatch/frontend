import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-chat-dummy-plug',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './chat-dummy-plug.component.html',
  styleUrl: './chat-dummy-plug.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatDummyPlugComponent { }
