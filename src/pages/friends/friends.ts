import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {User} from "../../interfaces/User";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage implements OnInit{
  user: FirebaseObjectObservable<User>;
  subs: Subscription[];
  _user: User;
  segment: boolean;
  _users: {[key: string]: User};

  constructor(public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth) {
  }

  ngOnInit() {
    this.subs = [];
    this._users = {};
    this.segment = true;
    this.user = this.db.object("users/" + this.auth.auth.currentUser.uid);
    this.subs[0] = this.user.subscribe(user => {
      this._user = user;
      this._loadUsers(this._user.friend_requests);
      this._loadUsers(this._user.friends);
    });
  }

  _loadUsers(userKeys: {[key: string]: boolean}) {
    for (const friend in userKeys) {
      if (!this._users[friend]) {
        let sub = this.db.object("users/" + friend).subscribe(user => {
          this._users[friend] = user;
        });
        this.subs.push(sub);
      }
    }
  }

  ionDidLeave() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  // COMPONENT BIATCH
  get numberOfFriendRequests() {
    return this.friendRequestKeys.length;
  }

  get friendRequestKeys() {
    if (this._user && this._user.friend_requests) {
      return Object.keys(this._user.friend_requests);
    }
    return [];
  }

  get friendKeys() {
    if (this._user && this._user.friends) {
      return Object.keys(this._user.friends);
    }
    return [];
  }

  userFromUid(uid: string) {
    return this._users[uid];
  }

  processFriendRequest(uid: string, accepted: boolean) {
    this.db.object("users/" + this._user.$key + "/friend_requests/" + uid).remove().then(_ => {
      if (accepted) {
        this.db.object("users/" + this._user.$key + "/friends/" + uid).set(true);
        this.db.object("users/" + uid + "/friends/" + this._user.$key).set(true);
      }
    });
  }

  removeFriend(uid: string) {
    this.db.object("users/" + this._user.$key + "/friends/" + uid).remove();
    this.db.object("users/" + uid + "/friends/" + this._user.$key).remove();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotToProfile(uid: string) {
    this.modalCtrl.create('ProfilePage', {
      uid: uid
    }).present();
  }

}
