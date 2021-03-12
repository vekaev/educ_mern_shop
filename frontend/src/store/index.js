import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducer, productListReducer} from "./reducers";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer
  }
);

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
