import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the AppVersionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppVersionProvider {
  version: string;

  constructor(public http: Http) {
  }

  getAppVersion(): Promise<string> {
    if (this.version) {
      return Promise.resolve(this.version);
    } else {
      return new Promise(resolve => {
        this.http.get('assets/version.json').subscribe(res => {
          this.version = res.json().version;
          resolve(this.version);
        });
      });
    }
  }

}
