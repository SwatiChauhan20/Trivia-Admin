import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { from as observableFrom } from 'rxjs';
import { config } from '../config';
import { SubAdmin } from '../sub-admin/sub-admin';
import { OtherDetails } from '../other-details/otherDetails';

@Injectable({
	providedIn: 'root'
})
export class SubAdminService {

	subAdminArray: SubAdmin[];
	otherDetailsArray: OtherDetails[];

	private handleError(error: HttpErrorResponse) {
		return throwError('Error! something went wrong.');
	}

	constructor(private http: HttpClient) { }

	//add news
	addSubAdmin(data) {
		return this.http.post(config.baseApiUrl + "subadmin", data);
	}

	getAll(): Observable<SubAdmin[]> {
		return this.http.get(config.baseApiUrl + `subadmin`).pipe(
			map((res) => {
				this.subAdminArray = res['data'];
				return this.subAdminArray;
			}),
			catchError(this.handleError));
	}

	deleteSubAdmin(userId) {
		return this.http.delete(config.baseApiUrl + "subadmin?userId=" + userId);
	}

	updateSubAdmin(subAdmin) {
		return this.http.put(config.baseApiUrl + "subadmin", subAdmin);
	}

	addOtherDetails(data) {
		return this.http.post(config.baseApiUrl + "terms", data);
	}
	updateOtherDetails(data) {
		​
				console.log('Updated Data:', data);
		​
				return this.http.put(config.baseApiUrl + "terms", data);
			}
	getOtherDetails(): Observable<OtherDetails[]> {
		return this.http.get(config.baseApiUrl + `terms`).pipe(
			map((res) => {
				this.otherDetailsArray = res['data'];
				return this.otherDetailsArray;
			}),
			catchError(this.handleError));
	}
	getAllUsers(): Observable<SubAdmin[]> {
		return this.http.get(config.baseApiUrl + `user`).pipe(
			map((res) => {
				this.subAdminArray = res['data'];
				return this.subAdminArray;
			}),
			catchError(this.handleError));
	}

	getUserFeedback() {
		return this.http.get(config.baseApiUrl + 'feedback');
	}
}	
