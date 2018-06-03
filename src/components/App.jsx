/**
 *  * Created by Zerk on 18-Aug-17.
 */

import React from 'react';
import routes from '@/routes';
import Masthead from '@/components/Masthead';

import '@/styles/theme.scss';

const App = () => (
  <div>
    <Masthead />
    {routes}
  </div>
);

export default App;
