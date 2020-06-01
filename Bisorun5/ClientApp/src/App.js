import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import { Home } from './components/Home';

import { Answer } from './components/Answer';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { QuestionEdit } from './components/QuestionEdit';


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

   


  render () {
      return (
          <Switch>
        <Route exact path='/' component={Home} />
       
        <Route path='/soru/:id' component={Answer} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/questionedit' component={QuestionEdit} />
          </Switch>
           
     
    );
  }
}
