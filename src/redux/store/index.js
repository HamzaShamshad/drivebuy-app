



import { applyMiddleware, createStore, combineReducers  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import {reducerTag} from '../reducers/index';
import {cartReducer} from "../reducers/cart"
import { user } from '../reducers/userDetail';
const rootReducer = combineReducers({
    tags: reducerTag,
    carts: cartReducer,
    user
});


const loggerMiddleware = createLogger()

const configureStore = () => {
    return createStore(rootReducer , applyMiddleware(thunkMiddleware , loggerMiddleware)); 
};

export default configureStore;




