import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  password: string;
  loading: boolean;
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AngularFireAuth,
              private authProvider: AuthProvider) {
  }

  ngOnInit() {
    this.auth.authState.subscribe((user: firebase.User) => {
      this.authProvider.authNotifier.next(!!user);
    });
  }

  signIn() {
    if (this.email && this.password) {
      this.loading = true;
      this.auth.auth.signInWithEmailAndPassword(this.email, this.password)
        .catch(err => {
          this.errorMessage = err.message;
          this.loading = false;
        })
    } else {
      this.errorMessage = "Please enter a email and password";
    }
  }

}
