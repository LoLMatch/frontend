import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PreferedChampions } from '@pages/recommendations/interfaces/recommendation-user.interface';

@Component({
  selector: 'ds-recommendations-user-best-trio',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './recommendations-user-best-trio.component.html',
  styleUrl: './recommendations-user-best-trio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsUserBestTrioComponent {

  @Input() dsPreferedChampions: PreferedChampions;
}
