import React, { useState } from 'react';
import ChevronDown from 'react-feather/dist/icons/chevron-down';
import './_select.scss';

interface Props {
  value: string;
  placeholder: string;
  options: string[];
  label: string;
  updateValue(value: string): void;
}

function Select(props: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpenState(newIsOpen: boolean) {
    return () => {
      setIsOpen(newIsOpen);
    };
  }

  function handleSelect(event: React.MouseEvent<HTMLLIElement>): void {
    event.preventDefault();
    props.updateValue(event.currentTarget.title);
    toggleOpenState(false)();
  }

  const transitionClass = isOpen ? '-open' : '';

  return (
    <div className="dropdown-select">
      <span className="custom-dropdown">
        <span onClick={toggleOpenState(!isOpen)} className={transitionClass}>
          <ChevronDown className="icon right" />
          <input
            className="chosen-value"
            type="text"
            value={props.value}
            placeholder={props.placeholder}
            readOnly={true}
            aria-label={props.label}
            tabIndex={0}
            onBlur={toggleOpenState(false)}
            onKeyDown={toggleOpenState(!isOpen)}
          />
        </span>
        <ul
          className={`value-list ${transitionClass}`}
          onFocus={toggleOpenState(true)}
        >
          {props.options.map(option => (
            <li key={option} onClick={handleSelect} title={option} tabIndex={0}>
              {option}
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
}

export default Select;
