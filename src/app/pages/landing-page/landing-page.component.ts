import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DsButtonDirective } from '@shared/ui/button/ds-button.directive';

@Component({
  selector: 'ds-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    DsButtonDirective
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent { }
