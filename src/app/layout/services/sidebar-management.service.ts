import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { SideBarComponent } from '@layout/components/side-bar/side-bar.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarManagementService {
  
  private overlay = inject(Overlay);

  private isOpenSource = new BehaviorSubject<boolean>(true);
  
  isOpen$ = this.isOpenSource.asObservable();

  overlayRef = this.overlay.create({
    positionStrategy: this.overlay.position().global().top().start(),
    hasBackdrop: true,
  });

  showLoader() {
    this.overlayRef.backdropClick().subscribe(() => {
      this.hideLoaderSmoothly();
    });
    this.overlayRef.attach(new ComponentPortal(SideBarComponent));
    this.isOpenSource.next(true);
  }

  hideLoaderSmoothly() {
    this.isOpenSource.next(false);

    setTimeout(() => {
      this.overlayRef.detach();
    }, 400);
  }

  hideLoader(){
    this.overlayRef.detach();
  }

}
