import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { GenchatPage } from '../genchat/genchat';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-landingmodal',
  templateUrl: 'landingmodal.html',
})
export class LandingmodalPage {
  strjson: string = '';
  items: object;
  firstName: string = '';       // first name of the user
  lastName: string = '';        // last name of the user
  group1: string = '';          // first chat group subscription
  group2: string = '';          // second chat group subscription
  strand: string = '';          // variable for "and" if there are two groups
  strgroup: string = '';        // variable for the verbiage of the groups
  strgroupmsg: string = '';     // variable for the second set of text for the groups

  // Constructor for the class, this must have all of the controllers necessary
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public app: App,
              private remoteService : RemoteServiceProvider) {
    this.navCtrl = navCtrl;
    this.strjson = this.navParams.get('strjson');
    console.log(this.strjson);
    // this.items = this.strjson.json();

    if (undefined !== this.strjson)
    {
      if (this.strjson.length > 0)
      {
        this.items = JSON.parse(this.strjson);
      }
    }

  }

  // This function will load the verbiage of the card in the modal screen

  loadUserContents() {
    // Get the data back from the web service
    // Set the name
    if (undefined !== this.items)
    {
      if ((<any>this.items).length != 0)
      {
        this.firstName = (<any>this.items).firstName;
        this.lastName = (<any>this.items).lastName;

        if ((<any>this.items).subscriptionLocation.length == 1)
        {
          this.group1 = (<any>this.items).subscriptionLocation[0];

          // Set the verbiage for the card
          this.strgroup = 'group';
          this.strgroupmsg = 'Would you like to continue with this group?'
        }
        else if ((<any>this.items).subscriptionLocation.length == 2)
        {
          // Set the groups
          this.group1 = (<any>this.items).subscriptionLocation[0];
          this.group2 = (<any>this.items).subscriptionLocation[1];

          // Set the verbiage for the card
          this.strand = ' and ';
          this.strgroup = 'groups';
          this.strgroupmsg = 'Would you like to continue with these groups?'
        }
      }
    }
  }

  // The user would like to choose new chat groups. As this was opened modally
  // over top of the chat group selection, we will go to the chat group selection
  // screen before entering the chat.

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // The user has opted to use the previosly selected chat groups
  // and would like to navigate to the chat.

  gotochat() {
    // 1. Record the timestamp and grop selections


    // 2. Navigate to the chat
    this.viewCtrl.dismiss();
    this.navCtrl.setRoot(GenchatPage);
    this.app.getRootNav().push(GenchatPage);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingmodalPage');
    this.loadUserContents();
  }

}
