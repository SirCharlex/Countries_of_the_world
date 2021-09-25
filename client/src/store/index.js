import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers/index.js'
import thunk from "redux-thunk";    
import {composeWithDevTools}from 'redux-devtools-extension'

 //sale error hasta configurar los reducers
 //esto es para que redux tools en chrome funcione.
 // + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;
