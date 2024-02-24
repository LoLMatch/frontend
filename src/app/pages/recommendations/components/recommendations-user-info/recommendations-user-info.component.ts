import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { RecommendationUser } from '@pages/recommendations/interfaces/recommendation-user.interface';
import { RecommendationsState } from '@pages/recommendations/store/recommendations.store';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecommendationsUserDescriptionComponent } from '@pages/recommendations/components/recommendations-user-description/recommendations-user-description.component';
import { RecommendationsUserHeaderComponent } from '@pages/recommendations/components/recommendations-user-header/recommendations-user-header.component';
import { RecommendationsUserBestTrioComponent } from '@pages/recommendations/components/recommendations-user-best-trio/recommendations-user-best-trio.component';


@Component({
  selector: 'ds-recommendations-user-info',
  standalone: true,
  imports: [
    CommonModule, MatProgressSpinnerModule, RecommendationsUserDescriptionComponent, RecommendationsUserHeaderComponent, RecommendationsUserBestTrioComponent
  ],
  templateUrl: './recommendations-user-info.component.html',
  styleUrl: './recommendations-user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsUserInfoComponent {

  @Select(RecommendationsState.getActualRecommendation) recommendation$: Observable<RecommendationUser>;
}
