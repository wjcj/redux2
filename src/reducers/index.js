// counter.js
export function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
};

// todos.js
export function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
};


export function nextCounter(state = 1, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state - 1
    case 'DECREMENT':
      return state + 1
    default:
      return state
  }
};