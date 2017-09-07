import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database";
import {Story} from "../../interfaces/Story";
import {Subscription} from "rxjs/Subscription";
import {User} from "../../interfaces/User";

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
export class StoryPage {
  story: FirebaseObjectObservable<Story>;
  user: FirebaseObjectObservable<User>;
  sub: Subscription;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private db: AngularFireDatabase) {
    this.story = this.db.object('stories/' + this.navParams.get('storyKey'));
    this.sub = this.story.subscribe((story: Story) => {
      this.user = this.db.object('users/' + story.uid);
    });
  }

  dismiss() {
    this.sub.unsubscribe();
    this.viewCtrl.dismiss();
  }

}
