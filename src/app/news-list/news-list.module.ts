import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsListResolver} from './news-list.resolver';
import {NewsListComponent} from './component/news-list.component';
import {CoreModule} from '../core/core.module';
import {NewsListRoutingModule} from './news-list-routing.module';

@NgModule({
  declarations: [
    NewsListComponent,
  ],
  imports: [
    CommonModule,
    NewsListRoutingModule,
    CoreModule,
  ],
  providers: [
    NewsListResolver
  ]
})
export class NewsListModule { }
