
const ACTION_TYPE_INIT = `@@redux/INIT${Math.random()}`;
const ACTION_TYPE_REPLACE = `@@redux/REPLACE${Math.random()}`;

function createStore(reducer, preloadedState, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState)
  }

  let currentReducer = reducer;
  const listeners = [];
  let state = preloadedState;

  const getState = () => state;

  const subscribe = listener => {
    listeners.push(listener);
    const unsubscribe = () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
    return unsubscribe;
  }

  const dispatch = action => {
    // console.log('原始的 dispatch 开始工作了')
    state = currentReducer(state, action);
    listeners.forEach(listener => listener());
    // console.log('原始的 dispatch 结束工作了')
  };

  function replaceReducer(nextReducer) {
    currentReducer = nextReducer;
    dispatch({ type: ACTION_TYPE_REPLACE } ); // 重新初始化 state
    return store;
  }

  dispatch({ type: ACTION_TYPE_INIT });

  const store = { dispatch, subscribe, getState, replaceReducer };
  return store;
};

export default createStore;