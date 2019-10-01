import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubAdminService } from '../services/sub-admin.service';
import * as _ from 'lodash';
import { config } from '../config';
import { SubAdmin } from './sub-admin';
import Swal from 'sweetalert2';
declare var $;


@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.css']
})
export class SubAdminComponent implements OnInit {
  subadmin_array: SubAdmin[];
  Page: Number = 1;
  error: any;
  singleSubAdmin: [];
  subadminForm: FormGroup;
  editsubadminForm: FormGroup;
  submitted: any = false;

  constructor(public _subAdminService: SubAdminService) {
    this.subadminForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.editsubadminForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });

  }

  ngOnInit() {
    var self = this;
    $(document).on('click', 'body *', function () {
      self.hello();
    });

    this.getSubAdmin();
  }

  get f() { return this.subadminForm.controls; }

  hello() {
    if (this.singleSubAdmin) {
      this.getSubAdmin();
    }
  }

  subadmin = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  }

  //sub admin
  addSubAdmin(data) {

    this.submitted = true;

    // stop here if form is invalid
    if (this.subadminForm.invalid) {
      return;
    } else {
      this._subAdminService.addSubAdmin(data).subscribe((res: any) => {

        this.subadminForm.reset();

        Swal.fire({
          type: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 2000
        })

        $('#modaladdTechnologyForm').modal('hide');


        this.getSubAdmin();
      },
        err => {
          this.subadminForm.reset();
          $('#modaladdTechnologyForm').modal('hide');
        })

    }
  }

  //get all subadmin
  getSubAdmin(): void {
    this._subAdminService.getAll().subscribe(
      (res: SubAdmin[]) => {
        this.subadmin_array = res;
      },
      (err) => {
        this.error = err;
      });
  }

  //delete subAdmin
  deleteSubAdmin(userId) {
    this._subAdminService.deleteSubAdmin(userId).subscribe((res: any) => {
      Swal.fire({
        type: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 2000
      })
      this.getSubAdmin();
    })
  }

  editSubAdmin(subadmin) {
    this.singleSubAdmin = subadmin;
  }

  resetUpdateForm() {
    this.editsubadminForm.reset();
    this.getSubAdmin();
  }

  updateSubAdmin(subAdmin) {
    subAdmin["userId"] = (<HTMLInputElement>document.getElementById("subAdminId")).value;
    this._subAdminService.updateSubAdmin(subAdmin).subscribe((res: any) => {
      Swal.fire({
        type: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 2000
      })
      $('#myModal').modal('hide');
      this.editsubadminForm.reset();
      this.getSubAdmin();
    },
      err => {
        $('#myModal').modal('hide');
      })
  }
}