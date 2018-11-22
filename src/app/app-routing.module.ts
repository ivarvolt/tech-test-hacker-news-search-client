import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsListComponent} from './news-list/component/news-list.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {NewsListResolver} from './news-list/news-list.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: './news-list/news-list.module#NewsListModule'
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
