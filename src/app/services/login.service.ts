import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { from as observableFrom } from 'rxjs';
import { config } from '../config';

@Injectable({
	providedIn: 'root'
})

export class LoginService {


	toast: any;
	@Output() userRole = new EventEmitter();
	@Output() subUserRole = new EventEmitter();
	private handleError(error: HttpErrorResponse) {
		return throwError('Error! something went wrong.');
	}

	constructor(private http: HttpClient) { }

	authorize(detail) {
		console.log(detail);
		return this.http.post(config.baseApiUrl + "login", detail)
			.pipe(map((user: any) => {
				console.log("logins user detauils", user)
				if (user && user.data.accessToken) {
					localStorage.setItem("userRole", JSON.stringify(user.data.userRole));
					localStorage.setItem("triviaAdmin", JSON.stringify(user.data.accessToken));
				}
				if (user.data.userRole == 'admin') {
					let test = JSON.parse(localStorage.getItem("userRole"));
					console.log("this.userRole of admin==========", test);
					this.userRole.emit({ test });
				}
				if (user.data.userRole == 'subadmin') {
					let test1 = JSON.parse(localStorage.getItem("userRole"));
					console.log("this.userRole of admin==========", test1);
					this.subUserRole.emit({ test1 });
				}
				return user;
			}))
	}

	sendToken(detail: string) {
		localStorage.setItem("triviaAdmin", detail)
	}
	getToken() {
		return localStorage.getItem("triviaAdmin")
	}
	isLoggednIn() {
		return this.getToken() !== null;
	}
}
