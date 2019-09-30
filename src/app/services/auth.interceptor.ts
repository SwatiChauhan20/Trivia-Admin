import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs/';
import { map, catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
// import 'rxjs/add/operator/do';
import Swal from 'sweetalert2';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private route: ActivatedRoute,
        private router: Router, ) { }
    /**
     * 
     * @param req 
     * @param next
     * When user request pass accessToken with all request and if any error display alert on every error
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = JSON.parse(localStorage.getItem('triviaAdmin'));

        // console.log("Interceptor AccessToken", accessToken);

        if (accessToken) {
            const cloned = req.clone({
                headers: req.headers.set("authorization", accessToken)
            });
            return next.handle(cloned)
                .pipe(
                    map((response: HttpResponse<any>) => {
                        return response;
                    }),

                    // Cath Error 400 Bad Request
                    catchError((error: HttpErrorResponse) => {
                        const errorMessage = error.error.message;

                        console.log('ErrorMessage===========>>>>', errorMessage);

                        if (error.status === 400) {
                            Swal.fire({
                                type: 'error',
                                title: errorMessage,
                                showConfirmButton: false,
                                timer: 2000
                            })
                        } else if (error.status === 500) {
                            Swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Internal Server Error!',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                        return throwError(error.error);
                    })
                );
        } else {
            return next.handle(req)
                .pipe(
                    map((event: HttpResponse<any>) => {
                        // console.log("interceptorsssssssssss events mdse ???", event);
                        return event;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        // console.log("interceptorsssssssss error in login", error);
                        let errorMessage = error.error.message;
                        // console.log("dkjsbkjsbbskfbdsbfbdsf", errorMessage);
                        if (error.status === 401) {
                            /**
                             * Alert of every error response
                             */
                            Swal.fire({
                                type: 'error',
                                title: "sorry",
                                text: errorMessage,
                                showConfirmButton: false,
                                timer: 2000
                            })
                            this.router.navigate(['/login']);
                        }
                        return throwError(error);
                    })
                );
        };

    }
}