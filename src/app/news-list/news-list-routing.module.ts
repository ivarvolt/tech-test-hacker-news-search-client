import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NewsListComponent} from './component/news-list.component';
import {NewsListResolver} from './news-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: NewsListComponent,
    resolve: {
      news: NewsListResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class NewsListRoutingModule {
}
