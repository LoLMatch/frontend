import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LANGUAGES } from '@pages/post-registration-page/constants/languages.const';
import { AboutFormCreatorService } from '@pages/post-registration-page/services/about-form-creator.service';

@Component({
  selector: 'ds-post-registration-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    ScrollingModule
  ],
  providers: [
    AboutFormCreatorService
  ],
  templateUrl: './post-registration-page.component.html',
  styleUrl: './post-registration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostRegistrationPageComponent implements OnInit{

  form = this.formService.generateForm();
  languagesList = LANGUAGES;
  coses = [1];

  constructor(
    private formService: AboutFormCreatorService,
  ) { }

  ngOnInit(): void {

  }

  get Languages(): FormArray {
    return this.form.get("languages") as FormArray;
  }

  addLanguage(){
    if (this.Languages.length < 5){
      this.Languages.push(this.formService.getLanguageControl());
    }
  }

  removeLanguage(){

  }
}
