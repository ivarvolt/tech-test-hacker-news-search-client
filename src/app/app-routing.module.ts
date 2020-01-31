import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./news-list/news-list.module').then(m => m.NewsListModule)
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
