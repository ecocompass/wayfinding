/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';
import locationReducer from './location';
import authReducer from './authReducer';
import userDetailReducer from './userDetail';
import { modalReducer } from './modalReducer';


const rootReducer = combineReducers({
    location: locationReducer,
    register: authReducer,
    userDetails: userDetailReducer,
    modal: modalReducer,
});

export default rootReducer;
