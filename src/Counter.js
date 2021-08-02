import React, { Component } from 'react';
import {
  createStore,
  combineReducers,
  applyMiddleware,
} from './redux';
import { counter, todos } from './reducers';
import {
  logger,
  middleware1,
  middleware2
} from './middlewares';

const reducers = combineReducers({
  count: counter,
  todoList: todos,
});
const store = createStore(
  reducers,
  {},
  applyMiddleware(logger, middleware1, middleware2),
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.inputRef = React.createRef();
  }
  
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState));
  }
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }
  addTodo = () => {
    const { value } = this.inputRef.current;
    value && store.dispatch({ type: 'ADD_TODO', text: value });
  }
  render() {
    const { count } = this.state;
    return (
      <div className="App">
        <div>
          <p>计数器：{ count }</p>
          <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+1</button>
          <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-1</button>
        </div>
      </div>
    );
  }
}

export default App;
