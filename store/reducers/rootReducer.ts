/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';
import locationReducer from './location';
import authReducer from './authReducer';
import toastReducer from './toastReducer';
import userDetailReducer from './userDetail';
import { modalReducer } from './modalReducer';
import spinnerReducer from './spinnerReducer';
import weatherReducer from './weatherReducer';


const rootReducer = combineReducers({
    location: locationReducer,
    register: authReducer,
    toast: toastReducer,
    userDetails: userDetailReducer,
    modal: modalReducer,
    spinner: spinnerReducer,
    weather:weatherReducer
});

export default rootReducer;
