import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsListResolver} from './news-list.resolver';
import {NewsListComponent} from './news-list.component';
import {SharedModule} from '../common/shared.module';
import {NewsListRoutingModule} from './news-list-routing.module';
import { NewsListCardComponent } from './card/news-list-card.component';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsListCardComponent,
  ],
  imports: [
    CommonModule,
    NewsListRoutingModule,
    SharedModule,
  ],
  providers: [
    NewsListResolver
  ]
})
export class NewsListModule { }
