import React, { Component } from 'react';
import './reset.css';
import './App.css';
import AppLaylout from './common/app-laylout';
import Example from './components/detail';
import {HashRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
          <Route path='/' component={AppLaylout}></Route>
          <Route path='detail/:id' component={Example}></Route>
        </Router>
    );
  }
}

export default App;
