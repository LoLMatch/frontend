import { ValidatorFn, AbstractControl } from "@angular/forms";

export const PasswordValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  if (!password || !repeatPassword) {
    return null;
  }
  return password.value === repeatPassword.value ? null : { passwordsNotSame: true };
};
