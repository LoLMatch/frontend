import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-recommendations',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent { }
