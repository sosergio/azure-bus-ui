
import { UserContextService } from './../services/user-context.service';
import { Inject, Injectable, forwardRef, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private userContextService: UserContextService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((err: HttpErrorResponse) => {

        if (err.status === 401) {
          console.log('401 response intercepted, removing the accesstoken');
          this.userContextService.setAccessTokenExpired();
          return Observable.empty<HttpEvent<any>>();
        }
        throw err.error;
      });
  }
}
