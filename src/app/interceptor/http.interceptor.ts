import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  token: string;
  tenant: string;

  constructor() {
    this.token = environment.adminToken;
    this.tenant = environment.adminTenant;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let ok: string;

    let authReq: HttpRequest<any> = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + this.token).set('X-TENANT-ID', this.tenant)});

    return next.handle(authReq).pipe(
      tap(
        event => {
          console.log('richiesta intercettata correttamente')
          ok = event instanceof HttpRequest ? 'succeeded' : ''
        },
        error => { }
      ),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      }),
      finalize(() => {
        
      })
    );
  }
}
