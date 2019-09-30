import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { from as observableFrom } from 'rxjs';
import { config } from '../config';
import { Categories } from '../categories/categories';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	categories: Categories[];
	private handleError(error: HttpErrorResponse) {
		return throwError('Error! something went wrong.');
	}

	constructor(private http: HttpClient) { }

	addCategory(details) {
		console.log(details);
		return this.http.post(config.baseApiUrl + "category", details);
	}

	getAll(): Observable<Categories[]> {
		return this.http.get(config.baseApiUrl + `category`).pipe(
			map((res) => {
				this.categories = res['data'];
				return this.categories;
			}),
			catchError(this.handleError));
	}

	deleteCategory(catId) {
		return this.http.delete(config.baseApiUrl + "category/?id=" + catId, {});
	}

	updateCategory(catdata) {
		return this.http.put(config.baseApiUrl + "category", catdata);
	}
}