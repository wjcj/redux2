export function logger({ getState }) {

  return next => action => {

    console.log('will dispatch', action);

    const returnValue = next(action);

    console.log('state after dispatch', getState());
    
    return returnValue;
  };
}

export const middleware2 = store => next => action => {
  console.log('Middleware 2号增强的 dispatch 开始工作了');
  const returnValue = next(action);
  console.log('Middleware 2号增强的 dispatch 结束工作了');
  return returnValue;
}

export const middleware1 = store => next => action => {
  console.log('Middleware 1号增强的 dispatch 开始工作了');
  const returnValue = next(action);
  console.log('Middleware 1号增强的 dispatch 结束工作了');
  return returnValue;
}
