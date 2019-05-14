import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordResetForm: FormGroup;
  email: any = {};

  constructor(private fb: FormBuilder, private alertify: AlertifyService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.createPasswordResetForm();
  }

  createPasswordResetForm() {
    this.passwordResetForm = this.fb.group(
      { email: ['', Validators.required]}
      );
  }

  resetPassword() {
    if (this.passwordResetForm.valid) {
      this.email = Object.assign({}, this.passwordResetForm.value);
      this.authService.resetPassword(this.email).subscribe(
        next => {
          this.alertify.success(`If a matching account was found an email was sent to ${this.passwordResetForm.value.email}
          to allow you to reset your password`, 4);
        },
        error => {
          this.alertify.error(error.error, 3);
        });
    } else {
      this.passwordResetForm.get('email').markAsTouched();
    }
  }

  cancel() {
    this.alertify.confirm('Are you sure you want to cancel?', undefined, undefined, () => {
      this.router.navigate(['/']);
    });
  }

}
