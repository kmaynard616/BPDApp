import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RemoteServiceProvider {
  getAPIURL: string = 'http://localhost:5000/v1';

  constructor(public http: Http) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  getPosts() {
    // return  this.http.get(this.getAPIURL + '/test')
    //         .do((res : Response ) => console.log(res.json())
    //         .map((res : Response ) => res.json())
    //         .catch(error => console.log(error));
    return this.http.get(this.getAPIURL + '/test').do(function(data) { console.log('data ', data) });
  }
}
