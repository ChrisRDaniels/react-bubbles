import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BubblePage from './components/BubblePage';
import PrivateRoute from './utils/PrivateRoute.js';

import Login from './components/Login';
import './styles.scss';

function App() {
  return (
    <Router>
      <div className='App'>
        <Route exact path='/' render={(props) => <Login {...props} />} />
        <PrivateRoute path='/protected' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
