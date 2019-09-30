import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from './services/login.service';
import { CategoryService } from './services/category.service';
import { AuthGuard, AdminGuard } from './auth.guard';
import { CategoriesComponent } from './categories/categories.component';
import { NewsComponent } from './news/news.component';
import { SubAdminComponent } from './sub-admin/sub-admin.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { OtherDetailsComponent } from './other-details/other-details.component';
import { PendingPostsComponent } from './pending-posts/pending-posts.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { AuthInterceptor } from './services/auth.interceptor';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoriesComponent,
    NewsComponent,
    SubAdminComponent,
    OtherDetailsComponent,
    PendingPostsComponent,
    UserStatusComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxPaginationModule
    // ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}) //for disabling warning on using ngModel with formcontrol 
  ],
  providers: [LoginService, AuthGuard, AdminGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
ngOnInit(){
  console.log("helloooo=======")
}


 }
