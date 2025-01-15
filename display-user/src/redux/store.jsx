import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { reducer } from "./reducer";

const middleware = applyMiddleware(thunk);

export const store = createStore(reducer, middleware);
