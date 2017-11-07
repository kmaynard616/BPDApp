import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LandingmodalPage } from '../landingmodal/landingmodal';
import { GenchatPage } from '../genchat/genchat';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  // Value to tell whether or not something was toggled on or off
  toggle: boolean = true;

  // Declare and initialize the values to be
  // bound to the toggles
  toggle1: boolean = false;
  toggle2: boolean = false;
  toggle3: boolean = false;
  toggle4: boolean = false;
  toggle5: boolean = false;
  toggle6: boolean = false;
  toggle7: boolean = false;
  toggle8: boolean = false;
  toggle9: boolean = false;
  toggle10: boolean = false;
  toggle11: boolean = false;
  toggle12: boolean = false;
  toggle13: boolean = false;
  toggle14: boolean = false;
  toggle15: boolean = false;

  // Declare and initialize all of the enabled
  // properties of the toggles
  isenabled1:boolean=false;
  isenabled2:boolean=false;
  isenabled3:boolean=false;
  isenabled4:boolean=false;
  isenabled5:boolean=false;
  isenabled6:boolean=false;
  isenabled7:boolean=false;
  isenabled8:boolean=false;
  isenabled9:boolean=false;
  isenabled10:boolean=false;
  isenabled11:boolean=false;
  isenabled12:boolean=false;
  isenabled13:boolean=false;
  isenabled14:boolean=false;
  isenabled15:boolean=false;
  isbuttonenabled:boolean=true;

  grpCt: number = 0;  // Counter for current selected groups
  grp1: string = '';  // Variable for the initial groups name
  grp2: string = '';  // Variable for the second groups name

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.platform = platform;

    // We need to go down one of three paths
    // 1. The user has never been in the app before
    // 2. The user is returning with 24 hours
    // 3. The user is returning after 24 hours
    var now = new Date();
    now.setDate(now.getDate() - 1);

    //var lastEntry = null;
    //var lastEntry = new Date('2017-10-28T12:30:00');
    var lastEntry = new Date('2017-10-27T12:30:00');

    if (lastEntry == null)
    {
        // This is scenario #1
        // Do nothing, we need to show the subscriptions
    }
    else if (lastEntry >= now)
    {
        // This is scenario #2
        //alert('2');
        this.gotochat()

    }
    else if (lastEntry < now)
    {
        // This is scenario #3
        this.presentModal();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  // The user has opted to use the previosly selected chat groups
  // and would like to navigate to the chat.
  gotochat() {
    // 1. Record the timestamp and grop selections


    // 2. Set the chat as the root so that we navigate there and
    // do not see the back arrow
    this.navCtrl.setRoot(GenchatPage);

  }

  // This function will close the app when the cancel is pressed on the load screen
  cancelbtn() {
    // Please note that this command is not supported in the browser.
    // This command will throw an error. However, when run on the phone
    // this command will close the app. Also, this may change for Sprint 2.
    navigator['app'].exitApp();
  }

  // This function will load the toggled list for user selection.
  presentModal() {
    let modal = this.modalCtrl.create(LandingmodalPage);
    modal.present();
  }

  // This function will keep track of the groups that have been selected
  // and deselected by the user.
  updateItem(item) {
    // Get the value of the toggle that was changed
    this.gettogglevalue(item);

    // Check to see if the option was selected
    if (this.toggle == true)
    {
      // Now see how many groups have already been selected.
      // The users may only selected 2 groups, max, as of right now.
      // If the requirements open up in the future, than this function will
      // need to change, maybe incorporate some looping and some objects
      // that would more easily support this.
      if (this.grpCt == 0)
      {
        // Store the item and increment the count
        this.grp1 = item;
        this.grpCt += 1;
        this.isbuttonenabled = false;
      }
      else
      {
        // Store the item and increment the count
        this.grp2 = item;
        this.grpCt += 1;

        // Make sure that all of the toggles that are not selected are disabled
        this.isenabled1 = !this.toggle1;
        this.isenabled2 = !this.toggle2;
        this.isenabled3 = !this.toggle3;
        this.isenabled4 = !this.toggle4;
        this.isenabled5 = !this.toggle5;
        this.isenabled6 = !this.toggle6;
        this.isenabled7 = !this.toggle7;
        this.isenabled8 = !this.toggle8;
        this.isenabled9 = !this.toggle9;
        this.isenabled10 = !this.toggle10;
        this.isenabled11 = !this.toggle11;
        this.isenabled12 = !this.toggle12;
        this.isenabled13 = !this.toggle13;
        this.isenabled14 = !this.toggle14;
        this.isenabled15 = !this.toggle15;
      }
    }
    else
    {
      // We need to see if this is item 1 or item 2
      // If this is item 1, then we will need to shift item 2 to item 1.
      if (this.grp1 == item)
      {
        // Store item 2 into item 1, blank item 2, and decrement the count
        this.grp1 = this.grp2;
        this.grp2 = ''
        this.grpCt -= 1;
      }
      else if (this.grp2 == item)
      {
        // Blank out the item and subtract the count by 1
        this.grp2 = '';
        this.grpCt -= 1;
      }

      // Enable all of the toggles
      this.isenabled1 = false;
      this.isenabled2 = false;
      this.isenabled3 = false;
      this.isenabled4 = false;
      this.isenabled5 = false;
      this.isenabled6 = false;
      this.isenabled7 = false;
      this.isenabled8 = false;
      this.isenabled9 = false;
      this.isenabled10 = false;
      this.isenabled11 = false;
      this.isenabled12 = false;
      this.isenabled13 = false;
      this.isenabled14 = false;
      this.isenabled15 = false;

      // Check to see if there are any groups selected
      if (this.grpCt == 0)
      {
          // There aren't any groups, disable the buttons
          this.isbuttonenabled = true;
      }
    }
  }

  // This function will get the values of the toggles
  gettogglevalue(objName) {
    if (objName == 'central')
    {
      this.toggle = this.toggle1;
    }
    else if (objName == 'northern') {
      this.toggle = this.toggle2;
    }
    else if (objName == 'eastern') {
      this.toggle = this.toggle3;
    }
    else if (objName == 'southern') {
      this.toggle = this.toggle4;
    }
    else if (objName == 'western') {
      this.toggle = this.toggle5;
    }
    else if (objName == 'northeastern') {
      this.toggle = this.toggle6;
    }
    else if (objName == 'southeastern') {
      this.toggle = this.toggle7;
    }
    else if (objName == 'northwestern') {
      this.toggle = this.toggle8;
    }
    else if (objName == 'southwestern') {
      this.toggle = this.toggle9;
    }
    else if (objName == 'ci') {
      this.toggle = this.toggle10;
    }
    else if (objName == 'sis') {
      this.toggle = this.toggle11;
    }
    else if (objName == 'watf') {
      this.toggle = this.toggle12;
    }
    else if (objName == 'oi') {
      this.toggle = this.toggle13;
    }
    else if (objName == 'so') {
      this.toggle = this.toggle14;
    }
    else if (objName == 'wc') {
      this.toggle = this.toggle15;
    }
  }
}
