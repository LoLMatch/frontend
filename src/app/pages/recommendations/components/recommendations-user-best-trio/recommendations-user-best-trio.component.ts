import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lane, PreferedChampion } from '@pages/recommendations/interfaces/recommendation-user.interface';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'ds-recommendations-user-best-trio',
  standalone: true,
  imports: [
    CommonModule, MatTooltipModule
  ],
  templateUrl: './recommendations-user-best-trio.component.html',
  styleUrl: './recommendations-user-best-trio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecommendationsUserBestTrioComponent {

  @Input() dsPreferedChampions: PreferedChampion[];


  get bestTrio(): PreferedChampion[] {
    return this.dsPreferedChampions?.slice(0, 3) || [];
  }
}
