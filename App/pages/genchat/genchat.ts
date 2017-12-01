import { Injectable } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, ViewController, MenuController, ModalController, Content } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import 'rxjs/add/operator/map';
import { ModalPage } from '../modal/modal';
import { CreatemsgPage } from '../createmsg/createmsg';
import * as $ from 'jquery';

@Component({
  selector: 'page-genchat',
  templateUrl: 'genchat.html',
})

@Injectable()
export class GenchatPage {
  @ViewChild(Content) content: Content;
  postList = [];
  items: object;
  strjson: string = '';
  firstName: string = 'Benjamin';
  lastName: string = 'Flores';
  userId: string = '';
  myVar: object;

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

      //***********************************************
      // Set this variable for the refresh rate
      var refreshRate = 300000;

      setInterval(() => this.getMessages(), refreshRate);
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

    modal.onDidDismiss(() => {
        setTimeout(() => this.getMessages(), 3000);
    });

    modal.present();
  }

  getMessages() {
    this.remoteService.getMessages(this.userId).subscribe((data) => {
        // Log the data
        console.log(data);
        var viewData = {
          msgCard : []
        };

        var rowNum = -1;
        var now = new Date();
        //******************************************************
        // Filter the messages
        // Show only the messages within the last nDays
        // Change nDays to change how far back to see messages.
        // Ideally this should be moved to the middle tier with
        // a parameter that is passed to the middle tier.
        //******************************************************
        var nDays = 10;
        now.setDate(now.getDate() - nDays);
        var msgDate;

        var temp = JSON.parse((<any>data)._body);

        for(let obj of temp) {
          msgDate = new Date(obj.dateCreated + ' ' + obj.timeCreated);
          if (msgDate >= now) {
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

            viewData.msgCard[rowNum]['attatchmentId'] = obj.attatchmentId;
          }

          this.postList = viewData.msgCard;
          }
      });

      // Scroll to the bottom
      this.content.scrollToBottom();
  }

  getAttachment(post) {
    if (post.attatchmentId != 0) {
        return 'http://192.168.0.20:8080/webservice/v1/bpd/download/attachemet/' + post.attatchmentId.toString();
    }
    else {
      return '';
    }
  }

  getCreator(post) {
    if (post.createdBy == 1) {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/sheri-sturm.jpg?itok=fUFqAUTU'
    }
    else if (post.createdBy == 2) {
        return 'http://www.trbimg.com/img-574eddd6/turbine/bs-md-ci-crystal-settlement-20160601';
    }
    else if (post.createdBy == 3) {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/Recruitment-james-handley.jpg?itok=fFk1SneZ';
    }
    else if (post.createdBy == 4) {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/Chris-Jones.jpg?itok=4o9j1AA4';
    }
    else if (post.createdBy == 5) {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/7.%20laTonya%20Lewis.jpg?itok=R_DafVvm';
    }
    else if (post.createdBy == 6) {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/Hatchett.jpg?itok=S6-XpaX-';
    }
    else if (post.createdBy == 7) {
        return 'https://maps.baltimorepolice.org/flexviewer/chatpics/Henry.jpg';
    }
    else if (post.createdBy == 8) {
        return 'https://maps.baltimorepolice.org/flexviewer/chatpics/Esteban.jpg';
    }
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

    this.getMessages();
  }
}
