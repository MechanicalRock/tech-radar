import { Ring } from './Rings';
import { findInitialPointInRing } from './Radar';

export class Position {
  top: number;
  left: number;

  constructor(top: number, left: number) {
    this.top = top;
    this.left = left;
  }
}

class Technology {
  name: string;
  ring: Ring;
  phase: Phase;
  canvasPosition: Position;

  constructor(name: string, ring: Ring, phase: Phase) {
    this.name = name;
    this.ring = ring;
    this.phase = phase;
    this.canvasPosition = {
      top: 0,
      left: 0
    };
  }

  setInitialPointInRing(): void {
    const { left, top } = this.ring.startingPosition;
    this.canvasPosition = findInitialPointInRing(left, top, this.phase.ringNo);
  }

  setPointInRing(x: number, y: number): void {
    this.canvasPosition = {
      top: y,
      left: x
    };
  }
}

export default Technology;
