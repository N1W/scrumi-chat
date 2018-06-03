/**
 * Created by Zerk on 24-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import DraggableCard from '../DraggableCard';

const propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMove: PropTypes.func.isRequired,
};

const Stories = ({ stories, onMove, epicId }) => (
  <div className="stories">
    {map(stories, story => (
      <DraggableCard
        key={story.id}
        story={story}
        onMove={onMove}
        epicId={epicId}
      />
    ))}
  </div>
  );

Stories.propTypes = propTypes;

export default Stories;
