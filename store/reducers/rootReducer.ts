/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';
import locationReducer from './location';
import authReducer from './authReducer';
import profileReducer from './profileReducer';


const rootReducer = combineReducers({
    location: locationReducer,
    register: authReducer,
    profile: profileReducer
});

export default rootReducer;
