/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';
import { filter } from 'rxjs';

@Directive({
  selector: '[dsActiveLink]',
  standalone: true
})
export class ActiveLinkDirective implements OnInit {

  @Input() routerLink: string;

  @HostListener('click')
  onClick() {
    this.sidebarOverlay.hideLoader();
  }

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private router = inject(Router);
  private sidebarOverlay = inject(SidebarManagementService);

  ngOnInit() {
    this.updateActiveClass();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveClass();
    });
  }

  private updateActiveClass() {
    const currentUrl = this.router.url;
    const childElement = this.el.nativeElement.querySelector('.contact__item__wrapper');

    if (currentUrl == this.routerLink) {

      this.renderer.addClass(childElement ? childElement : this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(childElement ? childElement : this.el.nativeElement, 'active');
    }
  }

}
