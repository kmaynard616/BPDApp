import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { GenchatPage } from '../genchat/genchat';
// import * as $ from 'jquery';

@Component({
  selector: 'page-landingmodal',
  templateUrl: 'landingmodal.html',
})
export class LandingmodalPage {
  firstName: string = '';       // first name of the user
  lastName: string = '';        // last name of the user
  group1: string = '';          // first chat group subscription
  group2: string = '';          // second chat group subscription
  strand: string = '';          // variable for "and" if there are two groups
  strgroup: string = '';        // variable for the verbiage of the groups
  strgroupmsg: string = '';     // variable for the second set of text for the groups

  // Constructor for the class, this must have all of the controllers necessary
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public app: App) {
    this.navCtrl = navCtrl;
  }

  // This function will load the verbiage of the card in the modal screen
  loadUserContents() {
    // Get the data back from the web service
    // Set the name
    this.firstName = 'Max';
    this.lastName = 'Martin';

    // Set the groups
    this.group1 = 'Western District';
    this.group2 = 'WATF';

    // Check to see if the user is part of one or two groups
    if (this.group2 != '')
    {
        // Set the verbiage for the card
        this.strand = ' and ';
        this.strgroup = 'groups';
        this.strgroupmsg = 'Would you like to continue with these groups?'
    }
    else
    {
      // Set the verbiage for the card
      this.strgroup = 'group';
      this.strgroupmsg = 'Would you like to continue with this group?'
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

  //   changeColor(){
  //   $('#x').text('white');
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingmodalPage');
    this.loadUserContents();
  }

}
