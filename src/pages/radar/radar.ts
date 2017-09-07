import {Component, OnInit} from '@angular/core';
import {IonicPage, ModalController, NavParams} from 'ionic-angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/filter';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Story} from "../../interfaces/Story";
import {GeoFireProvider} from "../../providers/geo-fire/geo-fire";

/**
 * Generated class for the RadarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-radar',
  templateUrl: 'radar.html',
})
export class RadarPage implements OnInit{
  geoPosition: Geoposition;
  watch: Subscription;
  stories: FirebaseListObservable<Story[]>;
  geoQuery: any;
  storiesInRadar: {[key: string]: {key: string, location: number[]}}[];
  center: number[];

  constructor(public modalCtrl: ModalController,
              public navParams: NavParams,
              private geolocation: Geolocation,
              private db: AngularFireDatabase,
              private geoFireProvider: GeoFireProvider,) {
    this.stories = this.db.list("/stories");
    this.storiesInRadar = [];
    this.center = [0, 0];
  }

  ngOnInit() {
    this.watch = this.geolocation.watchPosition()
      .filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        this.geoPosition = position;
        this.center = [this.geoPosition.coords.latitude, this.geoPosition.coords.longitude];
        if (!this.geoQuery) {
          this.geoQuery = this.geoFireProvider.geoFire.query({
            center: [this.geoPosition.coords.latitude, this.geoPosition.coords.longitude],
            radius: 0.25
          });

          this.geoQuery.on("key_entered", (key, location) => {
            this.storiesInRadar[key] = {key: key, location: location};
          });

          this.geoQuery.on("key_exited", (key) => {
            delete this.storiesInRadar[key];
          });
        } else {
          this.geoQuery.updateCriteria({
            center: [this.geoPosition.coords.latitude, this.geoPosition.coords.longitude]
          });
        }
      });
  }

  ionViewDidLeave() {
    this.watch.unsubscribe();
  }

  gotToAddStory() {
    this.modalCtrl.create("EditStoryPage", {
      latitude: this.geoPosition.coords.latitude,
      longitude: this.geoPosition.coords.longitude
    }).present();
  }
}
