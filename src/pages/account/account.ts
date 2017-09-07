import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {User} from "../../interfaces/User";

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit{
  publicName: string;
  user: FirebaseObjectObservable<User>;

  constructor(public modalCtrl: ModalController,
              public navParams: NavParams,
              private auth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.publicName = '';
  }

  ngOnInit() {
    this.user = this.db.object("/users/" + this.auth.auth.currentUser.uid);
  }

  saveUserPublicName() {
    if (this.publicName) {
      this.user.update({publicName: this.publicName});
    }
  }

  goToBugReport() {
    this.modalCtrl.create("ReportBugPage").present();
  }

  signOut() {
    this.auth.auth.signOut();
  }
}
