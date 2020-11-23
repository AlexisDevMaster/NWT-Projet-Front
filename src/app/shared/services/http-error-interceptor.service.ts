import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor{

  constructor(public router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = 'invald token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

    return next.handle(req).pipe(
      catchError((error) => {
        let handled = false;
        // console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
          } else {
            switch (error.status) {
              case 401:      // login
                this.router.navigateByUrl('/login');
                console.log(`redirect to login`);
                handled = true;
                break;
              case 403:     // forbidden
                this.router.navigateByUrl('/login');
                console.log(`redirect to login`);
                handled = true;
                break;
              case 404:     // forbidden
                this.router.navigate(['/404']);
                handled = true;
                break;
            }
          }
        }

        if (handled) {
          return of(error);
        } else {
          return throwError(error);
        }

      })
    );
  }
}
