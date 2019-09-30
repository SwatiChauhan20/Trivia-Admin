import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { config } from '../config';
import { NewsService } from '../services/news.service';
import { News } from '../news/news';
import { SubAdmin } from '../sub-admin/sub-admin';
import { SubAdminService } from '../services/sub-admin.service';
import { CategoryService } from '../services/category.service';
declare var $;
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	categoryCount: any;
	pendingPostCount: any;
	fileNews: any = [];
	error = '';
	mediaPath = config.mediaApiUrl;
	news_array: News[];
	userRole: any;
	url: any;
	config: any;
	constructor(public _newsService: NewsService, public _userService: SubAdminService , public _categoryService: CategoryService) { }
	userCount: any;
	postCount: any;
	Page: Number = 1;
	ngOnInit() {
		$(document).ready(function(){
			$('#hey').removeClass("helloo");
		});
		this.getNews();
		this.getAllUsers();
		this.getAllCategories();
		this.getAllPendingNews();
	}


	//get all category
	getNews(): void {
		this._newsService.getAllNews().subscribe(
			(res: News[]) => {
				this.news_array = res;
				this.postCount = res.length
			},
			(err) => {
				this.error = err;
			});
	}

	//get count of users
	getAllUsers(): void {
		this._userService.getAllUsers().subscribe(
			(res: SubAdmin[]) => {
				this.userCount = res.length;
			},
			(err) => {
				this.error = err;
			});
	}
	//get all  categories count
	getAllCategories(): void {
        this._categoryService.getAll().subscribe(
            (res: SubAdmin[]) => {
                this.categoryCount = res.length;
                console.log('Category Count', this.categoryCount);
            },
            (err) => {
                this.error = err;
            });
	}
	//get all pending post count 
	getAllPendingNews(): void {
        this._newsService.getAllPendingNews().subscribe(
            (res: any) => {
                this.pendingPostCount = res.data.length;
                console.log('Pending Post Count', this.pendingPostCount);
            },
            (err) => {
                this.error = err;
            });
    }
}
