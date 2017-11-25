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
  items: object;
  strjson: string = '';
  firstName: string = 'Benjamin';
  lastName: string = 'Flores';
  userId: string = '';

  constructor(public modalCtrl: ModalController, private remoteService : RemoteServiceProvider,
    public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
      this.navCtrl = navCtrl;
      this.strjson = this.navParams.get('strjson');
      this.userId = this.navParams.get('userId');
      console.log(this.navParams);
      console.log('userId: ' + this.userId);
      console.log('strjson: ' + this.strjson);

      if (undefined !== this.strjson)
      {
        if (this.strjson.length > 0)
        {
          this.items = JSON.parse(this.strjson);
        }
      }

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
    let modal = this.modalCtrl.create(ModalPage, {"strjson": this.strjson, "userId": this.userId});
    modal.present();
  }

  openchatmsg() {
    let modal = this.modalCtrl.create(CreatemsgPage, {"strjson": this.strjson, "userId": this.userId});
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
