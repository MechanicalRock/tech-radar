/// <reference types="react-scripts" />

declare module 'react-feather/dist/icons/*';
declare module 'mock-browser';

declare module NodeJS {
  interface Global extends Window {
    document: Document;
    window: Window;
  }
}

enum RingName {
  DEVELOP = 'Develop',
  BUILD = 'Build',
  DEPLOY = 'Deploy',
  OPERATE = 'Operate'
}

declare enum PhaseType {
  ADOPT = 'Adopt',
  TRIAL = 'Trial',
  ASSESS = 'Assess',
  HOLD = 'Hold'
}

declare interface Phase {
  type: PhaseType;
  ringNo: number;
}

declare interface Position {
  top: number;
  left: number;
}

declare interface Ring {
  name: RingName;
  shape: Shape;
  color: Color;
  startingPosition: Position;
}

declare interface Technology {
  name: string;
  ring: Ring;
  phase: Phase;
  index: number;
  canvasPosition: Position;
}

declare enum Shape {
  TRIANGLE = 'triangle',
  CIRCLE = 'circle'
}

declare enum Color {
  ORANGE = '#ff5722',
  PURPLE = '#9c27b0',
  GREEN = '#009688',
  BLUE = '#3f51b5'
}

declare interface AppState {
  isModalOpen: boolean;
  activeRing: Ring;
  technologies: Dict<Technology>;
}

declare interface ReduxState {
  AppReducer: AppState;
}

declare interface Dict<T> {
  [x: number | string]: T;
}

declare interface String {
  capitilize(): string;
}
