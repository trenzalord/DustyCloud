import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Story} from "../../interfaces/Story";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Geoposition} from "@ionic-native/geolocation";

/**
 * Generated class for the StoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  segment: "story/new/:latitude/:longitude"
})
@Component({
  selector: 'page-new-story',
  templateUrl: 'new-story.html',
})
export class NewStoryPage {
  story: Story;
  stories: FirebaseListObservable<Story[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private auth: AngularFireAuth,
              private db: AngularFireDatabase,
              private toastCtrl: ToastController) {
    this.story = {
      title: null,
      description: null,
      latitude: this.navParams.get("latitude"),
      longitude: this.navParams.get("longitude"),
      eventDate: null,
      createdDate: null
    };
    this.stories = this.db.list('/stories');
  }

  ngOnInit() {
    this.story.eventDate = new Date().toISOString();
    this.auth.authState.subscribe( (user:firebase.User) => {
      this.story.uid = user.uid;
    })
  }

  addStory() {
    if (this.story.title && this.story.description) {
      this.story.createdDate = new Date().toISOString();
      this.stories.push(this.story).then(ref => {
        this.db.object('/users/' + this.story.uid + '/stories/' + ref.key).set(true).then(() => {
          this.toastCtrl.create({
            message: 'Story ' + this.story.title + ', was successfully created',
            duration: 3000,
            position: 'top'
          }).present();
          this.navCtrl.popTo("RadarPage");
        });
      })
    }
  }

}
