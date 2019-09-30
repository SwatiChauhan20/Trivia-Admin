import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AuthGuard, AdminGuard } from './auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CategoriesComponent} from './categories/categories.component';
import {NewsComponent} from './news/news.component';
import {SubAdminComponent} from './sub-admin/sub-admin.component';
import {OtherDetailsComponent} from './other-details/other-details.component';
import {PendingPostsComponent} from './pending-posts/pending-posts.component';
import {UserStatusComponent} from './user-status/user-status.component';
const routes: Routes = [
{
	path: '',
	pathMatch: "full",
	redirectTo: "login"
},
{
	path: 'login',
	component: LoginComponent,
},
{
	path: 'dashboard',
	component: DashboardComponent,
	canActivate: [AuthGuard]
},
{
	path: 'categories',
	component: CategoriesComponent,
	canActivate: [AdminGuard]
},
{
	path: 'trivia-posts',
	component: NewsComponent,
	canActivate: [AuthGuard]
},
{
	path: 'sub-admin',
	component: SubAdminComponent,
	canActivate: [AdminGuard]
},
{
	path: 'other-details',
	component: OtherDetailsComponent,
	canActivate: [AdminGuard]
},
{
	path: 'pending-posts',
	component: PendingPostsComponent,
	canActivate: [AdminGuard]
},
{
	path: 'user-status',
	component: UserStatusComponent,
	canActivate: [AdminGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }