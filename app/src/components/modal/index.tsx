import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppAction } from '../../reducers/App';
import Select from '../select';
import PhaseType, { phases } from '../../models/Phase';
import Technology from '../../models/Technology';
import './_modal.scss';

const ringNames = Object.values(PhaseType);

interface ReduxProps {
  isOpen: boolean;
  activeRing: Ring;
}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = ReduxProps & DispatchProps;

function Modal(props: Props): JSX.Element {
  const [name, setName] = useState('');
  const [phase, setPhase] = useState('');

  function closeModal(): void {
    cancelAction();
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setName(event.target.value);
  }

  function handleDialogClick(event: React.MouseEvent): void {
    event.stopPropagation();
  }

  function cancelAction(): void {
    setName('');
    setPhase('');
    props.dispatch({ type: AppAction.TOGGLE_MODAL_STATE });
  }

  function confirmAction(): void {
    const techPhase = phases.find(({ type }) => type === phase)!;
    const technology = new Technology(name, props.activeRing, techPhase);
    technology.setInitialPointInRing();
    props.dispatch({ type: AppAction.ADD_TECHNOLOGY, payload: technology });
    cancelAction();
  }

  const invalid = !phase || !name;

  return (
    <div
      className={`modal-window ${props.isOpen ? '-open' : ''}`}
      onClick={closeModal}
    >
      <div className="modal-dialog" onClick={handleDialogClick}>
        <a href="#" title="Close" className="modal-close" onClick={closeModal}>
          Close
        </a>
        <h1>Add a new Technology</h1>
        <div>
          Please enter a name and select a phase to place the technology into.
        </div>
        <div className="text-input">
          <input
            className="text-input"
            type="text"
            value={name}
            name="technologyName"
            placeholder="Technology Name"
            onChange={handleNameChange}
            aria-label="Technology Name"
            tabIndex={0}
          />
        </div>
        <Select
          value={phase}
          placeholder="Select Phase"
          options={ringNames}
          updateValue={setPhase}
          label="Technology Phase"
        />
        <div className="modal-actions">
          <a href="#" title="Cancel" onClick={cancelAction}>
            cancel
          </a>
          <a
            href="#"
            className={invalid ? '-disabled' : ''}
            title="OK"
            onClick={confirmAction}
          >
            OK
          </a>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ AppReducer: state }: ReduxState): ReduxProps {
  return {
    isOpen: state.isModalOpen,
    activeRing: state.activeRing
  };
}

export default connect(mapStateToProps)(Modal);
