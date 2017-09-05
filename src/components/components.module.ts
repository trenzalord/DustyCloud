import { NgModule } from '@angular/core';
import { RadarComponent } from './radar/radar';
import {CommonModule} from "@angular/common";
import {AgmCoreModule} from "@agm/core";

@NgModule({
	declarations: [RadarComponent],
	imports: [CommonModule, AgmCoreModule],
	exports: [RadarComponent]
})
export class ComponentsModule {}
