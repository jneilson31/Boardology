import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { trigger, transition, useAnimation, state, style, animate } from '@angular/animations';
import { slideInLeft, slideOutLeft } from 'ng-animate';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
  animations: [
    trigger('toggleDrawer', [
      state('show', style({
        transform: 'translateX(100%)'
      })),
      state('hide', style({
        transform: 'translateX(0%)'
      })),
      transition('show => hide', useAnimation(slideOutLeft, {
        params: {
          timing: .5,
          a: '100%',
          b: '0%',
        }})),
      transition('hide => show', useAnimation(slideInLeft, {
        params: {
          timing: .5,
          a: '0%',
          b: '100%',
        }}))
    ])
  ],
})

export class HeaderMobileComponent implements OnInit {
  currentDrawerState:string = 'hide';
  mobileView: boolean;

  constructor(private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit() {
    if (window.screen.width <= 991) {
      this.mobileView = true;
    }
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.toggleSidebar();
  }

  toggleSidebar() {
    const element = document.getElementById('navbarSupportedContent');
    // this.currentDrawerState = this.currentDrawerState === 'show' ? 'hide' : 'show';
    // if (this.currentDrawerState === 'show') {
    //   this.renderer.setStyle(document.body, 'position', 'fixed');
    //   this.renderer.setStyle(document.body, 'min-width', '100%');
    // } else {
    //   this.renderer.removeStyle(document.body, 'position');
    //   this.renderer.removeStyle(document.body, 'min-width');
    // }
    this.renderer.removeClass(element, 'show');
  }
}
