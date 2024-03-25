import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { LANGUAGES } from '@pages/post-registration-page/constants/languages.const';
import { AboutFormCreatorService } from '@pages/post-registration-page/services/about-form-creator.service';
import { DsButtonDirective } from '@shared/ui/button/ds-button.directive';
import { CardDirective } from '@shared/ui/card/card.directive';
import { CutCornerBorderDirective } from '@shared/ui/cut-corner-border/cut-corner-border.directive';
import { COUNTRIES } from '@pages/post-registration-page/constants/countries.const';

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
    MatMenuModule,
    ScrollingModule,
    DsButtonDirective,
    CardDirective,
    CutCornerBorderDirective,
  ],
  providers: [
    AboutFormCreatorService
  ],
  templateUrl: './post-registration-page.component.html',
  styleUrl: './post-registration-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostRegistrationPageComponent implements OnInit{

  part = 1;
  form = this.formService.generateForm();
  languagesList = LANGUAGES;
  countriesList = COUNTRIES;
  coses = [1];
  options = [
    {
      value: 1,
      label: "Jinx",
      imageUrl: "assets/images/champions/1.png",
    },
    {
      value: 2,
      label: "MF",
      imageUrl: "assets/images/champions/2.png",
    },
    {
      value: 3,
      label: "Gragas",
      imageUrl: "assets/images/champions/3.png",
    },
    {
      value: 4,
      label: "Garen",
      imageUrl: "assets/images/champions/4.png",
    },
  ]

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

  removeLanguage() {
    if (this.Languages.length > 1){
      this.Languages.removeAt(this.Languages.length - 1);
    }
  }

  get Champions(): FormArray {
    return this.form.get("champions") as FormArray;
  }

  get Lanes(): FormArray {
    return this.form.get("lanes") as FormArray;
  }

  goNext() {
    this.part = 2;
  }

  goBack() {
    this.part = 1;
  }

  exit() {

  }

  send() {

  }
}
