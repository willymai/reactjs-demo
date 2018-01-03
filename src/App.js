import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Router from './routes';
import { ConnectedRouter } from 'react-router-redux';

class App extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
