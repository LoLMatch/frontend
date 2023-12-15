/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Directive, ElementRef, OnInit, Renderer2, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';

@Directive({
  selector: '[dsActiveLink]',
  standalone: true
})
export class ActiveLinkDirective implements OnInit {

  private el = inject(ElementRef); 
  private renderer = inject(Renderer2);
  private router = inject(Router);
  private sidebarOverlay = inject(SidebarManagementService);

  ngOnInit() {
    const currentUrl = this.router.url;
    const linkUrl = this.el.nativeElement.getAttribute('routerLink');
    
    if (currentUrl == linkUrl) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
    this.checkUrl();
  }

  private checkUrl() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = this.router.url;
        const linkUrl = this.el.nativeElement.getAttribute('routerLink');
        
        if (currentUrl == linkUrl) {
          this.renderer.addClass(this.el.nativeElement, 'active');
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'active');
        }

        this.sidebarOverlay.hideLoader();
      }
    });
  }
}