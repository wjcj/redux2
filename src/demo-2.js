import React, { Component } from 'react';
import {
  createStore,
  combineReducers,
  // applyMiddleware,
} from './redux';
import { counter, todos } from './reducers';
import {
  // logger,
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
  // applyMiddleware(logger, middleware1, middleware2),
);

const next = store.dispatch;

let dispatch = next;
const mAPI = {
  getState: store.getState,
  dispatch: (action, ...args) => dispatch(action, ...args)
}
const chain = [middleware1, middleware2].map(m => m(mAPI)); // [m1, m2]

// 实现：store.dispatch = m1(m2(next))
chain.reverse().forEach(m => {
  dispatch = m(dispatch);
});

store.dispatch = dispatch;

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
    const { count, todoList } = this.state;
    return (
      <div className="App">
        <div>
          <p>计数器：{ count }</p>
          <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+1</button>
          <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-1</button>
        </div>
        <div>
          <p>Todo List</p>
          <input ref={this.inputRef} type="text" placeholder="请输入待办项"/>
          <button onClick={this.addTodo}>添加</button>
          <ul>
            {
              todoList.map((todo, index) => <li key={index}>{todo}</li>)
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
