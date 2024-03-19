import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { RecommendationStatus } from '@pages/recommendations/interfaces/recommendation-update.interface';
import { SetRecommendation } from '@pages/recommendations/store/recommendations.actions';

@Component({
  selector: 'ds-recommendations-user-actions',
  standalone: true,
  imports: [
    CommonModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './recommendations-user-actions.component.html',
  styleUrl: './recommendations-user-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsUserActionsComponent {

  constructor(
    private store: Store
  ) { }

  handleUserSet(recommendationStatus: RecommendationStatus): void {
    this.store.dispatch(new SetRecommendation(recommendationStatus));
  }

}
