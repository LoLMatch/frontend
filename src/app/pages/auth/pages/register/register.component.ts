import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { RoutesPath } from '@core/constants/routes.const';
import { RegisterFormCreatorService } from '@pages/auth/services/registerFormCreator/register-form-creator.service';
import { DsButtonDirective } from '@shared/ui/button/ds-button.directive';

@Component({
  selector: 'ds-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    DsButtonDirective,
    RouterModule
  ],
  providers: [
    RegisterFormCreatorService
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent{

  form = this.formCreator.createForm();
  route = `/${RoutesPath.AUTHORIZATION}/${RoutesPath.LOGIN}`;

  constructor(private formCreator: RegisterFormCreatorService){ }

  signUp(){
    console.log("signed up!");
  }
}
