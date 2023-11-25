import { Directive, ElementRef, Input, OnInit, Renderer2, inject } from '@angular/core';
import { BehaviorSubject, pairwise, tap, } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DsButtonCutCorner, DsButtonCutCornerList, DsButtonType, DsButtonTypesList } from '@shared/ui/button/ds-button.types';

@Directive({
  selector: '[dsButton]',
  standalone: true,
})
export class DsButtonDirective implements OnInit {

  @Input() set dsButtonType(val: DsButtonType) {
    const classesWithoutButtonType = this.classes$.value.filter((item) => !DsButtonTypesList.find((type) => `${this.buttonClassPrefix}__${type}` == item));
    this.classes$.next([...(classesWithoutButtonType || []), `${this.buttonClassPrefix}__${val}`]);
  }

  @Input() set dsButtonCutCorner(val: DsButtonCutCorner) {
    const classesWithoutCorner = this.classes$.value.filter((item) => !DsButtonCutCornerList.find((type) => `${this.buttonClassPrefix}__${type}` == item));
    this.classes$.next([...(classesWithoutCorner || []), `${this.buttonClassPrefix}__${val}`]);
  }

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private readonly buttonClassPrefix = "ds__button";

  classes$ = new BehaviorSubject<string[]>(['ds__button']);
  constructor() {
    this.classes$.pipe(
      pairwise(),
      tap(([first, second]) => {
        first.forEach((item) => this.renderer.removeClass(this.el.nativeElement, item));
        second.forEach((item) => this.renderer.addClass(this.el.nativeElement, item));
      }),
      takeUntilDestroyed(),
    ).subscribe();
  }

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'ds__button');
    this.renderer.addClass(this.el.nativeElement, 'ds__button__top-right');
  }
}
