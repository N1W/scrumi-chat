/**
 * Created by Zerk on 27-Aug-17.
 */

import React from 'react';
import Stories from './Stories';
import Board from './Board';
import Retro from './Retro';
import TaskModal from '../common/TaskModal';
import './styles.scss';


const BoardPage = () => (
  <div className="b-board-view">
    <Stories />
    <Board />
    <Retro />
    <TaskModal />
  </div>
);

export default BoardPage;
