import { Position } from './Technology';

export enum RingName {
  DEVELOP = 'Develop',
  BUILD = 'Build',
  DEPLOY = 'Deploy',
  OPERATE = 'Operate'
}

export enum Shape {
  TRIANGLE = 'triangle',
  CIRCLE = 'circle'
}

export enum Color {
  ORANGE = '#ff5722',
  PURPLE = '#9c27b0',
  GREEN = '#009688',
  BLUE = '#3f51b5'
}

export class Ring {
  name: RingName;
  shape: Shape;
  color: Color;
  startingPosition: Position;

  constructor(name: RingName, shape: Shape, color: Color, position: Position) {
    this.name = name;
    this.shape = shape;
    this.color = color;
    this.startingPosition = position;
  }
}

export const ringNames: Ring[] = [
  new Ring(RingName.BUILD, Shape.CIRCLE, Color.BLUE, new Position(0, 0)),
  new Ring(RingName.DEPLOY, Shape.TRIANGLE, Color.ORANGE, new Position(620, 0)),
  new Ring(RingName.DEVELOP, Shape.CIRCLE, Color.PURPLE, new Position(0, 600)),
  new Ring(
    RingName.OPERATE,
    Shape.TRIANGLE,
    Color.GREEN,
    new Position(620, 600)
  )
];

export function getRingFactory(x: number, y: number): Ring {
  if (x < 300) {
    if (y < 320) {
      return ringNames[0];
    }
    return ringNames[1];
  }
  if (y < 320) {
    return ringNames[2];
  }
  return ringNames[3];
}
