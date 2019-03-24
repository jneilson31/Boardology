import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  user: any = {};
  authenticationError = false;
  authenticationErrorText: string;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private location: Location, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
      }
    );
  }

  login() {
    if (this.loginForm.valid) {
    this.user = Object.assign({}, this.loginForm.value);
    this.authService.login(this.user).subscribe(
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
  } else {
      this.loginForm.get('email').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      console.log('nope');
      console.log(this.loginForm);
      console.log(this.user);
  }
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['/']);
  }
}

