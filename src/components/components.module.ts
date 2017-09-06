import { NgModule } from '@angular/core';
import { RadarComponent } from './radar/radar';
import {CommonModule} from "@angular/common";
import {AgmCoreModule} from "@agm/core";
import { VersionComponent } from './version/version';

@NgModule({
	declarations: [RadarComponent,
    VersionComponent],
	imports: [CommonModule, AgmCoreModule],
	exports: [RadarComponent,
    VersionComponent]
})
export class ComponentsModule {}
