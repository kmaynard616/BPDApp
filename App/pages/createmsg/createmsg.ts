import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, LoadingController, Loading, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileEntry } from "@ionic-native/file";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catchError';
//import 'rxjs/add/operator/finalize';
//import { catchError, finalize } from 'rxjs/operators';
//import { finalize } from 'rxjs/operators';
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

    // ***************************************************
    //                    New Code
    // ***************************************************
    // this.camera.getPicture({
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   sourceType: this.camera.PictureSourceType.CAMERA,
    //   encodingType: this.camera.EncodingType.PNG,
    //   saveToPhotoAlbum: true
    // }).then(imageData => {
    //   this.currentImage = imageData;
    //   this.uploadPhoto(imageData);
    // }, error => {
    //   this.error = JSON.stringify(error);
    // });

    // ***************************************************
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

      // var sendImage = new Image();
      // sendImage.src = this.currentImage;
      //
      // // Can't send a BLOB, it wants an image
      // var fd = new FormData();
      // fd.append('filename', 'test_file.jpeg');
      // // fd.append('data', base64Image);
      // fd.append('file', sendImage);
      // $.ajax({
      //     type: 'POST',
      //     url: 'http://192.168.0.20:8080/webservice/v1/bpd/upload',
      //     data: fd,
      //     processData: false,
      //     contentType: false,
      //     success: function (data) {
      //              // console.log(data);
      //              this.presentToast('File Uploaded');
      //       },
      //     error: function (jqXHR, exception) {
      //       alert('Status: ' + jqXHR.status + ', Response: ' + jqXHR.responseText);
      //     }
      // });

     //this.filePath = imageData;
     //this.presentToast('Path: ' + this.filePath);
     //alert(this.filePath);

    }, (err) => {
     // Handle error
     console.log('Image error: ', JSON.stringify(err));
     this.presentToast(JSON.stringify(err));
     //alert('Error: ' + JSON.stringify(err));
    });

    // ***************************************************
    //                    New Code
    // ***************************************************
    // this.camera.getPicture({
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //   destinationType: this.camera.DestinationType.FILE_URI,
    //   quality: 100,
    //   encodingType: this.camera.EncodingType.PNG,
    // }).then(imageData => {
    //   this.currentImage = imageData;
    //   this.uploadPhoto(imageData);
    // }, error => {
    //   this.error = JSON.stringify(error);
    // });
    // ***************************************************
  }

  // private uploadPhoto(imageFileUri: any): void {
  //   this.error = null;
  //   // this.loading = this.loadingCtrl.create({
  //   //   content: 'Uploading...'
  //   // });
  //   //
  //   // this.loading.present();
  //
  //   // this.platform.ready().then(() => this.file.resolveLocalFilesystemUrl(imageFileUri)
  //   //   .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
  //   //   .catch((err) => this.presentToast(JSON.stringify(err))));
  //   // this.file.resolveLocalFilesystemUrl(imageFileUri).then((fileEntry) => {
  //   //                                       imageFileUri = fileEntry;
  //   //                                     });
  //   window.resolveLocalFileSystemURL(imageFileUri,
  //   function(entry) {
  //     this.readFile(entry.file);
  //     // entry.file(file => this.readFile(file));
  //   },
  //   function(err) {
  //     alert(JSON.stringify(err));
  //   });
  //     // .success(entry => {
  //     //                 entry.file(file => this.readFile(file))
  //     //                 })
  //     // .catch(err => this.presentToast(JSON.stringify(err)));
  //
  // }

  // private readFile(file: any) {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     const formData = new FormData();
  //     const imgBlob = new Blob([reader.result], {type: file.type});
  //     formData.append('file', imgBlob, file.name);
  //     this.postData(formData);
  //   };
  //   reader.readAsArrayBuffer(file);
  // }

  // private postData(formData: FormData) {
  //   this.http.post('http://192.168.0.20:8080/webservice/v1/bpd/upload', formData)
  //     .map(res => res.json())
  //     .subscribe(
  //       data => this.presentToast(data),
  //       err => this.handleError(err),
  //       () => this.presentToast('yay'));
  // }

  sendChat() {
    // Let the user know what is going on
    let myLoader = this.loadingCtrl.create({
      content: "Uploading Chat..."
    });

    // Show the message
    myLoader.present();

    // Send the message
    this.sendMsg();

    if (this.currentImage != null)
    {
      // Send the image
      this.sendPicture(myLoader);
    }

    this.presentToast('Message sent');
    myLoader.dismiss();

  }

  sendMsg() {
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

                this.viewCtrl.dismiss();
              }
              else
              {
                this.viewCtrl.dismiss();
              }
            });
          }
          else
          {
            this.viewCtrl.dismiss();
          }
        }
      });
    }
  }

  sendPicture(myLoader) {
    var sendImage = new Image();
    sendImage.src = this.currentImage;

    var fd = new FormData();
    fd.append('filename', 'test_file.jpeg');
    fd.append('file', sendImage);
    $.ajax({
        type: 'POST',
        url: 'http://192.168.0.20:8080/webservice/v1/bpd/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (data) {
                 // console.log(data);
                 this.presentToast('File Uploaded');
          },
        error: function (jqXHR, exception) {
          console.log('Status: ' + jqXHR.status + ', Response: ' + jqXHR.responseText);
        }
    });
    // // Create the object to do the file transfer
    //const fileTransfer: FileTransferObject = this.transfer.create();

    // this.remoteService.sendImage(this.filePath).subscribe((data) => {
    //   console.log(data);
    //
    //   // Make sure it was successful
    //   if ((<any>data).status == '200')
    //   {
    //     this.viewCtrl.dismiss();
    //   }
    //   else
    //   {
    //     this.viewCtrl.dismiss();
    //   }, (err) => {
    //     console.log('Error: ' + JSON.stringify(err));
    //     myLoader.dismiss();
    //     this.presentToast('Error: ' + JSON.stringify(err));
    //     alert('Error: ' + JSON.stringify(err));
    //   });

    // // Set the options
    // let options: FileUploadOptions = {
    //   fileKey: "file",
    //   fileName: this.filePath.substr(this.filePath.lastIndexOf('/') + 1),
    //   //mimeType: "multipart/form-data",
    //   headers: {
    //             'Content-Type': 'multipart/form-data'
    //         },
    //   chunkedMode: true
    //   // chunkedMode: true
    // }
    //
    // fileTransfer.upload(this.filePath, 'http://192.168.0.20:8080/webservice/v1/bpd/upload', options)
    //   .then((data) => {
    //     console.log(data + ' Upload Successful');
    //     myLoader.dismiss();
    //   }, (err) => {
    //     console.log('Error: ' + JSON.stringify(err));
    //     myLoader.dismiss();
    //     this.presentToast('Error: ' + JSON.stringify(err));
    //     alert('Error: ' + JSON.stringify(err));
    //   });
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
