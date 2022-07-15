export class ExhaustValve {

  angle = 0;
  vy = 0;
  ay = 0;

  constructor() {
  }


  next(dt: number) {
    this.angle = Math.min(Math.max(0, this.angle - this.vy), Math.PI / 2);
    this.vy += this.ay * dt / 1000;
    
    this.ay = 0.04;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-w, 0);
    ctx.strokeStyle = "#454545";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  }



}