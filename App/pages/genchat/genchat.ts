import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-genchat',
  templateUrl: 'genchat.html',
})

@Injectable()
export class GenchatPage {
  postList = [];

  constructor(private remoteService : RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.getPosts();
  }

  getPosts(){
        this.remoteService.getPosts().subscribe((data)=>{
            this.postList = data;
            console.log(data);
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenchatPage');
  }

}
