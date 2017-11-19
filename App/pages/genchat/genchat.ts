import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
// import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NavController, NavParams, ViewController, MenuController, ModalController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import 'rxjs/add/operator/map';
import { ModalPage } from '../modal/modal';
import { CreatemsgPage } from '../createmsg/createmsg';

@Component({
  selector: 'page-genchat',
  templateUrl: 'genchat.html',
})

@Injectable()
export class GenchatPage {
  postList = [];
  firstName: string = 'Benjamin';
  lastName: string = 'Flores';

  // constructor(public modalCtrl: ModalController, private remoteService : RemoteServiceProvider,
  //   public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  //   //this.presentModal();
  //
  // }
  constructor(public modalCtrl: ModalController, private remoteService : RemoteServiceProvider,
    public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    //this.presentModal();

  }

  openMenu() {
   this.menuCtrl.open();
  }

  closeMenu() {
   this.menuCtrl.close();
  }

  toggleMenu() {
   this.menuCtrl.toggle('left');
  }

  opensubs() {
    let modal = this.modalCtrl.create(ModalPage);
    modal.present();
  }

  openchatmsg() {
    let modal = this.modalCtrl.create(CreatemsgPage);
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
