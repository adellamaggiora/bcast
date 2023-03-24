import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
// import { LoaderService } from '../loader.service';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor( private toastService: ToastService, private router: Router ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // this.loaderService.show();

    console.log('catched')

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.router.navigate(['login'])
          }
          this.toastService.danger(error.message)
          return throwError(error.message)
        }),
        finalize(() => {
          //this.loaderService.hide()
        })
      )
  }


}
