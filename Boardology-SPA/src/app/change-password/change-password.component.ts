import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangePassword } from '../_models/change-password.model';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

  @Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
  })
export class ChangePasswordComponent implements OnInit {
  changePasswordData: ChangePassword;
  changePasswordForm: FormGroup;

    token: string;
    id: string;
    model: any;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private route: ActivatedRoute,
      private alertify: AlertifyService,
      private router: Router
      ) { }

  ngOnInit() {
    this.checkForAutologin();
    this.createChangePasswordForm();
  }

    createChangePasswordForm() {
      this.changePasswordForm = this.fb.group(
        {
          newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
          confirmNewPassword: ['', [Validators.required]],
        },
        { validator: this.passwordMatchValidator}
      );
    }

    passwordMatchValidator(g: FormGroup) {
      return g.get('newPassword').value === g.get('confirmNewPassword').value ? null : { 'mismatch': true };
    }

    changePassword(): void {
      if (this.changePasswordForm.valid) {
        // this.changePasswordData = Object.assign({}, this.changePasswordForm.value);
        this.changePasswordData = {
          id: this.id,
          token: this.token,
          newPassword: this.changePasswordForm.get('confirmNewPassword').value
        };
        this.authService.changePassword(this.changePasswordData)
        .subscribe(next => {
          this.alertify.success('Successfully changed password');
          this.router.navigate(['/']);
        }, error => {
          this.alertify.error('Could not change password');
        });
      } else {
        this.changePasswordForm.get('newPassword').markAsTouched();
        this.changePasswordForm.get('confirmNewPassword').markAsTouched();
      }
    }

    private checkForAutologin() {
      this.token = this.route.snapshot.queryParams['token'];
      this.id = this.route.snapshot.queryParams['id'];
      if (this.token && this.id) {
        this.model = {
          token: this.token,
          id: this.id
        };
        this.authService.loginWithAutologinToken(this.model)
          .subscribe(next => {
            this.alertify.success('Logged in with autologin token!');
          }, error => {
            this.alertify.error('could not sign in with autologin token');
          });
      }
    }
}
