import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  private firstClick: boolean = true

  @HostListener('document:click', ['$event.target'])
  public onClick(target: Element) {
    if (this.firstClick) {
      this.firstClick = false
      return
    }
    console.dir(target);
    console.dir(this.elementRef);
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
