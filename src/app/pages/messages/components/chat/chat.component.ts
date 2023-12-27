import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-chat',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent {
  messages = [
    {
      text: "wwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwrrrrrrrrrrrrrrrrrr rrrrrrrrrrrrrrrrrrrrrrrrrrrrd",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
    {
      text: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
      isMe: true
    },
    {
      text: "wwwwwwwwwwwwwww",
      isMe: false
    },
  ];


}
