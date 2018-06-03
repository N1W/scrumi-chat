import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import ChecklistFooter from './ChecklistFooter';


const propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

const Checklist = ({ items }) => (
  <section className="b-checklist">
    <header className="b-checklist__header">
      <h2 className="b-checklist__title">Checklist:</h2>
      <p className="b-checklist__counter">
        0
        <span className="b-checklist__done">(0)</span>
      </p>
    </header>
    <ul className="b-checklist__list">
      {map(items, i => (
        <li key={i.descr} type="checkbox" className="b-checklist__item">
          <input type="checkbox" className="b-checklist__check" />
          <p className="b-checklist__text">{i.descr}</p>
          <button type="button" className="b-checklist__btn-del" />
        </li>),
      )}
    </ul>
    <ChecklistFooter />

    {/*<footer className="b-checklist__footer">*/}
    {/*<button type="button" className="b-add-item__btn">+</button>*/}
    {/*<input type="text" className="b-add-item__input" />*/}
    {/*</footer>*/}

    {/* <ul className="b-checklist__list"> */}
    {/* <li className="b-checklist__item"> */}
    {/* <input type="checkbox" className="b-checklist__check" /> */}
    {/* <p className="b-checklist__text" /> */}
    {/* <button type="button" className="b-checklist__btn-del">x</button> */}
    {/* </li> */}
    {/* </ul> */}
    {/* <footer className="b-checklist__footer"> */}
    {/* <div className="b-add-item"> */}
    {/* <button type="button" className="b-add-item__btn">+</button> */}
    {/* <input type="text" className="b-add-item__input" /> */}
    {/* </div> */}
    {/* </footer> */}
  </section>
);

Checklist.propTypes = propTypes;
Checklist.defaultProps = {
  items: [],
};

export default Checklist;
