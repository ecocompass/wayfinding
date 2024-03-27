/* eslint-disable prettier/prettier */
import { GOAL_STORE, PREF_STORE, READPROFILE, SAVE_LOCATION_STORE } from "../actions";

const initialState = {
    savedLocations: [],
    pref: '',
    profile: '',
    goal: ''
};

const userDetailReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_LOCATION_STORE:
            return { ...state, savedLocations: action.payload };
        case PREF_STORE:
            return { ...state, pref: action.payload };
        case READPROFILE:
            return { ...state, profile: action.payload }
        case GOAL_STORE:
            return { ...state, goal: action.payload }
        default:
            return state;
    }
};

export default userDetailReducer;
