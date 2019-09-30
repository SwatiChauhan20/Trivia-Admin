import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../app/services/login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	userRole;
	accessToken = JSON.parse(localStorage.getItem("triviaAdmin"));
	subUserRole;
	constructor(private router: Router, public auth: LoginService) {
		this.auth.subUserRole.subscribe((data: any) => {
			this.subUserRole = data.test1;
			console.log(this.subUserRole);
		})
	}
	canActivate(): boolean {
		console.log("localstorage admin details ", this.subUserRole);
		if (this.accessToken) {
			return true
		} else {
			this.router.navigate(['/login'])
			return false;
		}
	}
}

@Injectable({
	providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	accessToken = JSON.parse(localStorage.getItem("triviaAdmin"));
	userRole;
	admin = JSON.parse(localStorage.getItem("userRole"));
	constructor(private router: Router, public auth: LoginService) {
		this.auth.userRole.subscribe((data: any) => {
			console.log("he bhagvan ama login user avu joye", data);
			this.userRole = data.test;
			console.log(this.userRole)
		})
		console.log("admin user details ", this.admin);
	}

	canActivate(): boolean {
		if (this.accessToken) {
			if (this.userRole === 'admin' || this.admin === 'admin') {
				return true;
			} else {
				Swal.fire({
					type: 'warning',
					title: 'unauthorised access',
					showConfirmButton: false,
					timer: 2000
				})
				this.router.navigate(['/dashboard'])
				return false;
			}
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}