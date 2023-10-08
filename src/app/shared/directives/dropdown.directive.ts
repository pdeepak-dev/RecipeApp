import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[vueDropdown]'
})
export class DropdownDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') mouseclick() {
    const parentElm = this.elRef.nativeElement;
    const childElm = parentElm.querySelector('.dropdown-menu');

    if (!parentElm.classList.contains('show')) {
      this.renderer.addClass(parentElm, 'show');
      this.renderer.addClass(childElm, 'show');
    } else {
      this.renderer.removeClass(parentElm, 'show');
      this.renderer.removeClass(childElm, 'show');
    }
  }

}
