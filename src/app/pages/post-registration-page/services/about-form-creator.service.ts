import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class AboutFormCreatorService {

  constructor(
    private fb: FormBuilder
  ) { }

  generateForm(){
    return this.fb.group({
      country: ["pl", [Validators.required]],
      languages: this.fb.array([
        this.getLanguageControl(),
      ], [Validators.minLength(1), Validators.maxLength(5)]),
      birthDate: [null as string, [Validators.required]],
      about: [null as string, [Validators.required]]
    })
  }

  getLanguageControl(){
    return this.fb.control(null as string, Validators.required);
  }

}
