import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ImgurProvider {

  private headers : HttpHeaders;

  private remoteImgurUrl = 'http://honeycompressor.ddns.net:5055/imgur/';
  private localImgurUrl = 'http://192.168.2.11:5055/imgur/';

  constructor(public http: HttpClient, private network: Network) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.set("Authorization", "Y5nqZMYCkeWwCAXFC8SVAeuvkPfxaC2Z");
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
    let url = this.remoteImgurUrl;

    if (this.network.type == 'wifi')
      url = this.localImgurUrl;

    url += path;

    console.log(`Pulling from ${url}`);

    var headers = this.headers.set("Network", this.network.type || "");

    return this.http.get(url, {headers: headers})
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
