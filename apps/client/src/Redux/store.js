import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducer from './reducer/reducer';

// Conecto con la extensión del navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    // Para hacer peticiones a un servidor:
    composeEnhancer(applyMiddleware(thunk))
)

export default store;