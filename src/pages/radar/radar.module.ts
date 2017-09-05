import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RadarPage } from './radar';

@NgModule({
  declarations: [
    RadarPage,
  ],
  imports: [
    IonicPageModule.forChild(RadarPage),
  ],
})
export class RadarPageModule {}
