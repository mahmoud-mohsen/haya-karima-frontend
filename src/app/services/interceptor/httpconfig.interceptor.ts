import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private router: Router
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
              alert("UnAuthorized");

                localStorage.removeItem('token');
                this.router.navigate(['/login', { queryParams: { returnUrl: this.router.url } }]);
            }else{
              const error = err.error.message || err.statusText;
              alert(error);
              return throwError(error);
            }
        }));
    }
}
