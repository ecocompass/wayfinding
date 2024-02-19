/* eslint-disable prettier/prettier */

import { combineReducers } from 'redux';
import locationReducer from './reducers/location';
import authReducer from './reducers/authReducer';


const rootReducer = combineReducers({
    location: locationReducer,
    register:authReducer
});

export default rootReducer;