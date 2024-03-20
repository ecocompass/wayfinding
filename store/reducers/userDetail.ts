/* eslint-disable prettier/prettier */
import { PREF_STORE, READPROFILE, UPDATESAVEDLOCATIONS } from "../actions";

const initialState = {
    savedLocations: [],
    pref:'',
    profile:''
};

const userDetailReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATESAVEDLOCATIONS:
            return { ...state, savedLocations: action.payload };
        case PREF_STORE:
                return { ...state, pref: action.payload };
        case READPROFILE:
                    return {...state, profile: action.payload }
        default:
            return state;
    }
};

export default userDetailReducer;
