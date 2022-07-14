import { TractorConfig } from '../tractor-config';
import { Body } from './Body';
import { ExhaustPipe } from './ExhaustPipe';
import { Wheel } from './Wheel';

interface Part {
  draw: (context2d: CanvasRenderingContext2D) => void;
  next: (deltaT: number) => void;
}
export class Tractor {
  x: number;
  y: number;
  body: Body;
  exhaust: ExhaustPipe;
  frontWheel: Wheel;
  backWheel: Wheel;
  parts: Part[];

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.body = new Body(0, 50, 350, 250, 0.4, 0.5, 'green');

    this.frontWheel = new Wheel(300, 50);
    this.backWheel = new Wheel(50, 80);

    this.parts = [this.backWheel, this.frontWheel, this.body];
  }

  // TODO: ensure config from URL does not pass strings to this method
  update(config: TractorConfig) {
    this.body.color = config.color;
    this.backWheel.y = +config.wheelSize;
    this.frontWheel.y = (+config.wheelSize * +config.frontBackRatio) / 100;

    this.body.w = +config.width;
    this.body.h = +config.height;
    this.body.y = Math.min(this.backWheel.y, this.frontWheel.y) - 10;
    this.body.wRatio = +config.cabinWidth / 100;
    this.body.hRatio = +config.hoodHeight / 100;

    [this.frontWheel, this.backWheel].forEach((wheel) => {
      wheel.boltCount = +config.bolts;
      wheel.rimSize = +config.rimSize;
    });

    this.frontWheel.x = this.body.x + this.body.w - this.frontWheel.y - 5;
    this.backWheel.x = this.body.x + this.backWheel.y - 5;

    this.body.updateExhaust(config.exhaustLocation);
  }

  next(dt: number) {
    this.parts.forEach((p) => {
      p.next(dt);
    });
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Move to origin
    ctx.translate(this.x, this.y);

    this.parts.forEach((p) => {
      p.draw(ctx);
    });

    // Draw floor
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'brown';
    ctx.fillRect(-this.x, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'rgba(0, 0, 255, 0.4)';
    ctx.fillRect(
      -this.x,
      -ctx.canvas.height,
      ctx.canvas.width,
      ctx.canvas.height
    );

    ctx.restore();
  }
}
