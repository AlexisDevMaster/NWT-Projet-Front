import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { PeopleComponent } from './people/people.component';
import { UpdateComponent } from './update/update.component';
import { PersonComponent } from './person/person.component';
import {HistoryComponent} from './history/history.component';
import {VideoComponent} from './video/video.component';
import {CategoriesComponent} from './categories/categories.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';
import {CategoryComponent} from './category/category.component';
import {VideosComponent} from './videos/videos.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AdsComponent} from './ads/ads.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'video/:url', component: VideoComponent },

  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:name', component: CategoryComponent },

  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: 'person/:id', component: PersonComponent },

  { path: 'admin', component: AdminComponent },


  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
