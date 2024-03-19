import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecommendationUser } from '@pages/recommendations/interfaces/recommendation-user.interface';

@Component({
  selector: 'ds-recommendations-user-header',
  standalone: true,
  imports: [
    CommonModule, MatProgressSpinnerModule
  ],
  templateUrl: './recommendations-user-header.component.html',
  styleUrl: './recommendations-user-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RecommendationsUserHeaderComponent {
  @Input() dsRecommendation: RecommendationUser;

  get winPercent(): number {
    return Math.round(this.dsRecommendation?.wins * 1000 / (this.dsRecommendation?.wins + this.dsRecommendation?.losses)) / 10 || 0;
  }
}
