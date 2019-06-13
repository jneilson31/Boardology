import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header-primary',
  templateUrl: './header-primary.component.html',
  styleUrls: ['./header-primary.component.scss']
})

export class HeaderPrimaryComponent implements OnInit {
  menuStatus = false;
  hasClicked = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onClickMenu() {
    this.menuStatus = !this.menuStatus;
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  onLogout() {
    this.authService.logout();
    this.menuStatus = !this.menuStatus;

  }

  toggleSidebar() {
    this.menuStatus = !this.menuStatus;
    this.hasClicked = true;
  }
}
