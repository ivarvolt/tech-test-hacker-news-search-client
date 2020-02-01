import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {NewsListService} from './news-list.service';
import {ActivatedRoute} from '@angular/router';
import {HackerNewsResponse} from './interfaces/hacker-news-response';

@Component({
  selector: 'news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsListComponent implements OnInit {
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  news: HackerNewsResponse;
  searchInput = '';
  isLoadingNews = true;
  newsCount = 0;
  pageSize = this.newsListService.defaultPageSize;
  pageSizeOptions: number[] = [20, 40, 80, 160];

  constructor(private newsListService: NewsListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.news = this.route.snapshot.data['news'] as HackerNewsResponse;
    if (this.news) {
      this.updateNewsData(this.news);
    }
  }

  doAutomaticSearch() {
    if (this.searchInput.length >= 6) {
      this.getNewsBySearch(this.searchInput);
    }
  }

  pageEvent(event: PageEvent) {
    this.isLoadingNews = true;
    if (this.searchInput !== '') {
      this.getNewsBySearch(this.searchInput, event.pageIndex, event.pageSize);
    } else {
      this.getFrontPageNews(event.pageIndex, event.pageSize);
    }
  }

  getNewsBySearch(searchWord: string, page?: number, pageSize?: number) {
    this.paginator.firstPage();
    this.isLoadingNews = true;
    this.newsListService.getNewsBySearch(searchWord, page, pageSize).subscribe((news: HackerNewsResponse) => {
      this.updateNewsData(news);
    });
  }

  private getFrontPageNews(page?: number, pageSize?: number) {
    this.newsListService.getFrontPageNews(page, pageSize).subscribe((news: HackerNewsResponse) => {
      this.updateNewsData(news);
    });
  }

  private updateNewsData(news: HackerNewsResponse) {
    this.news = news;
    this.newsCount = news.nbHits;
    this.isLoadingNews = false;
  }
}
