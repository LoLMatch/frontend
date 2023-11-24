import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Injectable()
export class RegisterFormCreatorService {

  constructor(private fb: FormBuilder) { }

  private passwordValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');

    if (!password || !repeatPassword) {
      return null;
    }
    return password.value === repeatPassword.value ? null : { passwordsNotSame: true };
  };

  createForm(){
    return this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(255)]],
      email: [null, [Validators.email, Validators.required, Validators.maxLength(255)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      repeatPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
    }, {validators: [this.passwordValidator]});
  }
}
