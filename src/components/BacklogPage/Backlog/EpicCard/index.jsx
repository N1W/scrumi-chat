/* eslint-disable import/first */
import React from 'react';
import PropTypes from 'prop-types';
import Editable from './Editable';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import flatten from 'lodash/fp/flatten';
import filter from 'lodash/fp/filter';
import './styles.scss';

const propTypes = {
  epic: PropTypes.shape().isRequired,
  onDeleteEpic: PropTypes.func.isRequired,
  onEditEpic: PropTypes.func.isRequired,
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  epicIdx: PropTypes.number.isRequired,
};


const EpicCard = ({ epic, epicIdx, onDeleteEpic, onEditEpic, stories }) => {
  const activateEpicEdit = () => { onEditEpic(epic.id, true); };

  const editEpic = (value) => { onEditEpic(epic.id, false, value); };

  const countDoneStories = () => 0;

  const countTasks = () => flow(
      filter(story => epic.stories.includes(story.id)),
      map(x => x.tasks),
      flatten,
    )(stories).length;

  const countDoneTasks = () => 0;

  return (
    <div className="b-epic-card">
      <header
        className="b-epic-card__text"
        onClick={activateEpicEdit}
      >
        <Editable
          className="b-epic-card__textarea"
          value={epic.descr}
          onEdit={editEpic}
          isBeingEdited={epic.isBeingEdited}
        />
      </header>
      <footer className="b-epic-card__footer">
        <div className="b-epic-card__info">
          <p className="b-epic-card__info-item"> Истории: {epic.stories.length}
            <span className="b-epic-card__done"> ({ countDoneStories() }) </span>
          </p>
          <p className="b-epic-card__info-item"> Задачи: {countTasks()}
            <span className="b-epic-card__done"> ({countDoneTasks()}) </span>
          </p>
        </div>
        <button
          className="b-epic-card__btn"
          onClick={() => { onDeleteEpic(epic.id, epic.stories); }}
        />
      </footer>
      <span className="b-epic-card__idx">{epicIdx}</span>
    </div>
  );
};

EpicCard.propTypes = propTypes;

export default EpicCard;
