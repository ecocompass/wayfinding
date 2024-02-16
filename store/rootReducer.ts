/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';
import locationReducer from './reducers/location';


const rootReducer = combineReducers({
    location: locationReducer,
});

export default rootReducer;