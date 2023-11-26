import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '@pages/auth/shared/same-password/same-password.validator';

@Injectable()
export class RegisterFormCreatorService {

  constructor(private fb: FormBuilder) { }

  createForm() {
    return this.fb.group({
      name: [null as string, [Validators.required, Validators.maxLength(255)]],
      email: [null as string, [Validators.email, Validators.required, Validators.maxLength(255)]],
      password: [null as string, [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      repeatPassword: [null as string, [Validators.required, Validators.minLength(8), Validators.maxLength(255)]]
    }, { validators: [PasswordValidator] });
  }
}
