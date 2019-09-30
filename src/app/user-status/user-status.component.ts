import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { config } from '../config';
import { NewsService } from '../services/news.service';
import { News } from '../news/news';
import { SubAdmin } from '../sub-admin/sub-admin';
import { SubAdminService } from '../services/sub-admin.service';

@Component({
	selector: 'app-user-status',
	templateUrl: './user-status.component.html',
	styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
	fileNews: any = [];
	error = '';
	mediaPath = config.mediaApiUrl;
	news_array: News[];
	user_array: SubAdmin[];
	feedback_array: any = [];
	url: any;
	config: any;
	constructor(public _newsService: NewsService, public _userService: SubAdminService) { }
	userCount: any;
	p: Number = 1;
	Page: Number = 1;
	singlefeedback: any;

	ngOnInit() {
		this.getAllUsers();
		this.getUserFeedback();
	}

	//get count of users
	getAllUsers(): void {
		this._userService.getAllUsers().subscribe(
			(res: SubAdmin[]) => {
				this.user_array = res;
				this.userCount = res.length;
				console.log(this.user_array);
			},
			(err) => {
				this.error = err;
			});
	}

	viewMore(feedback) {
		this.singlefeedback = feedback;
	}


	getUserFeedback(): void {
		this._userService.getUserFeedback().subscribe(
			(res: any) => {
				console.log('Response:', res);
				this.feedback_array = res.data;
			},
			(err) => {
				this.error = err;
			});
	}
}
