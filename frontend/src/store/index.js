import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {cartReducer, productDetailsReducer, productListReducer, userLoginReducer} from "./reducers";
import {userRegisterReducer} from "./reducers/user.reducer";

const rootReducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
  }
);

const cartItemsFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage},
  userLogin: {userInfo: userInfoFromStorage}
}

export default createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
