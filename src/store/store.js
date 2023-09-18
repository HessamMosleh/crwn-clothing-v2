import {applyMiddleware, compose, createStore} from "redux";
import { rootReducer} from './root-reducer'
import logger from "redux-logger";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
const loggerMiddleware = (store)=>(next)=>(action)=>{
    if(!action.type)
        return next(action)

    console.log('type: ', action.type);
    console.log('payload: ', action. payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log(store.getState())
}

const persistConfig={
    key:'root',
    storage,
    whitelist:['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
console.log('env', process.env.NODE_ENV)
const middlewares = [process.env.NODE_ENV === 'development' && logger, thunk]
const composeEhancer =  //ROR REDUX DEV TOOL EXTENSION
    (process.env.NODE_ENV !== 'production' &&
window &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
compose;

const composedEnhancers = composeEhancer(applyMiddleware(...middlewares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store)