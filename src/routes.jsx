/**
 * Created by Zerk on 18-Aug-17.
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ProjectPage from '@/containers/views/ProjectPage';
import ChatPage from '@/containers/views/ChatPage';
import BacklogPage from '@/components/BacklogPage';
import BoardPage from '@/components/BoardPage';
import CalendarPage from '@/containers/views/CalendarPage';
import RetroPage from '@/containers/views/RetroPage';

export default (
  <Switch>
    <Route exact path="/" component={ProjectPage} />
    <Route exact path="/chat" component={ChatPage} />
    <Route exact path="/backlog" component={BacklogPage} />
    <Route exact path="/calendar" component={CalendarPage} />
    <Route exact path="/board" component={BoardPage} />
    <Route exact path="/retro" component={RetroPage} />
    <Route render={() => <h1>PAGE NOT FOUND!</h1>} />
  </Switch>
);

