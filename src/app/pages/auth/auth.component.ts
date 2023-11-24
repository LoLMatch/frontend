import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardDirective } from '@shared/ui/card/card.directive';

@Component({
  selector: 'ds-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardDirective
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent { }
