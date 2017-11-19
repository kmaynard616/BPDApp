import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LandingmodalPage } from '../landingmodal/landingmodal';
import { GenchatPage } from '../genchat/genchat';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import 'rxjs/add/operator/map';
//import * as $ from 'jquery';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage {

  items: object;
  strjson: string = '';

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
  isenabled1: boolean = false;
  isenabled2: boolean = false;
  isenabled3: boolean = false;
  isenabled4: boolean = false;
  isenabled5: boolean = false;
  isenabled6: boolean = false;
  isenabled7: boolean = false;
  isenabled8: boolean = false;
  isenabled9: boolean = false;
  isenabled10: boolean = false;
  isenabled11: boolean = false;
  isenabled12: boolean = false;
  isenabled13: boolean = false;
  isenabled14: boolean = false;
  isenabled15: boolean = false;
  isbuttonenabled: boolean = true;

  firstName: string = '';       // first name of the user
  lastName: string = '';        // last name of the user
  lastAccess: string = '';
  grpCt: number = 0;  // Counter for current selected groups
  grp1: string = '';  // Variable for the initial groups name
  grp2: string = '';  // Variable for the second groups name
  grp1num: string = '';
  grp2num: string = '';

  userId: string = '';

  constructor(public modalCtrl: ModalController, public navCtrl: NavController,
              public navParams: NavParams, public platform: Platform,
              private remoteService : RemoteServiceProvider) {
    // Set the platform
    this.platform = platform;

    this.userId = '6';

    this.getUserInfo(this.userId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter LandingPage');

    if (this.grpCt == 1)
    {
      // Set the toggle
      this.setjquerytogglevalue(this.grp1);

      this.isbuttonenabled = false;
    }
    else if (this.grpCt == 2)
    {
      // Set the toggle
      this.setjquerytogglevalue(this.grp1);
      this.setjquerytogglevalue(this.grp2);

      console.log(this.grp1);
      console.log(this.grp2);

      this.disabletoggles();

      this.isbuttonenabled = false;
    }
    else
    {
      console.log('In the else');
    }
  }

  loadScreen() {
    // We need to go down one of three paths
    // 1. The user has never been in the app before
    // 2. The user is returning with 24 hours
    // 3. The user is returning after 24 hours
    var now = new Date();
    now.setDate(now.getDate() - 1);
    var lastEntry;

    if (this.lastAccess == '')
    {
      lastEntry = '';
    }
    else
    {
      lastEntry = new Date(this.lastAccess);
    }

    //var lastEntry = '';
    //var lastEntry = new Date('2017-11-06T12:30:00');
    //var lastEntry = new Date('2017-11-05T12:30:00');

    //lastEntry = new Date('2017-11-05T12:30:00');

    if (lastEntry == '')
    {
        // This is scenario #1
        // Do nothing, we need to show the subscriptions
        this.grpCt = 0;
        this.grp1 = '';
        this.grp2 = '';
    }
    else if (lastEntry >= now)
    {
        // This is scenario #2
        this.gotochat()

    }
    else if (lastEntry < now)
    {
        // This is scenario #3
        this.presentModal();
    }
  }

  getUserInfo(userId: string){
        this.remoteService.getUserInfo(userId).subscribe((data) => {
            // Log the data
            console.log(data);

            if ((<any>data).length != 0)
            {
              // Deserialize the JSON
              this.items = data.json();
              this.strjson = (<any>data)._body;
              //var items = data.json();
              // Store the data into the variables

              this.firstName = (<any>this.items).firstName;
              this.lastName = (<any>this.items).lastName;

              this.lastAccess = (<any>this.items).lastAccess;

              // Check to see how many groups the user is subscribed to
              if ((<any>this.items).subscriptionLocation.length == 1)
              {
                // The user is only subscribed to one group
                // Store the name of the first group
                this.grp1 = (<any>this.items).subscriptionLocation[0];

                // Set the counter
                this.grpCt = 1;
              }
              else if ((<any>this.items).subscriptionLocation.length == 2)
              {
                // The user is subscribed to two groups
                // Store the name of those groups
                this.grp1 = (<any>this.items).subscriptionLocation[0];
                this.grp2 = (<any>this.items).subscriptionLocation[1];

                // Set the counter
                this.grpCt = 2;
              }
            }

            this.loadScreen();
        });
    }

  updateUserInfo() {
    if (this.grp1 != '')
    {
      this.grp1num = this.getgrpnum(this.grp1);
    }

    if (this.grp2 != '')
    {
      this.grp2num = this.getgrpnum(this.grp2);
    }

    // 1. Record the timestamp and grop selections
    this.remoteService.updateUserSubscriptions(this.userId, this.grp1num, this.grp2num).subscribe((data) => {
      console.log(data);

      // Make sure it was successful
      if ((<any>data).status == '200')
      {
        // 2. Set the chat as the root so that we navigate there and
        // do not see the back arrow
        this.gotochat();
      }
    });
  }

  // The user has opted to use the previosly selected chat groups
  // and would like to navigate to the chat.

  gotochat() {
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
    //let modal = this.modalCtrl.create(LandingmodalPage, {strjson: this.strjson});
    //modal.present();
    let modal = this.modalCtrl.create(LandingmodalPage, {"strjson": this.strjson});
    modal.present(modal);
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

        this.disabletoggles();
      }
    }
    else
    {
      // We need to see if this is item 1 or item 2
      // If this is item 1, then we will need to shift item 2 to item 1.
      if (this.grp1.toLowerCase().replace(' district','') == item)
      {
        // Store item 2 into item 1, blank item 2, and decrement the count
        this.grp1 = this.grp2.toLowerCase().replace(' district','');
        this.grp2 = ''
        this.grpCt -= 1;
      }
      else if (this.grp2.toLowerCase().replace(' district','') == item)
      {
        // Blank out the item and subtract the count by 1
        this.grp2 = '';
        this.grpCt -= 1;
      }

      this.enabletoggles();

      // Check to see if there are any groups selected
      if (this.grpCt == 0)
      {
          // There aren't any groups, disable the buttons
          this.isbuttonenabled = true;
      }
    }
  }

  disabletoggles() {
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

  enabletoggles() {
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
  }

  gettogglevalue(objName) {
    if (objName.toLowerCase() == 'central')
    {
      this.toggle = this.toggle1;
    }
    else if (objName.toLowerCase() == 'northern') {
      this.toggle = this.toggle2;
    }
    else if (objName.toLowerCase() == 'eastern') {
      this.toggle = this.toggle3;
    }
    else if (objName.toLowerCase() == 'southern') {
      this.toggle = this.toggle4;
    }
    else if (objName.toLowerCase() == 'western') {
      this.toggle = this.toggle5;
    }
    else if (objName.toLowerCase() == 'northeastern') {
      this.toggle = this.toggle6;
    }
    else if (objName.toLowerCase() == 'southeastern') {
      this.toggle = this.toggle7;
    }
    else if (objName.toLowerCase() == 'northwestern') {
      this.toggle = this.toggle8;
    }
    else if (objName.toLowerCase() == 'southwestern') {
      this.toggle = this.toggle9;
    }
    else if (objName.toLowerCase() == 'ci') {
      this.toggle = this.toggle10;
    }
    else if (objName.toLowerCase() == 'sis') {
      this.toggle = this.toggle11;
    }
    else if (objName.toLowerCase() == 'watf') {
      this.toggle = this.toggle12;
    }
    else if (objName.toLowerCase() == 'oi') {
      this.toggle = this.toggle13;
    }
    else if (objName.toLowerCase() == 'so') {
      this.toggle = this.toggle14;
    }
    else if (objName.toLowerCase() == 'wc') {
      this.toggle = this.toggle15;
    }
  }

  setjquerytogglevalue(objName) {
    if (objName.toLowerCase() == 'central district')
    {
      this.toggle1 = true;
    }
    else if (objName.toLowerCase() == 'northern district') {
      this.toggle2 = true;
    }
    else if (objName.toLowerCase() == 'eastern district') {
      this.toggle3 = true;
    }
    else if (objName.toLowerCase() == 'southern district') {
      this.toggle4 = true;
    }
    else if (objName.toLowerCase() == 'western district') {
      this.toggle5 = true;
    }
    else if (objName.toLowerCase() == 'northeastern district') {
      this.toggle6 = true;
    }
    else if (objName.toLowerCase() == 'southeastern district') {
      this.toggle7 = true;
    }
    else if (objName.toLowerCase() == 'northwestern district') {
      this.toggle8 = true;
    }
    else if (objName.toLowerCase() == 'southwestern district') {
      this.toggle9 = true;
    }
    else if (objName.toLowerCase() == 'ci') {
      this.toggle10 = true;
    }
    else if (objName.toLowerCase() == 'sis') {
      this.toggle11 = true;
    }
    else if (objName.toLowerCase() == 'watf') {
      this.toggle12 = true;
    }
    else if (objName.toLowerCase() == 'oi') {
      this.toggle13 = true;
    }
    else if (objName.toLowerCase() == 'so') {
      this.toggle14 = true;
    }
    else if (objName.toLowerCase() == 'wc') {
      this.toggle15 = true;
    }
  }

  getgrpnum(objName)
  {
    var retVal = '';

    if ((objName.toLowerCase() == 'central district') || (objName.toLowerCase() == 'central'))
    {
      retVal = '1';
    }
    else if ((objName.toLowerCase() == 'northern district') || (objName.toLowerCase() == 'northern')) {
      retVal = '5';
    }
    else if ((objName.toLowerCase() == 'eastern district') || (objName.toLowerCase() == 'eastern')) {
      retVal = '3';
    }
    else if ((objName.toLowerCase() == 'southern district') || (objName.toLowerCase() == 'southern')) {
      retVal = '9';
    }
    else if ((objName.toLowerCase() == 'western district') || (objName.toLowerCase() == 'western')) {
      retVal = '7';
    }
    else if ((objName.toLowerCase() == 'northeastern district') || (objName.toLowerCase() == 'northeastern')) {
      retVal = '4';
    }
    else if ((objName.toLowerCase() == 'southeastern district') || (objName.toLowerCase() == 'southeastern')) {
      retVal = '2';
    }
    else if ((objName.toLowerCase() == 'northwestern district') || (objName.toLowerCase() == 'northwestern')) {
      retVal = '6';
    }
    else if ((objName.toLowerCase() == 'southwestern district') || (objName.toLowerCase() == 'southwestern')) {
      retVal = '8';
    }
    else if ((objName.toLowerCase() == 'ci') || (objName.toLowerCase() == 'ci')) {
      retVal = '10';
    }
    else if ((objName.toLowerCase() == 'sis') || (objName.toLowerCase() == 'sis')) {
      retVal = '11';
    }
    else if ((objName.toLowerCase() == 'watf') || (objName.toLowerCase() == 'watf')) {
      retVal = '12';
    }
    else if ((objName.toLowerCase() == 'oi') || (objName.toLowerCase() == 'oi')) {
      retVal = '13';
    }
    else if ((objName.toLowerCase() == 'so') || (objName.toLowerCase() == 'so')) {
      retVal = '14';
    }
    else if ((objName.toLowerCase() == 'wc') || (objName.toLowerCase() == 'wc')) {
      retVal = '15';
    }

    return retVal;
  }
}
