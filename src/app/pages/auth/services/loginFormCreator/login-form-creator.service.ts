import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class LoginFormCreatorService {

  private fb = inject(FormBuilder);

  createForm() {
    return this.fb.group({
      email: [null as string, [Validators.email, Validators.required, Validators.maxLength(255)]],
      password: [null as string, [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
    });
  }
}
