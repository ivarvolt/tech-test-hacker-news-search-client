import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListCardComponent } from './news-list-card.component';
import {NewsListService} from '../news-list.service';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {HackerNewsHit} from '../interfaces/hacker-news-hit';
import {By} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('NewsListCardComponent', () => {
  let component: NewsListCardComponent;
  let fixture: ComponentFixture<NewsListCardComponent>;
  const article = {
    'created_at': '2020-01-30 13:37',
    'title': 'AI lead refrigerators created a first union',
    'url': 'some-test-url',
    'author': 'Cool Beans',
    'points': 200,
    'num_comments': 15,
    'objectID': 123456
  } as HackerNewsHit;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        HttpClientTestingModule
      ],
      declarations: [ NewsListCardComponent ],
      providers: [ NewsListService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not crash without a article', () => {
    expect(component).toBeTruthy();
  });

  it('should contain title anchor, subtitle and comment anchor', () => {
    component.article = article;
    fixture.detectChanges();

    const fixEl = fixture.nativeElement as HTMLElement;
    const titleAnchor = fixture.debugElement.query(By.css('mat-card-title a'));
    const subTitle = fixture.debugElement.query(By.css('mat-card-subtitle p'));
    const subTitleAnchor = fixture.debugElement.query(By.css('mat-card-subtitle a'));

    expect(titleAnchor.nativeElement.textContent.trim()).toEqual('AI lead refrigerators created a first union');
    expect(subTitle.nativeElement.textContent.trim()).toEqual('200 points by Cool Beans 30 Jan 20 01:37 | 15 comments');
    expect(subTitleAnchor.nativeElement.getAttribute('href')).toEqual('https://news.ycombinator.com/item?id=123456');
  });
});
