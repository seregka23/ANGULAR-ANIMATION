import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

interface StyleConfig {
  elementNumber: number;
  countElements: number;
}

@Directive({
  selector: '[appAddStyle]',
  standalone: true
})
export class AddStyleDirective implements OnInit {
  @Input('appAddStyle') config: StyleConfig = { countElements: 0, elementNumber: 0 };
  stepHeight: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.stepHeight = 200 / this.config.countElements;
    this.renderer.setStyle(this.el.nativeElement, 'height', `${(this.config.elementNumber + 1) * this.stepHeight}px`)

    this.renderer.setStyle(this.el.nativeElement, 'background-position', `-${this.config.elementNumber * 50}px 0`)
  }

}
