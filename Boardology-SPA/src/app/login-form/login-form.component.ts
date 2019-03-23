import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  model: any = {};
  authenticationError = false;
  authenticationErrorText: string;

  constructor(private authService: AuthService, private location: Location, private router: Router) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      next => {
        console.log('logged in successfully');
      },
      error => {
        console.log(error);
        this.authenticationErrorText = error.error;
        this.authenticationError = true;
      },
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['/']);
  }
}
