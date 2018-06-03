import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import id from 'uuid';

import Card from '@/components/Retro/Card';
import AddCard from '@/components/Retro/AddCard';
import './styles.scss';

const RetroContainer = props => (
  <section>
    <div className="retro__box">
      <h2 className="retro__title">
        {props.title}
      </h2>
      <div className="retro__content">
        {props.cards.map(card => (
          <Card
            key={id()}
            text={card.text}
            isAnonymous={card.hidden}
            id={card.id}
            area={card.area}
            title={props.title}
            next={card.next}
            author={card.author}
          />
        ))}
        <AddCard
          area={props.area}
          title={props.title}
        />
      </div>
    </div>
  </section>
);

RetroContainer.propTypes = {
  area: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
};

RetroContainer.defaultProps = {
  cards: [],
};

const mapStateToProps = (state, props) => ({
  cards: state.retroCards.filter((card) => {
    if (props.area === 4) {
      return card.area === 4 || card.next;
    }
    return card.area === props.area && !card.next;
  }),
});

export default connect(mapStateToProps, null)(RetroContainer);
