import React from 'react';
import { ringNames } from '../../models/Rings';
import MenuItem from './MenuItem';
import './_radar-menu.scss';

function RadarMenu(): JSX.Element {
  return (
    <nav>
      <ul className="radar-menu">
        {ringNames.map(ring => (
          <MenuItem key={ring.name} ring={ring} />
        ))}
      </ul>
    </nav>
  );
}

export default RadarMenu;
