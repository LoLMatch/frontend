import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RecommendationUser } from '@pages/recommendations/interfaces/recommendation-user.interface';
import { TextToSnakeCasePipe } from '@shared/pipes/text-to-snake-case.pipe';

@Component({
  selector: 'ds-recommendations-user-primary-info',
  standalone: true,
  imports: [
    CommonModule, MatTooltipModule, TextToSnakeCasePipe
  ],
  templateUrl: './recommendations-user-primary-info.component.html',
  styleUrl: './recommendations-user-primary-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsUserPrimaryInfoComponent {
  @Input() dsRecommendation: RecommendationUser;
}
