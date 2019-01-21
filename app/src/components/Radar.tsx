import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as radar from '../models/Radar';
import { getRingFactory, RingName } from '../models/Rings';
import Technology from '../models/Technology';
import { AppAction } from '../reducers/App';
import { getTechStyle } from './Technology';

function allowDrop(event: React.DragEvent) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

function onDrag(event: React.DragEvent<HTMLElement>): void {
  const data = { id: event.currentTarget.id, name: event.currentTarget.title };
  const element = document.getElementById(data.id)!;
  event.dataTransfer.setData('text', JSON.stringify(data));
  event.dataTransfer.setDragImage(element, 20, 20);
  event.dataTransfer.dropEffect = 'move';
}

interface ReduxProps {
  technologies: Technology[];
}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = ReduxProps & DispatchProps;

function Radar(props: Props): JSX.Element {
  async function hydrateStore() {
    try {
      const response = await fetch('/technologies.json');
      const technologies = await response.json();
      props.dispatch({
        type: AppAction.HYDRATE_STORE,
        payload: technologies
      });
    } catch (error) {
      console.log("Failed to hydrate store", error); // tslint:disable-line
    }
  }

  useEffect(radar.paintRadar, []);
  useEffect(() => {
    hydrateStore();
  },        []);

  function captureDrop(event: React.DragEvent): void {
    event.preventDefault();

    const canvas = radar.getCanvas(),
      boundingRectangle = canvas.getBoundingClientRect(),
      canvasX = event.clientX - boundingRectangle.left,
      canvasY = event.clientY - boundingRectangle.top;

    const data = JSON.parse(event.dataTransfer.getData('text'));
    const element = document.getElementById(data.id)!;
    element.style.left = `${canvasX}px`;
    element.style.top = `${canvasY}px`;

    const ring = getRingFactory(canvasX, canvasY);
    const phase = radar.findRingPhase(canvasX, canvasY);
    const technology = new Technology('' + data.name, ring, phase);
    technology.setPointInRing(canvasX, canvasY);
    props.dispatch({ type: AppAction.UPDATE_TECHNOLOGY, payload: technology });
  }

  return (
    <div className="radar-container">
      <h2 className="top left">{RingName.BUILD}</h2>
      <h2 className="top right">{RingName.DEVELOP}</h2>
      <h2 className="bottom left">{RingName.DEPLOY}</h2>
      <h2 className="bottom right">{RingName.OPERATE}</h2>
      <canvas id="tech-radar" onDragOver={allowDrop} onDrop={captureDrop} />
      {props.technologies.map((tech, index) => {
        const style = getTechStyle(tech.ring);
        const radarElement: React.CSSProperties = {
          ...style,
          position: 'absolute',
          top: `${tech.canvasPosition.top}px`,
          left: `${tech.canvasPosition.left}px`
        };
        return (
          <div className="technology" key={index}>
            <div
              id={`tech-${index}`}
              title={tech.name}
              className={tech.ring.shape}
              style={radarElement}
              draggable={true}
              onDragStart={onDrag}
            >
              <p>{index}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function mapStateToProps({ AppReducer: state }: ReduxState): ReduxProps {
  console.log("Technologies JSON", JSON.stringify(state.technologies)); // tslint:disable-line
  return {
    technologies: Object.values(state.technologies)
  };
}

export default connect(mapStateToProps)(Radar);
