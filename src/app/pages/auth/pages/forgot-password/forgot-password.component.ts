import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ds-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent { }
