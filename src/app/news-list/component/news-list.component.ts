import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material';
import {NewsListService} from '../news-list.service';
import {ActivatedRoute} from '@angular/router';
import {NewsListResolver} from '../news-list.resolver';
import {HackerNewsResponse} from '../dto/hacker-news-response';

@Component({
  selector: 'app-news-list',
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
    this.updateNewsData(this.news);
  }
  
  doAutomaticSearch(searchWord: string) {
    if (searchWord.length >= 6) {
      this.getNewsBySearch(searchWord);
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
  
  getCommentPageUrl(itemId: number) {
    this.newsListService.getCommentPageUrl(itemId);
  }
  
  private updateNewsData(news: HackerNewsResponse) {
    this.news = news;
    this.newsCount = news.nbHits;
    this.isLoadingNews = false;
  }
}
