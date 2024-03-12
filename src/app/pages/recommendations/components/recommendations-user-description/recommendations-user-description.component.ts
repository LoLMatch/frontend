import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RecommendationUser } from '@pages/recommendations/interfaces/recommendation-user.interface';

@Component({
  selector: 'ds-recommendations-user-description',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './recommendations-user-description.component.html',
  styleUrl: './recommendations-user-description.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsUserDescriptionComponent {
  @Input() dsRecommendation: RecommendationUser;

  get languages(): string {
    return this.dsRecommendation?.languages?.map((item => this.capitalize(item)))?.join(', ');
  }

  private capitalize(str: string): string {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1);
  }
}
