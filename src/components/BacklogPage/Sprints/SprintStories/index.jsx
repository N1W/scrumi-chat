/**
 * Created by Zerk on 24-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Story from './Story';
import './styles.scss';

const propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveFromSprint: PropTypes.func.isRequired,
};

const SprintStories = ({ stories, onRemoveFromSprint }) => (
  <ol className="b-sprint-list">
    {stories.map((story, idx) => (
      <Story
        key={story.id}
        idx={idx + 1}
        text={story.descr}
        onRemoveFromSprint={() => onRemoveFromSprint(story.id)}
      />
    ))}
  </ol>
);

SprintStories.propTypes = propTypes;

export default SprintStories;
