import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
export class RegisterComponent implements OnInit{

  form: FormGroup;
  route = `/${RoutesPath.AUTHORIZATION}/${RoutesPath.LOGIN}`;

  constructor(private formCreator: RegisterFormCreatorService){ }

  ngOnInit(): void {
      this.form = this.formCreator.createForm();
  }

  signUp(){
    console.log("signed up!");
  }
}
