import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  editModal: PropTypes.string,
};

const ModalFooter = ({ onSave, onCancel, onDelete, editModal }) => (
  <footer className="b-story-modal__footer">
    {editModal && <button className="b-story-modal__btn-del" onClick={onDelete} />}
    <button className="b-story-modal__btn button-red" onClick={onCancel} >Отмена</button>
    <button className="b-story-modal__btn button-green" onClick={onSave} >Сохранить</button>
  </footer>
  );

ModalFooter.propTypes = propTypes;

ModalFooter.defaultProps = {
  editModal: '',
};

export default ModalFooter;
