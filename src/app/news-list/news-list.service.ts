import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HackerNewsResponse} from './dto/hacker-news-response';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsListService {
  public defaultPage = 0;
  public defaultPageSize = 20;
  private API_URL = 'http://hn.algolia.com/api';
  private YCOMBINATOR_URL = 'https://news.ycombinator.com';
  
  constructor(private httpClient: HttpClient) { }
  
  getFrontPageNews(page?: number, pageSize?: number): Observable<HackerNewsResponse> {
    const url = this.API_URL + '/v1/search?tags=front_page' + this.setPaginationParams(page, pageSize);
    return this.httpClient.get<HackerNewsResponse>(url);
  }
  
  getNewsBySearch(searchWord: string, page?: number, pageSize?: number): Observable<HackerNewsResponse> {
    const url = this.API_URL + '/v1/search?query=' + searchWord + this.setPaginationParams(page, pageSize);
    return this.httpClient.get<HackerNewsResponse>(url);
  }
  
  setPaginationParams(page: number, pageSize: number) {
    if (!page) {
      page = this.defaultPage;
    }
    if (!pageSize) {
      pageSize = this.defaultPageSize;
    }
    return `&page=${page}&hitsPerPage=${pageSize}`;
  }
  
  getCommentPageUrl(itemId: number) {
    return this.YCOMBINATOR_URL + '/item?id=' + itemId;
  }
  
}
