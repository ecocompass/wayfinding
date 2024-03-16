/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';
import locationReducer from './location';
import authReducer from './authReducer';
import toastReducer from './toastReducer';


const rootReducer = combineReducers({
    location: locationReducer,
    register: authReducer,
    toast:toastReducer
});

export default rootReducer;
