import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { config } from '../config';
import { CKEditor4 } from 'ckeditor4-angular';
import { SubAdminService } from '../services/sub-admin.service';
import { OtherDetails } from './otherDetails';
import Swal from 'sweetalert2';
declare var $;
@Component({
    selector: 'app-other-details',
    templateUrl: './other-details.component.html',
    styleUrls: ['./other-details.component.css']
})
export class OtherDetailsComponent implements OnInit {
    config: any;
    details: FormGroup;
    editDetail: FormGroup
    fileLogo: any = [];
    error = '';
    mediaPath = config.mediaApiUrl;
    other_details: OtherDetails[];
    submitted: any = false;
    other: any;
    url: any;
    constructor(public _subAdmin: SubAdminService) {
        this.details = new FormGroup({
            logo: new FormControl('', Validators.required),
            terms: new FormControl('', Validators.required),
            policy: new FormControl('', Validators.required),
            applink: new FormControl('', Validators.required)
        });
        this.editDetail = new FormGroup({
            termsId: new FormControl('', Validators.required),
            logo: new FormControl('', Validators.required),
            terms: new FormControl('', Validators.required),
            policy: new FormControl('', Validators.required),
            applink: new FormControl('', Validators.required),
        });
    }
    ngOnInit() {
        var self = this;
        this.getOtherDetails();
        $(document).on('click', 'body *', function () {
            self.hello();
        });
        this.getOtherDetails();
        this.config = {
            toolbar: [
                ['Maximize', 'Bold'],
                ['NumberedList', 'BulletedList'],
                ['Cut', 'Copy'],
                ['Undo', 'Redo']
            ]
        };
        this.getOtherDetails();
    }
    otherDetails = {
        logo: "",
        terms: "",
        policy: ""
    }
    hello() {
        if (this.other) {
            this.getOtherDetails();
        }
    }

    get f() { return this.details.controls; }

    extraDetails(otherDetails) {

        this.submitted = true;
        // stop here if form is invalid
        if (this.details.invalid) {
            return;
        } else {
            const data = new FormData();
            _.forOwn(this.details.value, (value, key) => {
                data.append(key, value);
            });
            console.log(this.fileLogo.length);
            if (this.fileLogo.length > 0) {
                for (let i = 0; i <= this.fileLogo.length; i++) {
                    data.append('logo', this.fileLogo[i]);
                }
            }
            this._subAdmin.addOtherDetails(data).subscribe((res: any) => {
                Swal.fire({
                    type: 'success',
                    title: res.message,
                    showConfirmButton: false,
                    timer: 2000
                })
                $('#policyModal').modal('hide');
                this.details.reset();
                this.getOtherDetails();
            }, err => {
                console.log(err);
            })
        }
    }

    updateDetail(details) {
        details["termsId"] = (<HTMLInputElement>document.getElementById("termsId")).value;
        const data = new FormData();
        _.forOwn(details, (value, key) => {
            data.append(key, value);
        });
        console.log(this.fileLogo.length);
        if (this.fileLogo.length > 0) {
            for (let i = 0; i <= this.fileLogo.length; i++) {
                data.append('logo', this.fileLogo[i]);
            }
        }
        this._subAdmin.updateOtherDetails(data).subscribe((res: any) => {
            this.details.reset();
            Swal.fire({
                type: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 2000
            })
            this.getOtherDetails();
        }, err => {
            console.log(err);
        })
    }
    editOtherDetail(other) {
        console.log('Other Detail:', other);
        this.other = other;
    }
    logoImage(event) {
        this.fileLogo = event.target.files;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.url = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    //get all category
    getOtherDetails(): void {
        this._subAdmin.getOtherDetails().subscribe(
            (res: OtherDetails[]) => {
                this.other_details = res;
            },
            (err) => {
                this.error = err;
            });
    }
}