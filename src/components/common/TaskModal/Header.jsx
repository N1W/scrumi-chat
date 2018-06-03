import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string,
  closeTaskModal: PropTypes.func.isRequired,
  priority: PropTypes.string,
  points: PropTypes.string,
  onEditHeader: PropTypes.func.isRequired,
};

const defaultProps = {
  name: '',
  priority: '0',
  points: '0',
};

const Header = ({ name, closeTaskModal, onEditHeader, points, priority }) => {
  let nameRef = null;
  let pointsRef = null;
  let priorityRef = null;
  const editName = () => {
    onEditHeader(nameRef.value, pointsRef.value, priorityRef.value);
  };

  return (
    <header className="b-task-modal__header">
      <input
        type="text"
        className="b-task-modal__inpt"
        defaultValue={name}
        onBlur={editName}
        ref={(x) => { nameRef = x; }}
      />
      <input
        type="text"
        className="b-task-modal__points"
        placeholder="Points: "
        defaultValue={points}
        onBlur={editName}
        ref={(x) => { pointsRef = x; }}
      />
      {/* <input */}
      {/* type="text" */}
      {/* className="b-color-picker" */}
      {/* defaultValue={priority} */}
      {/* onBlur={editName} */}
      {/* ref={(x) => { priorityRef = x; }} */}
      {/* /> */}
      <input
        type="color"
        className="b-color-picker"
        value="#ffffff"
        onChange={editName}
        ref={(x) => { priorityRef = x; }}
      />
      <button
        type="button"
        className="b-task-modal__btn-close"
        onClick={closeTaskModal}
      >x</button>
    </header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
