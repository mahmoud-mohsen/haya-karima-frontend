import { AuthService } from './services/auth-service.service';
import { map } from 'rxjs/operators';
import { BackendService } from './services/backend.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.authService.isTokenExist()) {

            if (this.authService.isTokenExpired()) {
                // not logged in so redirect to login page with the return url
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false;

            } else {
                return true;
            }
        } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

    }



}