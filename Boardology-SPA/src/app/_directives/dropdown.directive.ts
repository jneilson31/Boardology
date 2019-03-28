import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs:'appDropdown'
})
export class DropdownDirective {

  @HostBinding('class.show') isOpen = false;

  @HostListener('click') toggleMenu () {
    this.isOpen = !this.isOpen;
  }

  constructor() { }

}
