const SPEED = 2;
import { BackgroundItem } from './Tractor';

export class Shed implements BackgroundItem {

  h: number;

  constructor(public x: number, public width: number) {

  }

  next(dt) {
    this.x -= SPEED;

    this.h = 150;
  }


  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    // ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'darkred';
    ctx.lineCap = "round";
    ctx.lineWidth = 8;
    ctx.strokeStyle = "beige";

    // Door
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 3, -this.h / 3);
    ctx.lineTo(this.x + this.width / 3 * 2, -this.h / 3);
    ctx.lineTo(this.x + this.width / 3 * 2, 0);
    ctx.lineTo(this.x + this.width / 2, - this.h / 3);
    ctx.lineTo(this.x + this.width / 3, 0);
    ctx.lineTo(this.x + this.width / 3, 0);
    ctx.lineTo(this.x + this.width / 3, -this.h / 3);
    ctx.lineTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 3 * 2, -this.h / 3);
    
    ctx.stroke();

    ctx.strokeStyle = "burlywood";
    ctx.beginPath();
    ctx.moveTo(this.x, 0);
    // Left wall
    ctx.lineTo(this.x, -this.h);
    // Roof line
    ctx.lineTo(this.x + this.width / 3,     -this.h * 1.3);
    ctx.lineTo(this.x + this.width / 2,     -this.h * 1.4);
    ctx.lineTo(this.x + this.width / 3 * 2, -this.h * 1.3);
    ctx.lineTo(this.x + this.width,         -this.h);

    // Right wall
    ctx.lineTo(this.x + this.width, 0);
    ctx.closePath();
    ctx.fill();

    // Roof
    ctx.beginPath();
    ctx.moveTo(this.x, -this.h);
    ctx.lineTo(this.x + this.width / 3,     -this.h * 1.3);
    ctx.lineTo(this.x + this.width / 2,     -this.h * 1.4);
    ctx.lineTo(this.x + this.width / 3 * 2, -this.h * 1.3);
    ctx.lineTo(this.x + this.width,         -this.h);
    ctx.lineWidth = 16;
    ctx.stroke();


    ctx.fillRect(this.x, 0, this.width, -100);

    ctx.restore();
  }

}