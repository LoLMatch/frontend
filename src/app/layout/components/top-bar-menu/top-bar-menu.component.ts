import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '@app/shared/ui/logo/logo.component';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';

@Component({
  selector: 'ds-top-bar-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    LogoComponent,
    MatButtonModule,
    OverlayModule
  ],
  templateUrl: './top-bar-menu.component.html',
  styleUrl: './top-bar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarMenuComponent implements OnInit{

  sidebarManager = inject(SidebarManagementService);
  
  areNewMessages = true;
  isOpen = false;
  windowWidth: number;
  isPhone = false;

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    if(this.windowWidth <= 440){
      this.isPhone = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth;
    if(this.windowWidth <= 440){
      this.isPhone = true;
    } else {
      this.isPhone = false;
    }
  }

  openSidebar() {
    this.sidebarManager.showLoader();
  }
}
