import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { LoginFormCreatorService } from '@pages/auth/services/loginFormCreator/login-form-creator.service';
import { DsButtonDirective } from '@shared/ui/button/ds-button.directive';

@Component({
  selector: 'ds-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = this.formCreator.createForm();
  registerRoute = `/${RoutesPath.AUTHORIZATION}/${RoutesPath.REGISTER}`;
  forgotPasswordRoute = `/${RoutesPath.AUTHORIZATION}/${RoutesPath.FORGOT_PASSWORD}`;

  constructor(private formCreator: LoginFormCreatorService) {}

  logIn() {
    // eslint-disable-next-line no-console
    console.log('logged in');
  }
}
