import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController, ViewController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {BugReport} from "../../interfaces/BugReport";
import {AngularFireAuth} from "angularfire2/auth";

/**
 * Generated class for the ReportBugPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report-bug',
  templateUrl: 'report-bug.html',
})
export class ReportBugPage {
  bugReport: BugReport;
  bugReports: FirebaseListObservable<BugReport[]>;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private auth: AngularFireAuth,
              private toastCtrl: ToastController) {
    this.bugReports = this.db.list('/bug-reports');
    this.bugReport = {
      text: '',
      category: 'bug',
      createdDate: new Date().toISOString(),
      uid: this.auth.auth.currentUser.uid
    };
  }

  addBugReport() {
    if (this.bugReport.uid && this.bugReport.text) {
      this.bugReports.push(this.bugReport).then(() => {
        this.toastCtrl.create({
          message: 'Thank for you report! We\'re on it',
          duration: 3000,
          position: 'top'
        }).present();
        this.dismiss();
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
