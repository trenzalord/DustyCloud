import { Component } from '@angular/core';
import {AppVersionProvider} from "../../providers/app-version/app-version";

/**
 * Generated class for the VersionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'dc-version',
  templateUrl: 'version.html'
})
export class VersionComponent {

  version: string;

  constructor(private appVersionProvider: AppVersionProvider) {
  }

  ngOnInit() {
    this.appVersionProvider.getAppVersion().then(appVersion => this.version = appVersion);
  }

}
