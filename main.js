import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";

import createSagaMiddleWare from "redux-saga";

import { helloSaga } from "./sagas";

const sagaMiddleWare = createSagaMiddleWare();

import Counter from "./Counter";
import reducer from "./reducers";

const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

sagaMiddleWare.run(helloSaga);

const action = (type) => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action("INCREMENT")}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
      onDecrement={() => action("DECREMENT")}
    />,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
