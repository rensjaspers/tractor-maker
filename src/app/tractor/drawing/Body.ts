import { ExhaustPipe } from './ExhaustPipe';
const CORNER_R = 6;

type ExhaustPosition = 'front' | 'roof' | 'back';

export class Body {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  exhaust: ExhaustPipe;
  exhaustPosition: ExhaustPosition;
  wRatio: number;
  hRatio: number;

  get cabinWidth(): number {
    return this.w * this.wRatio;
  }

  get hoodHeight() {
    return this.h * this.hRatio;
  }

  constructor(
    x,
    y,
    w,
    h,
    wRatio,
    hRatio,
    color,
    exhaustPositon: ExhaustPosition = 'front'
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;

    this.wRatio = wRatio;
    this.hRatio = hRatio;

    this.exhaust = new ExhaustPipe(0, 0, 0, 0);
    this.updateExhaust(exhaustPositon);
  }

  updateExhaust(pos: ExhaustPosition) {
    switch(pos) {
      case 'front':
        this.exhaust.x = this.x + this.w - 20;
        this.exhaust.y = this.hoodHeight - 5;
        this.exhaust.w = 10;
        this.exhaust.h = 30;
        break;
      case 'roof':
        this.exhaust.x = this.x + this.cabinWidth - 20;
        this.exhaust.y = this.h;
        this.exhaust.w = 10;
        this.exhaust.h = 30;
        break;
      case 'back':
        this.exhaust.x = this.x - 10;
        this.exhaust.y = 10;
        this.exhaust.w = 20;
        this.exhaust.h = 10;
        break;
    }
  }

  next(dt) {
    this.exhaust.next(dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, -this.y);
    ctx.fillStyle = this.color;

    // Draw behind everything
    ctx.globalCompositeOperation = 'destination-over';

    // Draw cabin
    const thickness = 10;
    // Left
    roundRect(ctx, 0, -this.h, thickness, this.h, CORNER_R);
    ctx.fill();
    // Center
    roundRect(ctx, (this.cabinWidth - thickness) / 2 - thickness, -this.h, thickness, this.h, CORNER_R);
    ctx.fill();
    // Right
    roundRect(
      ctx,
      this.cabinWidth - 3 * thickness,
      -this.h,
      thickness,
      this.h,
      CORNER_R
    );
    ctx.fill();

    // Roof
    roundRect(ctx, 0, -this.h, this.cabinWidth, thickness, CORNER_R);
    ctx.fill();

    // Draw hood
    ctx.globalCompositeOperation = 'destination-over';
    roundRect(ctx, 0, -this.hoodHeight, this.w, this.hoodHeight, CORNER_R);
    ctx.fill();

    // Steering wheel
    ctx.beginPath();
    ctx.moveTo(this.cabinWidth - 3 * thickness, -this.hoodHeight);
    ctx.lineTo(this.cabinWidth - 3 * thickness - 10, -this.hoodHeight - 10);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.closePath();
    ctx.stroke();

    this.exhaust.draw(ctx);

    ctx.restore();
  }
}

function roundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
