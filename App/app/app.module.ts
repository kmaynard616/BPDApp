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
// import { RemoteService } from '../providers/remote-service';
import { HttpModule } from '@angular/http';
// import { Http } from '@angular/http';

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
    RemoteServiceProvider
  ]
})
export class AppModule {}
