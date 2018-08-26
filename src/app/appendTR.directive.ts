import { Directive, Renderer2, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAppendTR]'
})
export class AppendTRDirective {

  constructor(private elementRef: ElementRef, private render: Renderer2) { 
    //const div = this.render.createElement('div');
    //const text = this.render.createText('Hello world!');

    //this.render.appendChild(div, text);
    //this.render.appendChild(this.elementRef.nativeElement, div);
    console.log(this.elementRef.nativeElement);
  }

  @Input('appAppendTR') selected: any;

  @HostListener('click') onClick() {
    console.log(this.selected);
    const div = this.render.createElement('div');
    const text = this.render.createText('Hello world!');

    this.render.appendChild(div, text);
    this.render.appendChild(this.selected, div);
  }

}
