import React from 'react';
import './App.css';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './pages/login/login';
import Admin from './pages/admin/admin';




function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/' component={Admin} />
      </Switch>
    </Router>
  );
}

export default hot(App);


