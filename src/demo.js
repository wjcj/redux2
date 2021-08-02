import React, { Component } from 'react';
import { createStore, applyMiddleware } from './redux';
import { counter, nextCounter } from './reducers';
import { logger } from './middlewares';

let store = createStore(
  counter,
  undefined,
  applyMiddleware(logger),
);

// store = store.replaceReducer(nextCounter);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState()
    };
  }
  
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({
      count: store.getState()
    }));
  }
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }
  render() {
    const { count } = this.state;
    console.log('count', count);
    return (
      <div>
        <p>计数器：{ count }</p>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+1</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-1</button>
      </div>
    );
  }
}

export default App;
