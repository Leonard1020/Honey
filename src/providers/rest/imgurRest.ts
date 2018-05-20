import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ImgurProvider {

  private headers : HttpHeaders;
  //private imgurUrl = 'https://api.imgur.com/3/gallery/';
  private imgurUrl = 'http://localhost:8100/imgur/';

  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Client-ID 226919d0cce54d5");
  }

  getHotPosts(): Observable<string[]> {
    return this.sendRequest("hot");
  }

  getAllPosts(tag: string): Observable<string[]> {
    return Observable.forkJoin(
      this.getSubRedditPosts(tag),
      this.getTaggedPosts(tag)
    ).map(responses => {
      return [].concat(...responses);
    });
  }

  getSubRedditPosts(tag: string): Observable<string[]> {
    return this.sendRequest(`r/${tag}`);
  }

  getTaggedPosts(tag: string): Observable<string[]> {
    return this.sendRequest(`t/${tag}`);
  }

  getPost(id: string): Observable<string[]> {
    return this.sendRequest(`p/${id}`);
  }

  private extractData(res: Response) {
    return res || { };
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
