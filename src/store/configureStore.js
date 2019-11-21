// Factory funtion that returns a store
// Factory funtion, so could pass arguments to it... to dynamically configure the way we set up the store
import { applyMiddleware, createStore, combineReducers /*heplfull for more reducers*/ } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
// importing all reducers as many as we can have , in our case its one
import placesReducer from './reducers/places';

const rootReducer = combineReducers({
    places: placesReducer
});

//const middlewares = [thunk];
const loggerMiddleware = createLogger()

const configureStore = () => {
    return createStore(rootReducer , applyMiddleware(thunkMiddleware , loggerMiddleware)); // createStore accepts onr reducer that can be combine reducers
};

export default configureStore;