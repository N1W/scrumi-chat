/**
 *  * Created by Zerk on 19-Aug-17.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

import Icon from '@/components/common/Icon';
import Counter from '@/components/common/Counter';

import iconProject from '../img/Project.svg';
import iconChat from '../img/Chat.svg';
import iconBacklog from '../img/Backlog.svg';
import iconBoard from '../img/Board.svg';
import iconCalendar from '../img/Calendar.svg';

import './styles.scss';

// function importAllImages(r) {
//   const images = {};
//
//   r.keys().forEach((item) => {
//     images[item.match(/[a-z]+/i)] = r(item);
//   });
//
//   return images;
// }
//
// const images = importAllImages(
//   require.context('../img', false, /\.(png|jpe?g|svg)$/),
// );
//
// console.log(images);

// Object.keys(images).forEach((image) => {
// }

const items = [
  // {
  //   link: '/',
  //   text: 'Project',
  //   image: iconProject,
  // },
  {
    link: '/chat',
    text: 'Чат',
    image: iconChat,
  },
  {
    link: '/backlog',
    text: 'Истории',
    image: iconBacklog,
  },
  {
    link: '/board',
    text: 'Задачи',
    image: iconBoard,
  },
  {
    link: '/calendar',
    text: 'Календарь',
    image: iconCalendar,
  },
  // {
  //   link: '/retro',
  //   text: 'Retro',
  //   image: iconProject,
  // },
];

const Navigation = () => (
  <nav className="menu-container">
    <ul className="menu">
      {items.map(item => (
        <li key={item.text}>
          <NavLink
            exact
            activeClassName="menu__link--active"
            className="menu__link"
            to={item.link}
          >
            <div className="menu__icon">
              <Icon
                className="menu__icon--img"
                imageLink={item.image}
                alt="Project"
              />
              {false &&
                <Counter />}
            </div>
            <p className="menu__title">{item.text}</p>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;

