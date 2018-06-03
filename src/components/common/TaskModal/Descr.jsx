import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';


const propTypes = {
  task: PropTypes.shape(),
  onDescrEdit: PropTypes.func.isRequired,
  stories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const Descr = ({ task, onDescrEdit, stories }) => {
  let inputDescr = null;
  let inputDeadline = null;
  let inputAuthor = null;
  let inputAssignee = null;
  let inputStory = null;

  const editDescr = () => {
    onDescrEdit(
      inputDescr.value,
      inputDeadline.value,
      inputAuthor.value,
      inputAssignee.value,
      inputStory.value,
    );
  };

  return (
    <section className="b-descr">
      <h2 className="b-descr__header">Description:</h2>
      <textarea
        className="b-descr__textarea"
        defaultValue={task.descr}
        placeholder="The description of a task should be here..."
        onBlur={editDescr}
        ref={(x) => { inputDescr = x; }}
      />
      <ul className="b-descr__info">
        <li className="b-descr__info-item">
          <p className="b-descr__info-title">Deadline:</p>
          <select
            className="b-descr__info-dropdown"
            onChange={editDescr}
            ref={(x) => { inputDeadline = x; }}
          >
            <option>{task.deadline}</option>
          </select>
        </li>
        <li className="b-descr__info-item">
          <p className="b-descr__info-title">Author:</p>
          <select
            className="b-descr__info-dropdown"
            onChange={editDescr}
            ref={(x) => { inputAuthor = x; }}
          >
            <option>{task.author}</option>
            <option>Shizzle</option>
            <option>Manizzle</option>
            <option>Dizzle</option>
          </select>
        </li>
        <li className="b-descr__info-item">
          <p className="b-descr__info-title">Assignee:</p>
          <select
            className="b-descr__info-dropdown"
            onChange={editDescr}
            ref={(x) => { inputAssignee = x; }}
          >
            <option>{task.assignee}</option>
            <option>Shizzle</option>
            <option>Manizzle</option>
            <option>Dizzle</option>
          </select>
        </li>
        <li className="b-descr__info-item">
          <p className="b-descr__info-title">Story:</p>
          <select
            className="b-descr__info-dropdown"
            onChange={editDescr}
            ref={(x) => { inputStory = x; }}
          >
            {map(stories, story =>
              (<option
                key={story.id}
                value={story.id}
              >{story.descr}</option>),
            )}
          </select>
        </li>
      </ul>
    </section>
  );
};


Descr.propTypes = propTypes;

Descr.defaultProps = {
  task: {},
  stories: [],
};

export default Descr;
