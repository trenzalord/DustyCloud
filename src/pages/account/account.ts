import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {User} from "../../interfaces/User";
import {Subscription} from "rxjs/Subscription";

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
  _user: User;
  sub: Subscription;

  constructor(public modalCtrl: ModalController,
              public navParams: NavParams,
              private auth: AngularFireAuth,
              private db: AngularFireDatabase) {
    this.publicName = '';
  }

  ngOnInit() {
    this.user = this.db.object("/users/" + this.auth.auth.currentUser.uid);
    this.sub = this.user.subscribe(user => {
      this._user = user;
    });
  }

  saveUserPublicName() {
    if (this.publicName) {
      this.user.update({publicName: this.publicName});
    }
  }

  ionDidLeave() {
    this.sub.unsubscribe();
  }

  goToBugReport() {
    this.modalCtrl.create("ReportBugPage").present();
  }

  // COMPONENT BIATCH
  get numberOfFriendRequests () {
    if (this._user && this._user.friend_requests) {
      return Object.keys(this._user.friend_requests).length;
    }
    return 0;
  }

  goToFriendsPage() {
    this.modalCtrl.create('FriendsPage').present();
  }

  signOut() {
    this.sub.unsubscribe();
    this.auth.auth.signOut();
  }
}
