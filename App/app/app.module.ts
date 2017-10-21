import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { GenchatPage } from '../pages/genchat/genchat';
import { FichatPage } from '../pages/fichat/fichat';

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
    FichatPage,
    TabsPage
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
    FichatPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteServiceProvider
  ]
})
export class AppModule {}
