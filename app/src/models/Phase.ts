enum PhaseType {
  ADOPT = 'Adopt',
  TRIAL = 'Trial',
  ASSESS = 'Assess',
  HOLD = 'Hold'
}

class Phase {
  type: PhaseType;
  ringNo: number;

  constructor(type: PhaseType, ringNo: number) {
    this.type = type;
    this.ringNo = ringNo;
  }
}

export const phases: Phase[] = [
  new Phase(PhaseType.ADOPT, 0),
  new Phase(PhaseType.TRIAL, 1),
  new Phase(PhaseType.ASSESS, 2),
  new Phase(PhaseType.HOLD, 3)
];

export default PhaseType;
