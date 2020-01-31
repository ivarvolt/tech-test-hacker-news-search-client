import {HackerNewsHit} from './hacker-news-hit';

export interface HackerNewsResponse {
  hits: HackerNewsHit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
}
