import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[vueDropdown2]'
})
export class Dropdown2Directive {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click') onclick() {
    const childElm = this.elRef.nativeElement.querySelector('.dropdown-menu');

    if (!childElm.classList.contains('show')) {
      this.renderer.addClass(childElm, 'show');
      this.renderer.addClass(childElm, 'dropdown-menu-toggle');
    } else {
      this.renderer.removeClass(childElm, 'show');
      this.renderer.removeClass(childElm, 'dropdown-menu-toggle');
    }
  }

  @HostListener('mouseleave') onmouseleave() {
    const childElm = this.elRef.nativeElement.querySelector('.dropdown-menu');

    this.renderer.removeClass(childElm, 'show');
    this.renderer.removeClass(childElm, 'dropdown-menu-toggle');
  }

}
