import React from 'react';
import { Ring, Shape } from '../models/Rings';

String.prototype.capitilize = function(): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

interface TechnologyItemProps {
  technology: Technology;
  ring: Ring;
}

export function getTechStyle(ring: Ring): React.CSSProperties {
  const style = { background: '', borderBottomColor: '' };
  if (ring.shape === Shape.CIRCLE) {
    style.background = ring.color;
  } else {
    style.borderBottomColor = ring.color;
  }
  return style;
}

function TechnologyItem(props: TechnologyItemProps): JSX.Element {
  const style = getTechStyle(props.ring);

  return (
    <div className="technology">
      <div className={props.ring.shape} style={style}>
        <p>{props.technology.index}</p>
      </div>
      <h6>{props.technology.name.capitilize()}</h6>
    </div>
  );
}

export default TechnologyItem;
