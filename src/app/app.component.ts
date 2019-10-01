import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
declare var $;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'triviaAdmin';
  loggedIn: boolean = false;
  loggedInUser = JSON.parse(localStorage.getItem("triviaAdmin"));
  admin = JSON.parse(localStorage.getItem("userRole"));
  userRole;
  subUserRole;
  constructor(private cdRef: ChangeDetectorRef, private router: Router, public auth: LoginService) {
    this.auth.userRole.subscribe((data: any) => {
      this.userRole = data.test;
    })
    this.auth.subUserRole.subscribe((data: any) => {
      this.subUserRole = data.test1;
    })
  }

  ngOnInit() {
    $(document).ready(function () {
      $(".dashboard-link li a").click(function () {
        $('.dashboard-link li a').removeClass("active");
        $(this).addClass("active");
      });
      if (/\/login/g.test(window.location.href)) {
        $("#sidebarCollapse").addClass("helloo");
      } else {
        $("#sidebarCollapse").removeClass("helloo");
      }

    });
  }
  Logout() {
    localStorage.clear();
    this.loggedIn = false;
    setTimeout(function () { window.location.reload() }, 1);
    this.router.navigate(['/login']);
  }
}
