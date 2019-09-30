import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { from as observableFrom } from 'rxjs';
import { config } from '../config';
import { News } from '../news/news';

@Injectable({
	providedIn: 'root'
})
export class NewsService {

	newsArray: News[];

	userRole: any;

	private handleError(error: HttpErrorResponse) {
		return throwError('Error! something went wrong.');
	}

	constructor(private http: HttpClient) { }



	
	//add news
	addNews(data) {
		return this.http.post(config.baseApiUrl + "news", data);
	}

	//fetch all news
	getAllNews(): Observable<News[]> {

		this.userRole = JSON.parse(localStorage.getItem('userRole'));

		if (this.userRole == 'subadmin') {
			return this.http.get(config.baseApiUrl + `newsPostListAdmin`).pipe(
				map((res) => {
					this.newsArray = res['data'];
					return this.newsArray;
				}),
				catchError(this.handleError));
		} else {
			return this.http.get(config.baseApiUrl + `news`).pipe(
				map((res) => {
					this.newsArray = res['data'];
					return this.newsArray;
				}),
				catchError(this.handleError));
		}

	}

	getAllPendingNews() {
		console.log('Api calling');
		return this.http.get(config.baseApiUrl + "news?isApproved=PENDING");
	}


	//delete news
	deleteNews(newsId) {
		return this.http.delete(config.baseApiUrl + "news?newsId=" + newsId, {});
	}
	updateNews(data, id) {
		console.log('data:', data);
		console.log('id:', id);
		return this.http.put(config.baseApiUrl + "news?newsId=" + id, data);
	}

	approveNews(newsId) {
		const data = {
			postId: newsId,
			isApproved: 'APPROVED'
		}
		return this.http.put(config.baseApiUrl + "news-approve", data);
	}

	rejectNews(newsId) {
		const data = {
			postId: newsId,
			isApproved: 'REJECTED'
		}
		return this.http.put(config.baseApiUrl + "news-approve", data);
	}
}