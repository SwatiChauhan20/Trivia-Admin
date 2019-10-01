import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import * as _ from 'lodash';
import { Categories } from './categories';
import { config } from '../config';
import Swal from 'sweetalert2';
declare var $;

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
	file: any = [];
	category_array: Categories[];
	singleCat: [];
	error = '';
	mediaPath = config.mediaApiUrl;
	url: any;
	catdata: any;
	P: Number = 1;
	category_form: FormGroup;
	editcatr_form: FormGroup;

	submitted: any = false;

	constructor(public _categoryService: CategoryService) {
		this.category_form = new FormGroup({
			categoryTitle: new FormControl('', Validators.required),
		});

		this.editcatr_form = new FormGroup({
			categoryTitle: new FormControl('', Validators.required),
		});

	}

	ngOnInit() {
		this.getCategories();
		var self = this;
		$(document).on('click', 'body *', function () {
			self.hello();
		});
	}

	hello() {
		if (this.singleCat) {
			this.getCategories();
		}
	}

	get f() { return this.category_form.controls; }



	categories = {
		categoryTitle: "",
	}

	resetUpdateForm() {
		this.editcatr_form.reset();
		this.getCategories();
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

	// add category
	addCategory(data) {
		this.submitted = true;
		if (this.category_form.invalid) {
			return;
		} else {
			this._categoryService.addCategory(data).subscribe((res: any) => {
				Swal.fire({
					type: 'success',
					title: res.message,
					showConfirmButton: false,
					timer: 2000
				})

				$('#modaladdTechnologyForm').modal('hide');

				this.category_form.reset();
				this.getCategories();
			}, err => {
				console.log(err);
			})
		}
	}

	cat_image(event) {
		this.file = event.target.files;
	}

	//get data for edit
	editCat(category) {
		this.singleCat = category;
	}

	//delete category
	deleteCategory(categoryId) {
		this._categoryService.deleteCategory(categoryId).subscribe((res: any) => {
			Swal.fire({
				type: 'success',
				title: res.message,
				showConfirmButton: false,
				timer: 2000
			})
			this.getCategories();
		}, err => {
			console.log(err);
		})
	}





	//for upadting the category
	updateCat(singleCat) {
		this.catdata = {
			categoryTitle: singleCat.categoryTitle,
			categoryId: singleCat.categoryId
		}
		this._categoryService.updateCategory(this.catdata).subscribe((res: any) => {
			this.editcatr_form.reset();
			Swal.fire({
				type: 'success',
				title: res.message,
				showConfirmButton: false,
				timer: 2000
			})
			$('#myModal').modal('hide');
			this.getCategories();
		}, err => {
			console.log(err);
		})
	}

	// for image preview on edit click
	public addFile(event: any) {
		this.file = event.target.files;
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.onload = (event: any) => {
				this.url = event.target.result;
			}
			reader.readAsDataURL(event.target.files[0]);
		}
	}
}
