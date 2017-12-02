import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, LoadingController, Loading, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileEntry } from "@ionic-native/file";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Http, Response } from '@angular/http';
import { GenchatPage } from '../genchat/genchat';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

@Component({
  selector: 'page-createmsg',
  templateUrl: 'createmsg.html',
})
export class CreatemsgPage {

  items: object;
  strjson: string = '';

  grpCt: number = 0;  // Counter for current selected groups
  grp1: string = '';  // Variable for the initial groups name
  grp2: string = '';  // Variable for the second groups name
  firstName: string = '';       // first name of the user
  lastName: string = '';        // last name of the user
  grp1num: string = '';
  grp2num: string = '';
  userId: string = '';
  myImage: string = '';

  // Declare and initialize the values to be
  // bound to the toggles
  toggle0: boolean = false;
  toggle1: boolean = false;
  toggle2: boolean = false;

  // Declare and initialize all of the enabled
  // properties of the toggles
  isenabled1: boolean = false;
  isenabled2: boolean = false;

  message: string = '';
  typeId: string = '';
  deviceId: string = '';
  addressId: string = '';

  currentImage = null;
  filePath: string = '';
  imageName:any;
  public error: string;
  private loading: Loading;
  private messageId1: string = '';
  private messageId2: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public platform: Platform,
              private remoteService : RemoteServiceProvider,
              private transfer: FileTransfer,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private camera: Camera,
              public http: Http,
              private readonly file: File) {
                this.platform = platform;
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
        console.log(this.strjson);
        this.items = JSON.parse(this.strjson);
      }

      this.loadUserContents();
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatemsgPage');
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
          this.grp1 = (<any>this.items).subscriptionLocation[0];
          this.grpCt = 1;
        }
        else if ((<any>this.items).subscriptionLocation.length == 2)
        {
          // Set the groups
          this.grp1 = (<any>this.items).subscriptionLocation[0];
          this.grp2 = (<any>this.items).subscriptionLocation[1];
          this.grpCt = 2;
        }

        if (this.grp1 != '')
        {
          this.grp1num = this.getgrpnum(this.grp1);
        }

        if (this.grp2 != '')
        {
          this.grp2num = this.getgrpnum(this.grp2);
        }
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.currentImage = base64Image;
    }, (err) => {
     // Handle error
     console.log('Image error: ', JSON.stringify(err));
     this.presentToast(JSON.stringify(err));
    });
  }

  selectImage() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.currentImage = base64Image;
    }, (err) => {
     // Handle error
     console.log('Image error: ', JSON.stringify(err));
     this.presentToast(JSON.stringify(err));
    });
  }

  sendChat() {
    var msgId = -1;

    if ((this.toggle1 == true) || (this.toggle2 == true))
    {
      // Let the user know what is going on
      let myLoader = this.loadingCtrl.create({
        content: "Uploading Chat..."
      });

      // Show the message
      myLoader.present();

      // Send the message
      this.sendMsg(myLoader);

      this.presentToast('Message sent');
      myLoader.dismiss();

      this.viewCtrl.dismiss();
    }
    else
    {
      this.presentToast('Choose a Subscription');
    }

  }

  sendMsg(myLoader) {
    // Check for the first subscription
    if (this.toggle1 == true)
    {
      // Check if this is a FI message
      if (this.toggle0 == false)
      {
        // general interactive
        this.typeId = '1';
      }
      else
      {
        // field intelligence
        this.typeId = '2';
      }

      this.deviceId = '1';
      this.addressId = '1';

      // 1. Record the timestamp and grop selections
      this.remoteService.sendChatMessage(this.typeId, this.message, this.userId, this.deviceId, this.grp1num, this.addressId).subscribe((data) => {
        console.log(data);

        // Make sure it was successful
        if ((<any>data).status == '200')
        {
          // Store the id for the first message
          this.messageId1 = (<any>data)._body;

          console.log('messageId1 : ' + this.messageId1);

          if (this.currentImage != null)
          {
            // Send the image
            this.sendPicture(myLoader, this.messageId1);
          }

          // Check for the second subscription
          if (this.toggle2 == true)
          {
            // Check if this is a FI message
            if (this.toggle0 == false)
            {
              // general interactive
              this.typeId = '1';
            }
            else
            {
              // field intelligence
              this.typeId = '2';
            }

            this.deviceId = '1';
            this.addressId = '1';

            // 1. Record the timestamp and grop selections
            this.remoteService.sendChatMessage(this.typeId, this.message, this.userId, this.deviceId, this.grp2num, this.addressId).subscribe((data) => {
              console.log(data);

              // Make sure it was successful
              if ((<any>data).status == '200')
              {
                // Store the message id for the second message
                this.messageId2 = (<any>data)._body;

                console.log('messageId2 : ' + this.messageId2);

                if (this.currentImage != null)
                {
                  // Send the image
                  this.sendPicture(myLoader, this.messageId2);
                }
              }
              else {

              }
            });
          }
          else {

          }
        }
      });
    }
  }

  sendPicture(myLoader, myId) {
    // Split the base64 string in data and contentType
    var block = this.currentImage.split(";");

    // Get the content type of the image
    var contentType = block[0].split(":")[1];

    // get the real base64 content of the file
    var realData = block[1].split(",")[1];

    // Convert it to a blob to upload
    var blob = this.b64toBlob(realData, contentType, 512);

    var fd = new FormData();
    fd.append('messageId', myId.toString());
    fd.append('filename', 'test_file.jpeg');
    fd.append('file', blob);

    $.ajax({
        type: 'POST',
        url: 'http://192.168.0.20:8080/webservice/v1/bpd/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (data) {
                 console.log(data);
                 this.presentToast('File Uploaded');
          },
        error: function (jqXHR, exception) {
          console.log('Status: ' + jqXHR.status + ', Response: ' + jqXHR.responseText);
          //alert('Status: ' + jqXHR.status + ', Response: ' + jqXHR.responseText);
        }
    });
  }

  b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    // Show the toast
    toast.present();
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
    else
    {
      retVal = '-1';
    }

    return retVal;
  }
}
