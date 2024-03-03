import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LogoComponent } from '@app/shared/ui/logo/logo.component';
import { SidebarManagementService } from '@layout/services/sidebar-management.service';
import { ActiveLinkDirective } from '../side-bar/link/link.directive';
import { Select } from '@ngxs/store';
import { ContactsState } from '@pages/messages/store/contacts.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ds-top-bar-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    LogoComponent,
    MatButtonModule,
    OverlayModule,
    RouterModule,
    ActiveLinkDirective
  ],
  templateUrl: './top-bar-menu.component.html',
  styleUrl: './top-bar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarMenuComponent {
  sidebarManager = inject(SidebarManagementService);

  @Select(ContactsState.getNotifications) areNewMessages$: Observable<boolean>;

  openSidebar() {
    this.sidebarManager.showLoader();
  }
}
