import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { DEFAULT_TRACTOR_CONFIG } from './DEFAULT_TRACTOR_CONFIG';
import { Tractor } from './drawing/Tractor';
import { TractorConfig } from './tractor-config';

@Component({
  selector: 'app-tractor',
  templateUrl: './tractor.component.html',
  styleUrls: ['./tractor.component.scss'],
})
export class TractorComponent implements AfterViewInit, OnChanges {
  @Input() config: TractorConfig;
  @Input() animated = true;
  @ViewChild('targetCanvas') targetCanvas: ElementRef<HTMLCanvasElement>;

  tractor: Tractor;
  private readonly defaultConfig = DEFAULT_TRACTOR_CONFIG;

  constructor() {
    this.tractor = new Tractor(200, 500);
    this.tractor.update(this.defaultConfig);
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

      if (!this.animated) {
        return;
      }
      requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }
}
