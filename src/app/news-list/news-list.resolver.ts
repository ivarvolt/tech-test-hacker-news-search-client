import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {NewsListService} from './news-list.service';
import {Observable} from 'rxjs';
import {HackerNewsResponse} from './dto/hacker-news-response';


@Injectable()
export class NewsListResolver implements Resolve<HackerNewsResponse> {
  
  constructor(private newsListService: NewsListService) {
  }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<HackerNewsResponse> | Promise<HackerNewsResponse> | HackerNewsResponse {
    return this.newsListService.getFrontPageNews();
  }
}
