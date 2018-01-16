import {createStore, combineReducers} from 'redux';
import cartReducer  from '../reducers/index';

const rootReducer = combineReducers(
    {cartReducer}
)

export default createStore(rootReducer);