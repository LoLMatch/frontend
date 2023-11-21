import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { DsButtonCutCorner, DsButtonCutCornerList } from '@shared/ui/button/ds-button.types';

@Directive({
  selector: '[dsCutCornerBorder]',
  standalone: true,
})
export class CutCornerBorderDirective {
  @Input() set dsCutCornerBorder(val: DsButtonCutCorner) {
    const classes = ["ds__cut__corner", ...DsButtonCutCornerList.map((item) => `ds__cut__corner__${item}`)];
    classes.forEach((item) => this.renderer.removeClass(this.el.nativeElement, item));
    this.renderer.addClass(this.el.nativeElement, "ds__cut__corner");
    this.renderer.addClass(this.el.nativeElement, `ds__cut__corner__${val}`);

  }

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
}
