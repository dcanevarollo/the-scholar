import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appContainer]'
})
export class ContainerDirective implements AfterViewInit {

  @Input() maxWidth = '768px';
  @Input() noPadding?: string | boolean = false;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.style.maxWidth = this.maxWidth;
    this.elementRef.nativeElement.style.height = '100%';
    this.elementRef.nativeElement.style.margin = '0 auto';

    if (this.noPadding !== '')
      this.elementRef.nativeElement.style.padding = '40px';
  }

}
