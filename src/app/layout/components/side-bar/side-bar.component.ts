import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';
import { LogoComponent } from '@shared/ui/logo/logo.component';
import { Subscription } from 'rxjs';
import { ActiveLinkDirective } from './link/link.directive';

@Component({
  selector: 'ds-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    LogoComponent,
    RouterModule,
    ActiveLinkDirective
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent implements OnInit, OnDestroy { 
  
  private sidebarManager = inject(SidebarManagementService);
  private cdr = inject(ChangeDetectorRef);

  isOpen = true;  
  isOpenFromService: boolean;
  private isOpenSubscription: Subscription;
  windowWidth: number;
  isPhone = false;
  areNewMessages = true;

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
    if(this.windowWidth <= 440){
      this.isPhone = true;
    }

    this.isOpenSubscription = this.sidebarManager.isOpen$.subscribe((newValue) => {
      this.isOpenFromService = newValue;
      this.cdr.detectChanges();
    });
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

  ngOnDestroy(): void {
    this.isOpenSubscription.unsubscribe();
  }
  
  closeSidebar() {
    this.isOpen = false; 
    this.sidebarManager.hideLoaderSmoothly();
  }
}
