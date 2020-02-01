import {getTestBed, TestBed} from '@angular/core/testing';

import { NewsListService } from './news-list.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('NewsListService', () => {
  let injector: TestBed;
  let service: NewsListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ]
    });
    injector = getTestBed();
    service = injector.get(NewsListService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should have default values set', () => {
    expect(service.defaultPage).toEqual(0);
    expect(service.defaultPageSize).toEqual(20);
  });

  it('should get front page news default pagination', () => {
    service.getFrontPageNews().subscribe();

    const req = httpMock.expectOne('http://hn.algolia.com/api/v1/search?tags=front_page&page=0&hitsPerPage=20');
    expect(req.request.method).toBe('GET');
  });

  it('should get front page news custom pagination', () => {
    const pageNumber = 1;
    const pageSize = 50;
    service.getFrontPageNews(pageNumber, pageSize).subscribe();

    const req = httpMock.expectOne(`http://hn.algolia.com/api/v1/search?tags=front_page&page=${pageNumber}&hitsPerPage=${pageSize}`);
    expect(req.request.method).toBe('GET');
  });

  it('should getNewsBySearch default pagination', () => {
    const searchWord = 'test-search-word';
    service.getNewsBySearch(searchWord).subscribe();

    const req = httpMock.expectOne(`http://hn.algolia.com/api/v1/search?query=${searchWord}&page=0&hitsPerPage=20`);
    expect(req.request.method).toBe('GET');
  });

  it('should getNewsBySearch with custom pagination', () => {
    const searchWord = 'test-search-word';
    const pageNumber = 2;
    const pageSize = 30;
    service.getNewsBySearch(searchWord, pageNumber, pageSize).subscribe();

    const req = httpMock.expectOne(`http://hn.algolia.com/api/v1/search?query=${searchWord}&page=${pageNumber}&hitsPerPage=${pageSize}`);
    expect(req.request.method).toBe('GET');
  });

  it('should return comment section url', () => {
    const itemId = 1000;
    const commentSectionUrl = service.getCommentPageUrl(itemId);
    expect(commentSectionUrl).toEqual(`https://news.ycombinator.com/item?id=${itemId}`);
  });
});
