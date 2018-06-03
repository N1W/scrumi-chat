/**
 * Created by Zerk on 27-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import filter from 'lodash/filter';
import flow from 'lodash/fp/flow';
import filterFP from 'lodash/fp/filter';
import flatten from 'lodash/fp/flatten';
import StoryCard from '@/components/common/StoryCard';
import './styles.scss';

const propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Stories = ({ stories, tasks }) => {
  const getTasks = idList => filter(tasks, task => idList.includes(task.id));

  return (
    <section className="b-board__stories b-board__col">
      <h2 className="b-board__col-header">Истории</h2>
      <div className="b-board__col-body">
        {map(stories, story => (
          <StoryCard
            key={story.id}
            story={story}
            tasks={getTasks(story.tasks)}
          />
        ))}
      </div>
    </section>
  );
};

Stories.propTypes = propTypes;


const getSprintStories = state => flow(
  filterFP(story => state.sprints.current.stories.includes(story.id)),
  flatten,
)(state.backlog.stories);

const mapStateToProps = state => ({
  stories: getSprintStories(state),
  tasks: state.backlog.tasks,
});

export default connect(mapStateToProps, null)(Stories);
