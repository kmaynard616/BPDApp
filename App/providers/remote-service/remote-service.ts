import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RemoteServiceProvider {
  //getAPIURL: string = 'http://localhost:5000/v1';
  //getAPIURL: string = 'http://localhost:8080/webservice/v1/bpd';
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
    //int opt1 = 0;

    console.log('UserId: ' + userId);
    console.log('grp1: ' + grp1);
    console.log('grp2: ' + grp2);

    return this.http.post(endpoint,
            {'userId':parseInt(userId), 'primaryLocationId':parseInt(grp1),'secondaryLocationId':parseInt(grp2)},
            headers)
	           .do(function(data) {
               console.log(data);
             });
  }

  sendChatMessage(typeId: string, message: string, createdBy: string, deviceId: string, subLocId: string, addressId: string) {
    var endpoint = this.getAPIURL + '/submitMessage';
    let headers = this._getHeaders();

    // console.log(jsonMsg);

    return this.http.post(endpoint,
            {'typeId':typeId, 'message':message, 'createdBy':createdBy, 'deviceId':deviceId, 'subLocId':subLocId, 'addressId':addressId},
            headers)
	           .do(function(data) {
               console.log(data);
             });
  }

  sendImage(filePath: string) {
    var endpoint = this.getAPIURL + '/upload';
    let headers = this._getHeaders2();

    // console.log(jsonMsg);

    return this.http.post(endpoint,
                          {'filename':filePath},
                          headers)
	                  .do(function(data) {
                        console.log(data);
                      });
  }

  _getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  _getHeaders2() {
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    return headers;
  }
}
