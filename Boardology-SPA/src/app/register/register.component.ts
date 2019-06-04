import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from '../_models/user-for-register';
import { AuthService } from '../_services/auth.service';
import { Location } from '@angular/common';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserForRegister;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
        confirmPassword: ['', Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Successfully created account!', 2);
        this.authService.login(this.user).subscribe();
      }, error => {
        this.alertify.error(error.error);
      });
    } else {
      this.registerForm.get('username').markAsTouched();
      this.registerForm.get('email').markAsTouched();
      this.registerForm.get('password').markAsTouched();
      this.registerForm.get('confirmPassword').markAsTouched();
    }
  }

  cancel() {
    this.alertify.confirm('Are you sure you want to cancel?', undefined, undefined, () => {
      this.router.navigate(['/']);
    });
  }

}
