/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';

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
    const currentUrl = this.router.url;

    if (currentUrl == this.routerLink) {
      this.renderer.addClass(this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'active');
    }
  }

}