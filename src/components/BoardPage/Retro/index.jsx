/**
 * Created by Zerk on 05-Sep-17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import RetroCard from './Card';
import './styles.scss';
import icon from './Card/img/human-pic.jpg';

const propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const Retro = ({ cards }) => (
  <section className="b-board__retro b-board__col">
    <h2 className="b-board__col-header">Улучшения</h2>
    <div className="b-board__col-body">
      {map(cards, card =>
        (<RetroCard
          key={card.id}
          text={card.text}
          alt={card.name}
          avatar={card.avatar}
        />),
      )}
    </div>
  </section>
);

Retro.propTypes = propTypes;

const mapStateToProps = state => ({
  // cards: state.retro || [],
  cards: [
    {
      name: '1',
      avatar: icon,
      id: '1',
      text: 'qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe',
    },
    {
      name: '2',
      avatar: icon,
      id: '2',
      text: 'qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe',
    },
    {
      name: '3',
      avatar: icon,
      id: '3',
      text: 'qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe qweqwew qqeqw qeqeqeqwqwe',
    },
  ],
});

export default connect(mapStateToProps, null)(Retro);

