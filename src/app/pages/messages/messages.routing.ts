import { Routes } from "@angular/router";
import { ChatDummyPlugComponent } from "@pages/messages/components/chat-dummy-plug/chat-dummy-plug.component";
import { ChatComponent } from "@pages/messages/components/chat/chat.component";
import { MessagesComponent } from "@pages/messages/messages.component";

export default [
  {
    path: '',
    component: MessagesComponent,
    children: [
      {
        path: '',
        component: ChatDummyPlugComponent,
      },
      {
        path: ':id',
        component: ChatComponent
      }
    ]
  },
] as Routes;