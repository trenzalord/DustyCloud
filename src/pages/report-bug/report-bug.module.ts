import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportBugPage } from './report-bug';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ReportBugPage,
  ],
  imports: [
    IonicPageModule.forChild(ReportBugPage),
    ComponentsModule
  ],
})
export class ReportBugPageModule {}
