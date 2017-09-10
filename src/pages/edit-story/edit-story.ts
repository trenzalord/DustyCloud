import {Component, OnInit} from '@angular/core';
import {IonicPage, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Story} from "../../interfaces/Story";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {GeoFireProvider} from "../../providers/geo-fire/geo-fire";
import {Categories} from "../../interfaces/Categories";
import {Subscription} from "rxjs/Subscription";

/**
 * Generated class for the StoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-story',
  templateUrl: 'edit-story.html',
})
export class EditStoryPage implements OnInit{
  story: Story;
  stories: FirebaseListObservable<Story[]>;
  sub: Subscription;
  _categories: Categories;

  constructor(private viewCtrl: ViewController,
              public navParams: NavParams,
              private auth: AngularFireAuth,
              private db: AngularFireDatabase,
              private toastCtrl: ToastController,
              private geoFireProvider: GeoFireProvider) {
    this.story = {
      title: null,
      description: null,
      eventDate: null,
      createdDate: null
    };
    this.stories = this.db.list('/stories');
  }

  ngOnInit() {
    this.sub = this.db.object("/categories").subscribe(categories => this._categories = categories);
    this.story.eventDate = new Date().toISOString();
    this.story.uid = this.auth.auth.currentUser.uid;
  }

  addStory() {
    if (this.story.title && this.story.description) {
      this.story.createdDate = new Date().toISOString();
      this.stories.push(this.story).then(ref => {
        this.geoFireProvider.geoFire.set(ref.key, [this.navParams.get("latitude"), this.navParams.get("longitude")]).then(() => {
          this.db.object('/users/' + this.story.uid + '/stories/' + ref.key).set(true).then(() => {
            this.toastCtrl.create({
              message: 'Story ' + this.story.title + ', was successfully created',
              duration: 3000,
              position: 'top'
            }).present();
            this.dismiss();
          });
        });
      })
    }
  }

  get categoryKeys() {
    if (this._categories) {
      return Object.keys(this._categories);
    }
    return [];
  }

  dismiss() {
    this.sub.unsubscribe();
    this.viewCtrl.dismiss();
  }
}
