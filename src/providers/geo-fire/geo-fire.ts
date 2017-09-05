import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import GeoFire from 'geofire';
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the GeoFireProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GeoFireProvider {
  _geoFire: GeoFire;

  constructor(db: AngularFireDatabase) {
    this._geoFire = new GeoFire(db.database.ref("/locations"));
  }

  get geoFire(): GeoFire {
    return this._geoFire;
  }
}
