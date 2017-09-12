import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireAuth} from "angularfire2/auth";
import {TranslateService} from "@ngx-translate/core";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "LoginPage";

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              auth: AngularFireAuth,
              translate: TranslateService) {
    translate.setDefaultLang("en");
    translate.use("fr");
    auth.authState.subscribe((authed) => {
      if (!!authed) {
        this.rootPage = "TabsPage";
      } else {
        this.rootPage = "LoginPage";
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
