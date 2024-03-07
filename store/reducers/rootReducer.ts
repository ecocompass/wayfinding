/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';
import locationReducer from './location';
import authReducer from './authReducer';


const rootReducer = combineReducers({
    location: locationReducer,
    register: authReducer,
});

export default rootReducer;
