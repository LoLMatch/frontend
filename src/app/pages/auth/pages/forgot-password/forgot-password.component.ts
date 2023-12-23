import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { LoginFormCreatorService } from '@pages/auth/services/loginFormCreator/login-form-creator.service';
import { DsButtonDirective } from '@shared/ui/button/ds-button.directive';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ds-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DsButtonDirective,
    RouterModule,
  ],
  providers: [LoginFormCreatorService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    email: [null as string, [Validators.email, Validators.required, Validators.maxLength(255)]],
  });


  sendRecoveryLink() {
    // eslint-disable-next-line no-console
    console.log('sending recovery link...');
  }
}
