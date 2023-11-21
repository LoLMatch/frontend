import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DsButtonDirective } from '@shared/ui/button/ds-button.directive';
import { CardDirective } from '@shared/ui/card/card.directive';
import { CutCornerBorderDirective } from '@shared/ui/cut-corner-border/cut-corner-border.directive';

@Component({
  selector: 'ds-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    DsButtonDirective,
    CardDirective,
    CutCornerBorderDirective
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent { }
