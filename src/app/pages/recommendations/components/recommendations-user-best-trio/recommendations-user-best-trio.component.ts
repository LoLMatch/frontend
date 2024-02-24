import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lane, PreferedChampions } from '@pages/recommendations/interfaces/recommendation-user.interface';

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


  get bestTrio(): { name: string, lane: Lane }[] {
    return Object.entries(this.dsPreferedChampions)?.map(([name, lane]) => ({ name, lane }))?.slice(0, 3) || [];
  }
}
