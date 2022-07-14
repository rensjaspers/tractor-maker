import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { Tractor } from './drawing/Tractor';
import { TractorConfig } from './tractor-config';

@Component({
  selector: 'app-tractor',
  templateUrl: './tractor.component.html',
  styleUrls: ['./tractor.component.scss'],
})
export class TractorComponent implements AfterViewInit, OnChanges {
  @Input() config: TractorConfig;
  @ViewChild('targetCanvas') targetCanvas: ElementRef<HTMLCanvasElement>;

  tractor: Tractor;
  private readonly defaultConfig: TractorConfig = {
    wheelSize: 80,
    rimSize: 0.5,
    color: '#FF0000',
    cabinWidth: 50,
    hoodHeight: 50,
    width: 300,
    height: 200,
    exhaustLocation: 'front',
    frontBackRatio: 50,
    bolts: 4,
  };

  constructor() {
    this.tractor = new Tractor(200, 500);
  }

  ngOnChanges(): void {
    this.tractor.update(this.config);
    console.log(this.config);
  }

  ngAfterViewInit() {
    this.targetCanvas.nativeElement.width = 800;
    this.targetCanvas.nativeElement.height = 600;
    const ctx = this.targetCanvas.nativeElement.getContext('2d');

    this.tractor.update(this.defaultConfig);

    let t = 0;
    const frame = (t2) => {
      const dt = t2 - (t || t2);
      t = t2;

      this.tractor.next(dt);
      this.tractor.draw(ctx);

      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }
}
