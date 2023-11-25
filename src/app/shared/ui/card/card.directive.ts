import { Directive, ElementRef, OnInit, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[dsCard]',
  standalone: true,
})
export class CardDirective implements OnInit {

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'ds__card');
  }
}
