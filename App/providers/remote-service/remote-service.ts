import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RemoteServiceProvider {
  // getAPIURL: string = 'http://localhost:5000/v1';
  // getAPIURL: string = 'http://localhost:8080/webservice/v1/bpd';
  getAPIURL: string = 'http://192.168.0.19:8080/webservice/v1/bpd';

  constructor(public http: Http) {
    console.log('Hello RemoteServiceProvider Provider');
  }

  // This function will get the user subscription information
  getUserInfo(userId: string) {
    var endpoint = this.getAPIURL + '/getUserInfo/' + userId;

    return this.http.get(endpoint)
                .do(function(data) {
                    console.log('data ', data)
                  });
  }

  // This function will store the subscription selections
  updateUserSubscriptions(userId: string, grp1: string, grp2: string) {
    var body = {userId: userId};
    var endpoint = this.getAPIURL + '/updateUserSettings';

    return this.http.post(endpoint, body)
            .then(
              function (res) {
                console.log(res);
              });
  }
}
