import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Lane } from '@pages/recommendations/interfaces/recommendation-user.interface';

@Injectable()
export class AboutFormCreatorService {

  constructor(
    private fb: FormBuilder
  ) { }

  generateForm(){
    return this.fb.group({
      country: [null as string, [Validators.required]],
      languages: this.fb.array([
        this.getLanguageControl(),
      ], [Validators.minLength(1), Validators.maxLength(5)]),
      birthDate: [null as string, [Validators.required]],
      about: [null as string, [Validators.required]],
      champions: this.fb.array([
        [null as string, [Validators.required]], 
        [null as string, [Validators.required]],
        [null as string, [Validators.required]]
      ]),
      lanes: this.fb.array([
        [null as Lane, [Validators.required]],
        [null as Lane, [Validators.required]],
        [null as Lane, [Validators.required]]
      ])
    })
  }

  getLanguageControl(){
    return this.fb.control(null as string, Validators.required);
  }

}
