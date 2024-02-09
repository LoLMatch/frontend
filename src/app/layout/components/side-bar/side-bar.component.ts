import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NAVIGATION } from '@core/constants/navigation.const';
import { AuthService } from '@core/services/auth/auth.service';
import { ActiveLinkDirective } from '@layout/components/side-bar/link/link.directive';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';
import { LogoComponent } from '@shared/ui/logo/logo.component';
import { Observable } from 'rxjs';

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
  isOpenFromService: boolean;
  windowWidth: number;
  isPhone = false;
  areNewMessages = true;
  isOpen$: Observable<boolean>;
  NAVIGATION = NAVIGATION;

  constructor(
    private sidebarManager: SidebarManagementService,
    private authService: AuthService
  ) {}

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

  logout() {
    void this.authService.logout();
  }

  closeSidebar() {
    this.sidebarManager.hideLoaderSmoothly();
  }
}
