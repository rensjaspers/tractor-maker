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

  constructor() {
    this.tractor = new Tractor(200, 500);
  }

  ngOnChanges(): void {
    this.tractor.update(this.config);
  }

  ngAfterViewInit() {
    this.targetCanvas.nativeElement.width = 800;
    this.targetCanvas.nativeElement.height = 600;
    const ctx = this.targetCanvas.nativeElement.getContext('2d');

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
