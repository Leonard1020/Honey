import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ImgurProvider {

  private headers : HttpHeaders;
  private imgurUrl = 'https://api.imgur.com/3/gallery/';

  private hotPosts: Observable<string[]>;

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Client-ID 226919d0cce54d5");
  }

  getHotPosts(): Observable<string[]> {
    if (!this.hotPosts)
      this.hotPosts = this.sendRequest("hot");

    return this.hotPosts;
  }

  getSubRedditPosts(tag: string): Observable<string[]> {
    return this.sendRequest(`r/${tag}`);
  }

  getPost(id: string): Observable<string[]> {
    return this.sendRequest(id);
  }

  private extractData(res: Response) {
    let body = res['data'];
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  private sendRequest(path: string) {
    let url = this.imgurUrl + path;

    console.log(`Pulling from ${url}`);

    return this.http.get(url, {headers: this.headers})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
