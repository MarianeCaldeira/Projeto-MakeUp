import { combineReducers } from 'redux';
import carts from './carts/reducer';

const rootReducer = combineReducers({
    carts
})

export default rootReducer