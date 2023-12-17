import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopBarMenuComponent } from '@layout/components/top-bar-menu/top-bar-menu.component';

@Component({
  selector: 'ds-layout',
  standalone: true,
  imports: [
    CommonModule,
    TopBarMenuComponent,
    OverlayModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent { }
