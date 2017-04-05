import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';

import { NgZone } from '@angular/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  zone: NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    });
    firebase.initializeApp({
      apiKey: "AIzaSyDjWHo4EAJoaOaR9XlO9ElsZICVoJ0_Fsg",
      authDomain: "eventtutorial-2cfcc.firebaseapp.com",
      databaseURL: "https://eventtutorial-2cfcc.firebaseio.com",
      projectId: "eventtutorial-2cfcc",
      storageBucket: "eventtutorial-2cfcc.appspot.com",
      messagingSenderId: "41936784347"
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
