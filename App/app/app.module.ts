import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { GenchatPage } from '../pages/genchat/genchat';
import { ModalPage } from '../pages/modal/modal';
import { CreatemsgPage } from '../pages/createmsg/createmsg';
import { LandingPage } from '../pages/landing/landing';
import { LandingmodalPage } from '../pages/landingmodal/landingmodal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { HttpModule } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    GenchatPage,
    ModalPage,
    CreatemsgPage,
    LandingPage,
    LandingmodalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GenchatPage,
    ModalPage,
    CreatemsgPage,
    LandingPage,
    LandingmodalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider,
    FileTransfer,
    File,
    Camera
  ]
})
export class AppModule {}
