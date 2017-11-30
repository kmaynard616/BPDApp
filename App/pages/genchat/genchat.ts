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

  getMessages() {
    this.remoteService.getMessages(this.userId).subscribe((data) => {
        // Log the data
        console.log(data);
        var viewData = {
          msgCard : []
        };

        var rowNum = -1;

        var temp = JSON.parse(<any>data._body);

        for(let obj of temp) {
          rowNum = rowNum + 1;
          viewData.msgCard.push({});
          viewData.msgCard[rowNum]['dateCreated'] = obj.dateCreated;
          viewData.msgCard[rowNum]['createdBy'] = obj.createdBy;
          viewData.msgCard[rowNum]['message'] = obj.message;
          viewData.msgCard[rowNum]['lastName'] = obj.lastName;
          viewData.msgCard[rowNum]['firstName'] = obj.firstName;
          viewData.msgCard[rowNum]['timeCreated'] = obj.timeCreated;

          if (obj.messageType == '1') {
            viewData.msgCard[rowNum]['messageType'] = 'general';
          }
          else {
            viewData.msgCard[rowNum]['messageType'] = 'fi';
          }

          if (this.userId == obj.createdBy.toString()) {
            viewData.msgCard[rowNum]['messagePosition'] = 'messageRight';
          }
          else {
            viewData.msgCard[rowNum]['messagePosition'] = 'messageLeft';
          }
        }

        console.log(viewData);

        // this.postList = JSON.parse(data._body);
        this.postList = viewData.msgCard;
        // for(let obj of <any>data._body) {
        //
        // }
      });
  }

  applyClass(post) {
    return post.messageType + ' ' + post.messagePosition + ' card card-md';
  }

  applyHeaderclass(post) {
    if (post.messageType == 'fi') {
      return 'fiheader item item-block item-md';
    }
    else {
      return 'item item-block item-md';
    }
  }

  applyH2class(post) {
    if (post.messageType == 'fi') {
      return 'h2fi';
    }
    else {
      return 'h2gen';
    }
  }

  applyPclass(post) {
    if (post.messageType == 'fi') {
      return 'pfi';
    }
    else {
      return 'pgen';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenchatPage');
    // this.getPosts();
    this.getMessages();

  }

}
