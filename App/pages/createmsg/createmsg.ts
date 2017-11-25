import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/map';

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

  currentImage = null;
  filePath: string = '';
  imageName:any;
  myEndpoint: string = 'http://192.168.0.20:8080/webservice/v1/bpd/upload';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public platform: Platform,
              private remoteService : RemoteServiceProvider,
              private transfer: FileTransfer,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private camera: Camera) {
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
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
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
     //alert('Error: ' + JSON.stringify(err));
    });
  }

  selectImage() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.NATIVE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     //let base64Image = 'data:image/jpeg;base64,' + imageData;

     //this.currentImage = base64Image;

     this.filePath = imageData;
     //this.presentToast('Path: ' + this.filePath);
     alert(this.filePath);

    }, (err) => {
     // Handle error
     console.log('Image error: ', JSON.stringify(err));
     this.presentToast(JSON.stringify(err));
     //alert('Error: ' + JSON.stringify(err));
    });
  }

  sendChat() {
    // Let the user know what is going on
    let myLoader = this.loadingCtrl.create({
      content: "Uploading Chat..."
    });

    // Show the message
    myLoader.present();

    // Create the object to do the file transfer
    const fileTransfer: FileTransferObject = this.transfer.create();

    // Set the options
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: this.filePath.substr(this.filePath.lastIndexOf('/') + 1),
      mimeType: "multipart/form-data",
      chunkedMode: false
      // headers: {
      //           'Content-Type': 'application/x-www-form-urlencoded'
      //       },
      // chunkedMode: true
    }

    fileTransfer.upload(this.filePath, 'http://192.168.0.20:8080/webservice/v1/bpd/upload', options)
      .then((data) => {
        console.log(data + ' Upload Successful');
        myLoader.dismiss();
      }, (err) => {
        console.log('Error: ' + JSON.stringify(err));
        myLoader.dismiss();
        this.presentToast('Error: ' + JSON.stringify(err));
        alert('Error: ' + JSON.stringify(err));
      });
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

    toast.present();
  }

  // getVideo() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.VIDEO,
  //     saveToPhotoAlbum: true
  //   }
  //
  //   this.camera.getPicture(options).then((imageData) => {
  //    // imageData is either a base64 encoded string or a file URI
  //    // If it's base64:
  //    let base64Image = 'data:image/jpeg;base64,' + imageData;
  //
  //    //this.myImage = base64Image;
  //    this.currentImage = base64Image;
  //    //alert('Image URL: ', base64Image);
  //   }, (err) => {
  //    // Handle error
  //    console.log('Image error: ', err);
  //    //alert('Image error: ', err);
  //   });
  // }

}
