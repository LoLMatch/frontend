import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';
import { Select } from '@ngxs/store';
import { ContactListItem } from '@pages/messages/interfaces/contacts.interface';
import { ContactsState } from '@pages/messages/store/contacts.store';
import { Observable, Subject, debounceTime, filter, takeUntil } from 'rxjs';

@Directive({
  selector: '[dsActiveLink]',
  standalone: true
})
export class ActiveLinkDirective implements OnInit, OnDestroy {

  @Input() routerLink: string;

  @HostListener('click')
  onClick() {
    this.sidebarOverlay.hideLoader();
  }
  @Select(ContactsState.getContacts) contacts$: Observable<ContactListItem[]>;
  private onDestroy$ = new Subject<void>();

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
      debounceTime(400),
      takeUntil(this.onDestroy$),
    ).subscribe((e: unknown) => {
      this.updateActiveClass((e as NavigationEnd)?.url);
    });

    this.contacts$.subscribe(()=> {
      this.updateActiveClass(this.router.url)
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();    
  }

  private updateActiveClass(currentUrl: string) {
    setTimeout(() => {
      const childElement = this.el.nativeElement.querySelector('.contact__item__wrapper');
      this.renderer.removeClass(childElement ? childElement : this.el.nativeElement, 'active');

      if (currentUrl == this.routerLink) {
        this.renderer.addClass(childElement ? childElement : this.el.nativeElement, 'active');
      } else {
        this.renderer.removeClass(childElement ? childElement : this.el.nativeElement, 'active');
      }
    }, 500);    
  }
}
