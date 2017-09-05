import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

/**
 * Generated class for the RadarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'radar',
  templateUrl: 'radar.html',
  inputs: ['center', 'points']
})
export class RadarComponent implements OnChanges{

  @Input() center: number[];
  @Input() points: {[key: string]: {key: string, location: number[]}}[];

  constructor() {
    if (!this.center) {
      throw "Input center is undefined"
    }
    if (!this.points) {
      throw "Input points is undefined"
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  calculate(axis: number, point: {key: string, location: number[]}) {
    return this.center[axis] - point.location[axis];
  }

}
