export interface TractorConfig {
  wheelSize: number;
  rimSize: number;
  frontBackRatio: number;
  color: string;

  cabinWidth: number;
  hoodHeight: number;

  height: number;
  width: number;

  exhaustLocation: 'front' | 'back';
  bolts: number;
}
