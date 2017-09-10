import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavParams, ViewController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {Story} from "../../interfaces/Story";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../interfaces/User";
import {Reactions} from "../../interfaces/Reactions";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the StoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html',
})
export class StoryPage implements OnInit{
  story: FirebaseObjectObservable<Story>;
  user: FirebaseObjectObservable<User>;
  subs: Subscription[];

  _reactions: Reactions;
  _currentUser: User;
  _story: Story;

  constructor(public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth) {
    this.subs = [];
  }

  ngOnInit() {
    this.story = this.db.object('stories/' + this.navParams.get('storyKey'));
    this.subs[0] = this.story.subscribe((story: Story) => {
      this._story = story;
      this.user = this.db.object('users/' + story.uid);
    });
    this.subs[1] = this.db.object("reactions/").subscribe(reactions => this._reactions = reactions);
    this.subs[2] = this.db.object('users/' + this.auth.auth.currentUser.uid).subscribe(user => this._currentUser = user);
  }

  dismiss() {
    for(const sub of this.subs) {
      sub.unsubscribe()
    }
    this.viewCtrl.dismiss();
  }

  goToProfile() {
    this.user.subscribe(user => {
      this.modalCtrl.create('ProfilePage', {
        uid: user.$key
      }).present();
    }).unsubscribe();
  }

  get reactionKeys() {
    if (this._reactions) {
      return Object.keys(this._reactions);
    }
    return [];
  }

  addReaction(reactionKey: string) {
    this.db.object('users/' + this._currentUser.$key + '/reactions/' + this._story.$key).set(reactionKey);
    this.db.object('stories/' + this._story.$key + '/reactions/' + this._currentUser.$key).set(reactionKey);
  }

  get hasReacted() {
    return !!(this._currentUser && this._currentUser.reactions && this._currentUser.reactions[this._story.$key]);
  }

  get userReaction() {
    return this._currentUser.reactions[this._story.$key];
  }

  removeReaction() {
    this.db.object('users/' + this._currentUser.$key + '/reactions/' + this._story.$key).remove();
    this.db.object('stories/' + this._story.$key + '/reactions/' + this._currentUser.$key).remove();
  }
}
