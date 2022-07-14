const PARTICLE_COUNT = 60;
const SMOKE_LIFETIME = 6000; // ms
const SMOKE_BASE_COLOR = 0.3; // Darkest black of smoke
const SMOKE_MIN_SIZE = 2;
const SMOKE_SIZE_DIFF = 10;

class SmokeParticle {
  r: number;
  x: number;
  y: number;
  age: number;
  maxAge: number;
  private vx: number;
  private vy: number;

  constructor(x, y) {
    this.r = SMOKE_MIN_SIZE + SMOKE_SIZE_DIFF * Math.random();
    this.x = x;
    this.y = y - this.r;
    this.age = 0;
    this.maxAge = SMOKE_LIFETIME * Math.random();

    this.vx = 0;
    this.vy = -1 - 2 * Math.random();
  }

  next(dt: number) {
    this.age += dt;

    this.vx -= 0.02;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    const p = 1 - this.age / this.maxAge;

    // Draw behind everything
    ctx.globalCompositeOperation = 'destination-over';

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    ctx.fillStyle = `rgba(0, 0, 0, ${SMOKE_BASE_COLOR * p})`;
    ctx.fill();

    ctx.restore();
  }
}

export class ExhaustPipe {
  x: number;
  y: number;
  w: number;
  h: number;
  smoke: SmokeParticle[];

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.smoke = [];
  }

  next(dt) {
    this.smoke.forEach((s) => {
      s.next(dt);
    });
    this.smoke = this.smoke.filter((s) => s.age < s.maxAge);

    if (this.smoke.length < PARTICLE_COUNT) {
      this.smoke.push(new SmokeParticle(this.w / 2, -this.h - 10));
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, -this.y);

    // Draw smoke
    this.smoke.forEach((s) => {
      s.draw(ctx);
    });

    // Draw pipe
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, -this.h, this.w, this.h);

    ctx.restore();
  }
}
