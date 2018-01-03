import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './containers/Home';
export default class CustomRouter extends Component {
  render() {
    return (
        <div>
            <Route exact path='/' component={Home}/>
        </div>
    );
  }
}