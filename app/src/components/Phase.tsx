import React from 'react';
import { Ring } from '../models/Rings';
import TechnologyItem from './Technology';

interface Props {
  name: string;
  ring: Ring;
  technologies: Technology[];
}

function RingPhase(props: Props): JSX.Element {
  const relevantTechnologies = [];

  for (const tech of props.technologies) {
    if (tech.phase.type === props.name) {
      relevantTechnologies.push(
        <TechnologyItem key={tech.index} technology={tech} ring={props.ring} />
      );
    }
  }

  return (
    <div className="ring-phase">
      <h5>{props.name}</h5>
      {relevantTechnologies}
    </div>
  );
}

export default RingPhase;
