import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, OnInit, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { filter } from 'rxjs';

@Component({
  selector: 'ds-messages',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ContactsListComponent
  ],
  providers: [
    Window
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

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  ngOnInit(): void {
    this.checkWindowSize();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkWindowSize();
    });
  }

  private checkWindowSize(): void {
    const listElement = this.el.nativeElement.querySelector('.list');
    const chatElement = this.el.nativeElement.querySelector('.chat');
    if (window.innerWidth <= 840){
      const currentUrl = this.router.url;
      if (currentUrl === "/home/messages"){
        this.renderer.addClass(chatElement, "not__active");
        this.renderer.removeClass(listElement, "not__active");
      } else {
        this.renderer.addClass(listElement, "not__active");
        this.renderer.removeClass(chatElement, "not__active");
      }
    } else {
      this.renderer.removeClass(chatElement, "not__active");
      this.renderer.removeClass(listElement, "not__active");
    }
  }
}
