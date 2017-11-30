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
    this.userId = this.navParams.get('userId');
    console.log('userId: ' + this.userId);
    console.log('strjson: ' + this.strjson);
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
        // this.userId= (<any>this.items).userId;

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

    console.log('landingmodal : This is the userId ' + this.userId);

    this.app.getRootNav().setRoot(GenchatPage, {"strjson": this.strjson, "userId": this.userId});
    this.viewCtrl.dismiss();
  }

  getCreator() {
    if (this.userId == "1") {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/sheri-sturm.jpg?itok=fUFqAUTU'
    }
    else if (this.userId == "2") {
        return 'http://www.trbimg.com/img-574eddd6/turbine/bs-md-ci-crystal-settlement-20160601';
    }
    else if (this.userId == "3") {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/Recruitment-james-handley.jpg?itok=fFk1SneZ';
    }
    else if (this.userId == "4") {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/Chris-Jones.jpg?itok=4o9j1AA4';
    }
    else if (this.userId == "5") {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/7.%20laTonya%20Lewis.jpg?itok=R_DafVvm';
    }
    else if (this.userId == "6") {
        return 'https://www.baltimorepolice.org/sites/default/files/styles/croped_photo/public/images/Hatchett.jpg?itok=S6-XpaX-';
    }
    else if (this.userId == "7") {
        return 'https://maps.baltimorepolice.org/flexviewer/chatpics/Henry.jpg';
    }
    else if (this.userId == "8") {
        return 'https://maps.baltimorepolice.org/flexviewer/chatpics/Esteban.jpg';
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
    else if ((objName.toLowerCase() == 'citywide investigation') || (objName.toLowerCase() == 'ci')) {
      retVal = '10';
    }
    else if ((objName.toLowerCase() == 'special investigation section') || (objName.toLowerCase() == 'sis')) {
      retVal = '11';
    }
    else if ((objName.toLowerCase() == 'watf') || (objName.toLowerCase() == 'watf')) {
      retVal = '12';
    }
    else if ((objName.toLowerCase() == 'operational investigation') || (objName.toLowerCase() == 'oi')) {
      retVal = '13';
    }
    else if ((objName.toLowerCase() == 'special operations') || (objName.toLowerCase() == 'so')) {
      retVal = '14';
    }
    else if ((objName.toLowerCase() == 'watch center') || (objName.toLowerCase() == 'wc')) {
      retVal = '15';
    }

    return retVal;
  }
}
