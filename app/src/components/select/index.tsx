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

  function handleOnClick(): void {
    setIsOpen(!isOpen);
  }

  function closeList(): void {
    setIsOpen(false);
  }

  function handleSelect(event: React.MouseEvent<HTMLLIElement>): void {
    props.updateValue(event.currentTarget.title);
    closeList();
  }

  return (
    <div className="dropdown-select">
      <span
        className="custom-dropdown"
        onClick={handleOnClick}
        onBlur={closeList}
      >
        <ChevronDown className="icon right" />
        <input
          className="chosen-value"
          type="text"
          value={props.value}
          placeholder={props.placeholder}
          readOnly={true}
          aria-label={props.label}
          tabIndex={0}
        />
        <ul className={`value-list ${isOpen ? '-open' : ''}`} tabIndex={0}>
          {props.options.map(option => (
            <li key={option} onClick={handleSelect} title={option}>
              {option}
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
}

export default Select;
