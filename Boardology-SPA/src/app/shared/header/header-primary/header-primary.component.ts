import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { trigger, transition, useAnimation, state, style, animate } from '@angular/animations';
import { slideInLeft, slideOutLeft } from 'ng-animate';

@Component({
  selector: 'app-header-primary',
  templateUrl: './header-primary.component.html',
  styleUrls: ['./header-primary.component.scss'],
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

export class HeaderPrimaryComponent implements OnInit {
  currentDrawerState = 'hide';

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.toggleSidebar();
  }

  toggleSidebar() {
    this.currentDrawerState = this.currentDrawerState === 'show' ? 'hide' : 'show';
  }
}
