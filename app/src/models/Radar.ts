import { Position } from './Technology';
import { phases } from './Phase';

const canvasName = 'tech-radar',
  contextId = '2d',
  TWO_PI = Math.PI * Math.PI,
  rings = 4,
  diameter = 600,
  radius = diameter / 2,
  offset = 20,
  centerX = radius,
  centerY = radius + offset,
  lineWidth = 1;

export function getCanvas(canvas: string = canvasName): HTMLCanvasElement {
  return <HTMLCanvasElement> document.getElementById(canvas);
}

function getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  return <CanvasRenderingContext2D> canvas.getContext(contextId);
}

function getCanvasContext(
  canvas: string | HTMLCanvasElement = canvasName
): CanvasRenderingContext2D {
  let newCanvas = <HTMLCanvasElement> canvas;

  if (typeof canvas === 'string') {
    newCanvas = getCanvas(canvas);
  }

  return getContext(newCanvas);
}

export function getXCoordinateOfRing(ringNo: number) {
  return ((radius - lineWidth / 2) / rings) * (ringNo + 1);
}

export function paintRadar(): void {
  const canvas = getCanvas(),
    context = getContext(canvas),
    ringNames = ['Adopt', 'Trial', 'Assess', 'Hold'],
    renderRings = () => {
      for (let i = 0; i < rings; i++) {
        context.beginPath();
        const arcRadius = getXCoordinateOfRing(i);
        context.arc(radius, radius + offset, arcRadius, 0, TWO_PI, false);
        context.strokeStyle = 'green';
        context.lineWidth = lineWidth;
        context.stroke();
        context.fillText(
          ringNames[i],
          radius + 1,
          radius + offset - arcRadius + i - 6
        );
      }
    },
    renderGrid = () => {
      context.beginPath();
      context.moveTo(radius - lineWidth / 2, lineWidth + offset);
      context.lineTo(radius - lineWidth / 2, diameter - lineWidth + offset);
      context.moveTo(0, radius - lineWidth / 2 + offset);
      context.lineTo(diameter - lineWidth, radius - lineWidth / 2 + offset);
      context.strokeStyle = '#686868';
      context.stroke();
    };

  canvas.width = diameter;
  canvas.height = diameter + offset;
  context.font = '16px Arial';
  context.fillStyle = 'grey';
  renderRings();
  renderGrid();
}

function isPointWithinCircle(
  x: number,
  y: number,
  circleRadius: number
): boolean {
  (x = x - centerX), (y = y - centerY);
  return x * x + y * y < circleRadius * circleRadius;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function findInitialPointInRing(
  startX: number,
  startY: number,
  ringNo: number
): Position {
  const circleRadius = getXCoordinateOfRing(ringNo);

  let randomX = 0,
    randomY = 0;

  if (ringNo === 0) {
    while (!isPointWithinCircle(randomX, randomY, circleRadius)) {
      randomY = getRandomInt(startY, centerY);
      randomX = getRandomInt(startX, centerX);
    }
  } else {
    const innerArcRadius = getXCoordinateOfRing(ringNo - 1);

    let isInsideOuterRing = false,
      isInsideInnerRing = true;

    while (!(isInsideOuterRing && !isInsideInnerRing)) {
      randomY = getRandomInt(startY, centerY);
      randomX = getRandomInt(startX, centerX);

      isInsideOuterRing = isPointWithinCircle(randomX, randomY, circleRadius);
      isInsideInnerRing = isPointWithinCircle(randomX, randomY, innerArcRadius);
    }
  }

  return new Position(randomY, randomX);
}

export function findRingPhase(x: number, y: number): Phase {
  for (const { ringNo } of phases) {
    const ringRadius = getXCoordinateOfRing(ringNo);
    if (isPointWithinCircle(x, y, ringRadius)) {
      return phases[ringNo];
    }
  }
  return phases[3];
}

export { findInitialPointInRing, getCanvasContext };
