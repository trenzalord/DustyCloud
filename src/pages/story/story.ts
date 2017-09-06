import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Story} from "../../interfaces/Story";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the StoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment: 'story/:storyKey',
  defaultHistory: ['RadarPage']
})
@Component({
  selector: 'page-story',
  templateUrl: 'story.html',
})
export class StoryPage {
  story: Story;
  sub: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase) {
    this.sub = this.db.object('/stories/' + this.navParams.get('storyKey')).subscribe( (story: Story) => {
      this.story = story;
    });
  }

  goToRadar() {
    this.sub.unsubscribe();
    this.navCtrl.popTo("RadarPage");
  }

}
