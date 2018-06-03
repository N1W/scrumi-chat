/**
 * Created by Zerk on 30-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const propTypes = {
  sprint: PropTypes.shape().isRequired,
  active: PropTypes.bool,
  onDelete: PropTypes.func,
};

const defaultProps = {
  active: false,
  onDelete: () => {},
};

const buttonStyles = {
  marginLeft: '0.5rem',
  height: '0.875rem',
  width: '0.875rem',
  backgroundImage: 'url(img/cross.svg)',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'transparent',
  backgroundSize: 'contain',
};

const iconStyles = {
  display: 'block',
  marginRight: '0.5rem',
  height: '0.625rem',
  width: '0.625rem',
  borderRadius: '50%',
};

const Sprint = ({ sprint, active, onDelete }) => (
  <div className="b-sprint-start__header sprint">
    <i style={{ ...iconStyles, backgroundColor: active ? 'green' : 'red' }} />
    <p className="b-sprint-start__label">
      Sprint tasks done
      <span className="b-sprint-start__checked">{0}</span>
      The sprint will {active
      ? `finish on ${moment(moment(sprint.events.finish, 'x')).format('DD.MM.YYYY')}`
      : `start on ${moment(moment(sprint.events.finish, 'x')).format('DD.MM.YYYY')}`}
    </p>
    <button style={buttonStyles} onClick={onDelete} />
  </div>
);


Sprint.propTypes = propTypes;
Sprint.defaultProps = defaultProps;

export default Sprint;
