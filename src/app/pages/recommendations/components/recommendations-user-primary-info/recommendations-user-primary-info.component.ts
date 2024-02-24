import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecommendationUser } from '@pages/recommendations/interfaces/recommendation-user.interface';

@Component({
  selector: 'ds-recommendations-user-primary-info',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './recommendations-user-primary-info.component.html',
  styleUrl: './recommendations-user-primary-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsUserPrimaryInfoComponent {
  @Input() dsRecommendation: RecommendationUser;
}
