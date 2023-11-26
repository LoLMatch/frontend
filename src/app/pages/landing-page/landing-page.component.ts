import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { DsButtonDirective } from '@shared/ui/button/ds-button.directive';
import { CardDirective } from '@shared/ui/card/card.directive';
import { CutCornerBorderDirective } from '@shared/ui/cut-corner-border/cut-corner-border.directive';
import { LogoComponent } from '@shared/ui/logo/logo.component';

@Component({
  selector: 'ds-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    DsButtonDirective,
    CardDirective,
    CutCornerBorderDirective,
    RouterModule,
    LogoComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
    loginRoute = `/${RoutesPath.AUTHORIZATION}`;
    registerRoute = `/${RoutesPath.AUTHORIZATION}/${RoutesPath.REGISTER}`;
 }
