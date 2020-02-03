import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NewsListService} from './news-list.service';
import {NewsListCardComponent} from './card/news-list-card.component';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By, HAMMER_LOADER} from '@angular/platform-browser';
import {HackerNewsResponse} from './interfaces/hacker-news-response';
import {DebugElement} from '@angular/core';

describe('NewsListComponent interaction', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  const testResponse = {
    hits: [{
      'created_at': '2020-01-31 13:37',
      'title': 'New Beauty standard for AI',
      'url': 'some-test-url',
      'author': 'Cool Beans',
      'points': 400,
      'num_comments': 100,
      'objectID': 123456
    }],
    nbHits: 1,
    page: 0,
    nbPages: 0,
    hitsPerPage: 10,
  } as HackerNewsResponse;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatProgressSpinnerModule,
      ],
      declarations: [ NewsListComponent, NewsListCardComponent ],
      providers: [
        NewsListService,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => {})
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not error without initialization data', () => {
    expect(component).toBeTruthy();
  });

  it('should do automatic search after 6 characters been inserted to input', () => {
    const {spyKeyUpFunction, spyGetNews} = setupCodeForSpying();
    insertIntoInput('123456');

    expect(spyKeyUpFunction).toHaveBeenCalledTimes(1);
    expect(spyGetNews).toHaveBeenCalledTimes(1);
  });

  it('should not do search when less than 6 characters been inserted to input', () => {
    const {spyKeyUpFunction, spyGetNews} = setupCodeForSpying();
    insertIntoInput('123');

    expect(spyKeyUpFunction).toHaveBeenCalledTimes(1);
    expect(spyGetNews).not.toHaveBeenCalled();
  });

  it('should do search on enter press', () => {
    const {spyGetNews} = setupCodeForSpying();
    const searchInput = insertIntoInput('12');
    searchInput.triggerEventHandler('keyup.enter', {});

    expect(spyGetNews).toHaveBeenCalledTimes(1);
  });

  it('should do search on search button press', () => {
    const {spyGetNews} = setupCodeForSpying();
    const searchButton = fixture.debugElement.query(By.css('#searchButton'));
    searchButton.triggerEventHandler('click', {});

    expect(spyGetNews).toHaveBeenCalledTimes(1);
  });

  it('should have paginator', () => {
    const searchInput = fixture.debugElement.query(By.css('mat-paginator'));
    expect(searchInput).toBeTruthy();
  });

  it('should call getNewsBySearch service on function call', () => {
    const newsListService = fixture.debugElement.injector.get(NewsListService);
    const spyKeyUpFunction = jest.spyOn(newsListService, 'getNewsBySearch');
    component.getNewsBySearch('123');

    expect(spyKeyUpFunction).toHaveBeenCalledTimes(1);
  });


  function setupCodeForSpying() {
    component.news = testResponse;
    component.ngOnInit();
    fixture.detectChanges();

    const spyKeyUpFunction = jest.spyOn(component, 'doAutomaticSearch');
    const spyGetNews = jest.spyOn(component, 'getNewsBySearch');
    return {spyKeyUpFunction, spyGetNews};
  }

  function insertIntoInput(insertInputValue: string): DebugElement {
    const searchInput = fixture.debugElement.query(By.css('input'));
    searchInput.nativeElement.value = insertInputValue;
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    searchInput.triggerEventHandler('keyup', {});
    return searchInput;
  }
});


