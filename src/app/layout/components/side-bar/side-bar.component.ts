import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';
import { LogoComponent } from '@shared/ui/logo/logo.component';
import { Observable, Subscription } from 'rxjs';
import { ActiveLinkDirective } from './link/link.directive';
import { NAVIGATION } from '@core/constants/navigation.const';

@Component({
  selector: 'ds-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    LogoComponent,
    RouterModule,
    ActiveLinkDirective,
    RouterModule,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent implements OnInit {

  private sidebarManager = inject(SidebarManagementService);

  isOpenFromService: boolean;
  windowWidth: number;
  isPhone = false;
  areNewMessages = true;
  isOpen$: Observable<boolean>;
  NAVIGATION = NAVIGATION;

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth <= 440) {
      this.isPhone = true;
    }
    this.isOpen$ = this.sidebarManager.isOpen$;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth;
    if (this.windowWidth <= 440) {
      this.isPhone = true;
    } else {
      this.isPhone = false;
    }
  }


  closeSidebar() {
    this.sidebarManager.hideLoaderSmoothly();
  }
}
