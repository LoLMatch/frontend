/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ChangeDetectorRef, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';
import { debounceTime, filter } from 'rxjs';

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

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private el: ElementRef,
    private sidebarOverlay: SidebarManagementService,
  ) { }

  ngOnInit() {
    this.updateActiveClass(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      debounceTime(400)
    ).subscribe((e: unknown) => {
      this.updateActiveClass((e as NavigationEnd)?.url);
    });
  }

  private updateActiveClass(currentUrl: string) {
    const childElement = this.el.nativeElement.querySelector('.contact__item__wrapper');

    if (currentUrl == this.routerLink) {
      this.renderer.addClass(childElement ? childElement : this.el.nativeElement, 'active');
    } else {
      this.renderer.removeClass(childElement ? childElement : this.el.nativeElement, 'active');
    }
  }

}
