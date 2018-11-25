import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FIREBASE_CONFIG} from "./env.config";
import {LoginPageModule} from "../pages/login/login.module";
import {FirebaseProvider} from '../mock.providers';
import {HomePageModule} from "../pages/home/home.module";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    HomePageModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
  ]
})
export class AppModule {
}
