import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
export class MessagesComponent implements OnInit{ 

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const currentUrl = this.router.url;
    
  }
}
