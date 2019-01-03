import React, { useState } from 'react';
import ChevronRight from 'react-feather/dist/icons/chevron-right';
import PlusCircle from 'react-feather/dist/icons/plus-circle';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import PhaseType from '../../models/Phase';
import { Ring } from '../../models/Rings';
import { AppAction } from '../../reducers/App';
import RingPhase from '../Phase';

export const phases: string[] = Object.values(PhaseType);

interface OwnProps {
  ring: Ring;
}

interface ReduxProps {
  technologies: Technology[];
}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = OwnProps & DispatchProps & ReduxProps;

export function MenuItem(props: Props): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  function handleChevronClick() {
    setIsExpanded(!isExpanded);
  }

  function handlePlusClick(event: React.MouseEvent) {
    props.dispatch({ type: AppAction.TOGGLE_MODAL_STATE, payload: props.ring });
    event.stopPropagation();
  }

  return (
    <li className={isExpanded ? '-open' : ''}>
      <div className="menu-item-content" onClick={handleChevronClick}>
        <ChevronRight className="chevron" />
        <h3>{props.ring.name}</h3>
        <PlusCircle className="plus-one" onClick={handlePlusClick} />
      </div>
      <div className="radar-ring-legend">
        {phases.map(phase => (
          <RingPhase
            key={phase}
            name={phase}
            ring={props.ring}
            technologies={props.technologies}
          />
        ))}
      </div>
    </li>
  );
}

function mapStateToPropsFactory(initialState: ReduxState, ownProps: OwnProps) {
  return ({ AppReducer: state }: ReduxState): ReduxProps => {
    const technologies: Technology[] = [],
      stateTechnologies: Technology[] = Object.values(state.technologies);

    for (let i = 0; i < stateTechnologies.length; i++) {
      const tech = stateTechnologies[i];

      if (tech.ring.name === ownProps.ring.name) {
        tech.index = i;
        technologies.push(tech);
      }
    }
    return { technologies };
  };
}

export default connect<ReduxProps, DispatchProps, OwnProps, ReduxState>(
  mapStateToPropsFactory
)(MenuItem);
