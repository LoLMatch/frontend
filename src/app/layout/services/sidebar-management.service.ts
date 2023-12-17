import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { SideBarComponent } from '@layout/components/side-bar/side-bar.component';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarManagementService {

  private overlay = inject(Overlay);

  private isOpenSource = new BehaviorSubject<boolean>(true);

  overlayRef = this.overlay.create({
    positionStrategy: this.overlay.position().global().top().start(),
    hasBackdrop: true,
  });

  get isOpen$(): Observable<boolean> {
    return this.isOpenSource.asObservable();
  }

  showLoader() {
    this.overlayRef.backdropClick().pipe(take(1)).subscribe(() => {
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

  hideLoader() {
    this.overlayRef.detach();
  }

}
