import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import 'rxjs/add/operator/map';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-genchat',
  templateUrl: 'genchat.html',
})

@Injectable()
export class GenchatPage {
  postList = [];

  constructor(public modalCtrl: ModalController, private remoteService : RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    //this.presentModal();

  }

  presentModal() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  // getPosts(){
  //       this.remoteService.getPosts().subscribe((data)=>{
  //           //this.postList = data;
  //           console.log(data);
  //       });
  //   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenchatPage');
    // this.getPosts();

  }

}
