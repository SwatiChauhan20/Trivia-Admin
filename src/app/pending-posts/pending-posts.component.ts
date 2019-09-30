import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pending-posts',
  templateUrl: './pending-posts.component.html',
  styleUrls: ['./pending-posts.component.css']
})
export class PendingPostsComponent implements OnInit {

  newList: any = [];
  Page: Number = 1;

  constructor(public _newsService: NewsService) { }

  ngOnInit() {
    this.getPendingNews();
  }

  //get all category
  getPendingNews(): void {
    this._newsService.getAllPendingNews().subscribe((res: any) => {
      console.log('Resonse:', res.data);
      this.newList = res.data;
    }, (err) => {
      console.log('Resonse:', err);
    });
  }

  approveNews(newsId): void {
    console.log('Approve News Click', newsId);

    this._newsService.approveNews(newsId).subscribe((res: any) => {
      console.log('Resonse:', res.data);

      Swal.fire({
        type: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 2000
      })
      this.getPendingNews();
    }, (err) => {
      console.log('Resonse:', err);
    });
  }


  rejectNews(newsId): void {
    console.log('Reject News Click', newsId);

    this._newsService.rejectNews(newsId).subscribe((res: any) => {
      console.log('Resonse:', res.data);
      Swal.fire({
        type: 'success',
        title: res.message,
        showConfirmButton: false,
        timer: 2000
      })
      this.getPendingNews();
    }, (err) => {
      console.log('Resonse:', err);
    });
  }

}


