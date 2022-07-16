const SPEED = 100;
const ROT_SPEED = 2;

import { BackgroundItem } from './Tractor';

export class WindTurbine implements BackgroundItem {

  h: number;
  width: number;
  angle: number;
  rotSpeed: number;

  constructor(public x: number) {
    this.width = 100;
    this.h = 200 + Math.random() * 30;

    this.angle = 0;
    this.rotSpeed = ROT_SPEED + Math.random() / 4;
  }

  next(dt) {
    this.x -= (SPEED * dt) / 1000;
    this.angle += (this.rotSpeed * dt) / 1000;

    if (this.angle > 2 * Math.PI) {
      this.angle -= 2 * Math.PI;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.fillStyle = "#efefef";
    ctx.fillRect(this.x, 0, 20, -this.h);

    ctx.translate(this.x + 10, -this.h);
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, 2 * Math.PI);
    ctx.fill();

    ctx.rotate(this.angle);
    const WINGS = 3;
    const dAngle = (2 * Math.PI) / WINGS;
    ctx.fillStyle = "#ccc";
    for (let i = 0; i < WINGS; i += 1) {
      ctx.rotate(dAngle);
      ctx.fillRect(-5, 0, 10, -100);
    }

    ctx.restore();
  }
}
