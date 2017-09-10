import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams, ViewController} from 'ionic-angular';
import {User} from "../../interfaces/User";
import {Subscription} from "rxjs/Subscription";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit{
  profile: FirebaseObjectObservable<User>;
  currentUser: FirebaseObjectObservable<User>;
  subs: Subscription[];
  friendRequestSent: boolean;
  loadingSendRequest: boolean;

  _currentUser: User;
  _profile: User;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth) {
  }

  ngOnInit() {
    this.subs = [];
    this.friendRequestSent = false;
    this.loadingSendRequest = false;

    this.profile = this.db.object("users/" + this.navParams.get("uid"));
    this.subs[0] = this.profile.subscribe(profile => {
      this._profile = profile;
    });
    if (this.auth.auth.currentUser.uid !== this.navParams.get("uid")) {
      this.currentUser = this.db.object("users/" + this.auth.auth.currentUser.uid);
      this.subs[1] = this.currentUser.subscribe(user => {
        this._currentUser = user;
      });
    }
  }

  get numberOfStories() {
    if (this._profile && this._profile.stories) {
       return Object.keys(this._profile.stories).length;
    }
  }

  sendFriendRequest() {
    this.loadingSendRequest = true;
    this.db.object("users/" + this._profile.$key + "/friend_requests/" + this._currentUser.$key).set(true).then(() => {
      this.loadingSendRequest = false;
      this.friendRequestSent = true;
    });
  }

  get shouldShowSendRequestButton () {
    return this._currentUser && this._profile &&
      this._currentUser !== this._profile.$key &&
      (!this._currentUser.friends || (this._currentUser.friends && !this._currentUser.friends[this._profile.$key])) &&
      (!this._profile.friend_requests || (this._profile.friend_requests && !this._profile.friend_requests[this._currentUser.$key]));
  }

  get isFriend() {
    return this._currentUser && this._profile && this._currentUser.friends && this._currentUser.friends[this._profile.$key];
  }

  dismiss() {
    for(const sub of this.subs) {
      sub.unsubscribe();
    }
    this.viewCtrl.dismiss();
  }

}
