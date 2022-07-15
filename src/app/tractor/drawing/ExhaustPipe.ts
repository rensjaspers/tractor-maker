import { ExhaustValve } from "./ExhaustValve";
import { SmokeParticle } from "./SmokeParticle";

const PARTICLE_COUNT = 60;


export class ExhaustPipe {
  x: number;
  y: number;
  w: number;
  h: number;
  smoke: SmokeParticle[];
  valve: ExhaustValve;

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.smoke = [];

    this.valve = new ExhaustValve();
  }

  next(dt) {
    this.smoke.forEach((s) => {
      s.next(dt);
    });
    this.smoke = this.smoke.filter((s) => s.age < s.maxAge);

    if (this.smoke.length < PARTICLE_COUNT) {
      // Horizontal
      if (this.w > this.h) {
        this.smoke.push(new SmokeParticle(-this.w / 2, -this.h / 2, -1.5));
      } else {
        this.smoke.push(new SmokeParticle(this.w / 2, -this.h - 10));
      }

      this.valve.ay = (Math.PI / 4 - this.valve.angle) * -0.5;
    }

    this.valve.next(dt);
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

    // Vertical pipes get a valve
    if (this.w < this.h) {
      this.valve.draw(ctx, this.w, -this.h, this.w);
    }

    ctx.restore();
  }
}
