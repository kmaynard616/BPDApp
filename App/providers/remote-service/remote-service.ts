import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RemoteServiceProvider {
  getAPIURL: string = 'http://192.168.0.20:8080/webservice/v1/bpd';

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
    let headers = this._getHeaders();

    console.log('UserId: ' + userId);
    console.log('grp1: ' + grp1);
    console.log('grp2: ' + grp2);

    if (grp2 != '')
    {
      return this.http.post(endpoint,
              {'userId':parseInt(userId), 'primaryLocationId':parseInt(grp1),'secondaryLocationId':parseInt(grp2)},
              headers)
  	           .do(function(data) {
                 console.log(data);
               });
    }
    else
    {
      return this.http.post(endpoint,
              {'userId':parseInt(userId), 'primaryLocationId':parseInt(grp1)},
              headers)
  	           .do(function(data) {
                 console.log(data);
               });
    }

  }

  sendChatMessage(typeId: string, message: string, createdBy: string, deviceId: string, subLocId: string, addressId: string) {
    var endpoint = this.getAPIURL + '/submitMessage';
    let headers = this._getHeaders();

    return this.http.post(endpoint,
            {'typeId':typeId, 'message':message, 'createdBy':createdBy, 'deviceId':deviceId, 'subLocId':subLocId, 'addressId':addressId},
            headers)
	           .do(function(data) {
               console.log(data);
             });
  }

  getMessages(userId: string) {
    var endpoint = this.getAPIURL + '/getMessages/' + userId;

    return this.http.get(endpoint)
  	                  .do(function(data) {
                          console.log(data);
                        });
  }

  _getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
