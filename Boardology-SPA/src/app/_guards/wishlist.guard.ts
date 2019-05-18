import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
    providedIn: 'root'
})
export class WishlistGuard implements CanActivate {
    constructor(
        private authService: AuthService
    ) { }

    canActivate(): boolean {
        const isLoggedIn = this.authService.checkLogin();
        this.authService.redirectUrl = '/wishlist';
        return isLoggedIn;
    }
}
