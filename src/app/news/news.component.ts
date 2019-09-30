import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { config } from '../config';
import { NewsService } from '../services/news.service';
import { CategoryService } from '../services/category.service';
import { Categories } from '../categories/categories';
import { News } from './news';
import { CKEditor4 } from 'ckeditor4-angular';
import Swal from 'sweetalert2';
declare var $;

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
	fileNews: any = [];
	category_array: Categories[];
	error = '';
	mediaPath = config.mediaApiUrl;
	news_array: News[];
	singleNews: any;
	url: any;
	config: any;
	userRole: any;
	news_form: FormGroup;
	editnews_form: FormGroup;
	P: Number = 1;

	files: any;
	imgURL;
	urls = new Array<string>();

	constructor(public _newsService: NewsService, public _categoryService: CategoryService) {
		this.news_form = new FormGroup({
			newsTitleEnglish: new FormControl('', Validators.required),
			newsTitleHindi: new FormControl('', Validators.required),
			newsEnglish: new FormControl('', Validators.required),
			newsHindi: new FormControl('', Validators.required),
			newsImage: new FormControl('', Validators.required),
			categoryId: new FormControl('', Validators.required),
			newsType: new FormControl('', Validators.required),
		});

		this.editnews_form = new FormGroup({
			newsTitleEnglish: new FormControl('', Validators.required),
			newsTitleHindi: new FormControl('', Validators.required),
			newsEnglish: new FormControl('', Validators.required),
			newsHindi: new FormControl('', Validators.required),
			newsImage: new FormControl('', Validators.required),
			categoryId: new FormControl('', Validators.required),
			newsType: new FormControl('', Validators.required),
		});
	}

	ngOnInit() {
		var self = this;
		this.getNews();;
		$(document).on('click', 'body *', function () {
			// console.log("Hey");
			self.hello();
		});
		this.config = {
			toolbar: [
				['Maximize'],
				['NumberedList', 'BulletedList'],
				['Cut', 'Copy'],
				['Undo', 'Redo']
			]
		};
		this.getCategories();
		this.getNews();
	}

	hello() {
		if (this.singleNews) {
			this.getNews();
			// console.log("hey 2");
		}
	}
	resetUpdateForm() {
		this.editnews_form.reset();
		this.getNews();
	}

	news_image(event) {

		this.fileNews = event.target.files;

		if (this.fileNews) {
			let reader = new FileReader();
			reader.onload = (e: any) => {
				this.urls = e.target.result;
			}
			reader.readAsDataURL(this.fileNews[0]);
		}
	}

	//get all category
	getCategories(): void {
		this._categoryService.getAll().subscribe(
			(res: Categories[]) => {
				this.category_array = res;
			},
			(err) => {
				this.error = err;
			});
	}

	//get all category
	getNews(): void {


		this._newsService.getAllNews().subscribe(
			(res: News[]) => {
				console.log("news responde =====>" , res);
				this.news_array = res;
			},
			(err) => {
				this.error = err;
			});
	}

	//add news
	addNews() {

		console.log('News Data:', this.news_form.value);

		const data = new FormData();
		_.forOwn(this.news_form.value, (value, key) => {
			data.append(key, value);
		});

		if (this.fileNews.length > 0) {
			for (let i = 0; i <= this.fileNews.length; i++) {
				data.append('newsImage', this.fileNews[i]);
			}

		}

		this._newsService.addNews(data).subscribe((res: any) => {
			this.news_form.reset();
			Swal.fire({
				type: 'success',
				title: res.message,
				showConfirmButton: false,
				timer: 2000
			})
			this.getNews();
		}, err => {

		})
	}

	editNews(news) {
		this.singleNews = news;
		console.log(this.singleNews);
	}

	//delete news
	deleteNews(newsId) {
		this._newsService
			.deleteNews(newsId)
			.subscribe((res: any) => {
				Swal.fire({
					type: 'success',
					title: res.message,
					showConfirmButton: false,
					timer: 2000
				})
				this.getNews();
			})
	}

	// for image preview on edit click
	public addFile(event: any) {
		this.fileNews = event.target.files;
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = (event: any) => {
				this.url = event.target.result;
			}
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	updateCat(news) {
		news["newsId"] = (<HTMLInputElement>document.getElementById("hey")).value;
		console.log("news in update cat", news);
		const data = new FormData();
		_.forOwn(this.editnews_form.value, (value, key) => {
			data.append(key, value);
		});

		if (this.fileNews.length > 0) {
			for (let i = 0; i <= this.fileNews.length; i++) {
				data.append('newsImage', this.fileNews[i]);
			}
		}
		this._newsService.updateNews(data, news.newsId).subscribe((res: any) => {
			console.log("res=========>", res);
			this.editnews_form.reset();
			Swal.fire({
				type: 'success',
				title: res.message,
				showConfirmButton: false,
				timer: 2000
			})
			this.getCategories();
			this.getNews();
		},
			err => {
				console.log(err);
			})
	}
}