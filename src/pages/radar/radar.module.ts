import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RadarPage } from './radar';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    RadarPage,
  ],
  imports: [
    IonicPageModule.forChild(RadarPage),
    ComponentsModule
  ],
})
export class RadarPageModule {}
