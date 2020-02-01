import {Component, Input, OnInit} from '@angular/core';
import {HackerNewsHit} from '../interfaces/hacker-news-hit';
import {NewsListService} from '../news-list.service';

@Component({
  selector: 'news-list-card',
  templateUrl: './news-list-card.component.html',
  styleUrls: ['./news-list-card.component.scss']
})
export class NewsListCardComponent implements OnInit {
  @Input() article: HackerNewsHit;

  constructor(private newsListService: NewsListService) { }

  ngOnInit() {
  }

  getCommentPageUrl(itemId: number): string {
    return this.newsListService.getCommentPageUrl(itemId);
  }
}
