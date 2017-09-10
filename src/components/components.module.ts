import { NgModule } from '@angular/core';
import { RadarComponent } from './radar/radar';
import {CommonModule} from "@angular/common";
import {AgmCoreModule} from "@agm/core";
import { VersionComponent } from './version/version';
import {IonicModule} from "ionic-angular";

@NgModule({
	declarations: [RadarComponent,
    VersionComponent],
	imports: [CommonModule, AgmCoreModule,
    IonicModule],
	exports: [RadarComponent,
    VersionComponent]
})
export class ComponentsModule {}
