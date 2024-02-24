import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecommendationsUserInfoComponent } from '@pages/recommendations/components/recommendations-user-info/recommendations-user-info.component';
import { GetRecommendations } from '@pages/recommendations/store/recommendations.actions';

@Component({
  selector: 'ds-recommendations',
  standalone: true,
  imports: [
    CommonModule, RecommendationsUserInfoComponent
  ],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new GetRecommendations());
  }
}
