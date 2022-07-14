import { ExhaustPipe } from './ExhaustPipe';
const CORNER_R = 6;

type ExhaustPosition = 'front' | 'back';

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
    if (pos === 'front') {
      this.exhaust.x = this.x + this.w - 20;
      this.exhaust.y = this.hoodHeight - 5;
      this.exhaust.w = 10;
      this.exhaust.h = 30;
    } else {
      this.exhaust.x = this.x + this.cabinWidth - 20;
      this.exhaust.y = this.h;
      this.exhaust.w = 10;
      this.exhaust.h = 30;
    }
  }

  next(dt) {
    this.exhaust.next(dt);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, -this.y);
    ctx.fillStyle = this.color;

    // Draw behind everything
    ctx.globalCompositeOperation = 'destination-over';

    // Draw
    roundRect(ctx, 0, -this.h, this.cabinWidth, this.h, CORNER_R);
    ctx.fill();

    roundRect(ctx, 0, -this.hoodHeight, this.w, this.hoodHeight, CORNER_R);
    ctx.fill();

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
