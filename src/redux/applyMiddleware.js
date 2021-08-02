import compose from './compose';

// export default function applyMiddleware(...middlewares) {
//   return createStore => (reducer, preloadedState) => {

//       const store = createStore(reducer, preloadedState);

//       const next = store.dispatch;
//       let dispatch = next;

//       const mAPI = {
//         getState: store.getState,
//         dispatch: (action, ...args) => dispatch(action, ...args)
//       }
//       const chain = middlewares.map(m => m(mAPI));

//       // 实现：store.dispatch = m1(m2(next))
//       chain.reverse().forEach(m => {
//         dispatch = m(dispatch);
//       });

//       return {
//         ...store,
//         dispatch
//       }
//     }
// }

export default function applyMiddleware(...middlewares) {
  return createStore => (reducer, preloadedState) => {
      const store = createStore(reducer, preloadedState)
      let dispatch;

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action, ...args) => dispatch(action, ...args),
      }
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
}