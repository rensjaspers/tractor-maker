const SMOKE_LIFETIME = 6000; // ms
const SMOKE_BASE_COLOR = 0.3; // Darkest black of smoke
const SMOKE_MIN_SIZE = 2;
const SMOKE_SIZE_DIFF = 15;
const SPEED_INC = 0.02;

export class SmokeParticle {
  r: number;
  x: number;
  y: number;
  age: number;
  maxAge: number;
  private vx: number;
  private vy: number;

  constructor(x, y, vx = 0) {
    this.r = SMOKE_MIN_SIZE + SMOKE_SIZE_DIFF * Math.random();
    this.x = x;
    this.y = y - this.r;
    this.age = 0;
    this.maxAge = SMOKE_LIFETIME * Math.random();

    this.vx = vx;
    this.vy = -1 - 2 * Math.random();
  }

  next(dt: number) {
    this.age += dt;

    this.vx -= SPEED_INC;

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
    ctx.closePath();
    
    const color = `rgba(0, 0, 0, ${SMOKE_BASE_COLOR * p})`;
    const gradient = ctx.createRadialGradient(this.x, this.y, 1, this.x, this.y, this.r);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();
  }
}
