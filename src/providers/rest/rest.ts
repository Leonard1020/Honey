import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  //private apiUrl = 'https://restcountries.eu/rest/v2/all';
  private imgurUrl = 'https://api.imgur.com/3/gallery/top';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  getCountries(): Observable<string[]> {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Client-ID 226919d0cce54d5");

    return this.http.get(this.imgurUrl, {headers: headers})
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res;
    return body.data || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(error)
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
