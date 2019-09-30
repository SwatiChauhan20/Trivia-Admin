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
      console.log("he bhagvan ama login user avu joye", data);
      this.userRole = data.test;
      console.log(this.userRole)
    })
    this.auth.subUserRole.subscribe((data: any) => {
      this.subUserRole = data.test1;
      console.log(this.subUserRole);
    })
  }

  ngOnInit() {
    console.log(this.admin);
    $(document).ready(function () {
      $('.dashboard-link li a').click(function () {
        $('.dashboard-link li a').removeClass("active");
        $(this).addClass("active");
      });
      console.log(window.location.href);
      if (/\/login/g.test(window.location.href)) {
        console.log("Hye");
        $("#hey").addClass("helloo");
      }else{
        $("#hey").removeClass("helloo");
      }
    });
  }
  Logout() {
    localStorage.clear();
    // localStorage.removeItem("triviaAdmin");
    this.loggedIn = false;
    setTimeout(function () { window.location.reload() }, 1);
    this.router.navigate(['/login']);
  }
}
