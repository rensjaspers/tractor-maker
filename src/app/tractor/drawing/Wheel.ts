const SPEED = 100;

// const TIRE_RATIO = 0.6; // size of the rim vs tire
// const BOLT_SIZE = 3;
// const BOLT_POS = 0.4;
// const BOLT_COUNT = 8;
// const PROFILE_DEPTH = 4;
// const PROFILE_RATIO = 0.5;
// const PROFILE_N = 40;

export class Wheel {
  x: number;
  y: number;
  rOut: number;
  rIn: number;
  rot: number;
  rotSpeed: number;

  rimSize: number;
  boltCount: number;
  profileCuts: number;
  profileCutWidth: number;
  boltSize: number;
  profileDepth: number;
  boltPosition: number;

  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.rot = 0;

    this.rotSpeed = SPEED / y;

    // Tires
    this.rimSize = 0.6;
    this.profileCuts = 60;
    this.profileCutWidth = 0.5;
    this.profileDepth = 4;

    // Bolts
    this.boltCount = 8;
    this.boltSize = 3;
    this.boltPosition = 0.5;
  }

  next(dt) {
    this.rot += (SPEED * dt) / this.y / 1000;
    if (this.rot > Math.PI * 2) this.rot -= Math.PI * 2;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, -this.y);
    ctx.rotate(this.rot);

    const rOut = this.y;
    const rIn = this.y * this.rimSize;

    // tire
    ctx.beginPath();
    ctx.arc(0, 0, rOut, 0, Math.PI * 2, true);
    ctx.fillStyle = 'black';
    ctx.fill();

    // inside
    ctx.beginPath();
    ctx.arc(0, 0, rIn, 0, Math.PI * 2, true);
    ctx.fillStyle = 'grey';
    ctx.fill();
    self;

    // bolts
    const boltPos =
      Math.min(this.boltPosition, this.rimSize) * this.y - this.boltSize;
    for (let i = 0; i < this.boltCount; i += 1) {
      ctx.rotate((2 * Math.PI) / this.boltCount);
      ctx.beginPath();
      ctx.arc(0, boltPos, this.boltSize, 0, Math.PI * 2, true);
      ctx.fillStyle = '#ccc';
      ctx.fill();
    }

    // profile
    const N = this.profileCuts;
    const lN = (2 * Math.PI * this.y) / N;
    const w = lN * this.profileCutWidth;
    for (let i = 0; i < N; i += 1) {
      ctx.rotate((2 * Math.PI) / N);
      ctx.clearRect(
        -w / 2,
        this.y - this.profileDepth + 1,
        w,
        this.profileDepth
      );
    }

    ctx.restore();
  }
}
