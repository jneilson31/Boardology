import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserForRegister } from '../_models/user-for-register';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { ChangePassword } from '../_models/change-password.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}auth/`;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: UserForRegister;
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {}


  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }

        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        } else {
          this.router.navigate(['/']);
        }
      })
    );
  }

  loginWithAutologinToken(model: any) {
    return this.http.post(this.baseUrl + 'autologin', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }

        // if (this.redirectUrl) {
        //   this.router.navigate([this.redirectUrl]);
        //   this.redirectUrl = null;
        // } else {
        //   this.router.navigate(['/']);
        // }
      })
    );
  }

  changePassword(changePassword: ChangePassword) {
    return this.http.post(this.baseUrl + 'change-password', changePassword);
  }

  register(user: UserForRegister) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  resetPassword(emailAddress: any) {
    return this.http.post(this.baseUrl + 'reset-password', emailAddress);
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  checkLogin(): boolean {

    if (this.loggedIn()) {
      return true;
    }
      this.redirectUrl = this.router.url;
      this.router.navigate(['login']);
      return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.decodedToken = null;
  }
}
