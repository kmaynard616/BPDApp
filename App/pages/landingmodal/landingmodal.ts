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
  grp1num: string = '';
  grp2num: string = '';
  userId: string = '';

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
        this.userId= (<any>this.items).userId;

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
    this.updateUserInfo();

    // 2. Navigate to the chat
    //this.viewCtrl.dismiss();
    //this.navCtrl.setRoot(GenchatPage);
    //this.app.getRootNav().push(GenchatPage);
    // this.zone.run(() => {
    //   this.navCtrl.setRoot(GenchatPage);
    // });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingmodalPage');
    this.loadUserContents();
  }

  updateUserInfo() {
    if (this.group1 != '')
    {
      this.grp1num = this.getgrpnum(this.group1);
    }

    if (this.group2 != '')
    {
      this.grp2num = this.getgrpnum(this.group2);
    }

    // 1. Record the timestamp and grop selections
    this.remoteService.updateUserSubscriptions(this.userId, this.grp1num, this.grp2num).subscribe((data) => {
      console.log(data);

      // Make sure it was successful
      if ((<any>data).status == '200')
      {
        // 2. Set the chat as the root so that we navigate there and
        // do not see the back arrow
        //this.gotochat();
        //this.app.getRootNav().push(GenchatPage);
        //this.navCtrl.setRoot(GenchatPage);
        this.app.getRootNav().setRoot(GenchatPage);
        this.viewCtrl.dismiss();
      }
    });
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
