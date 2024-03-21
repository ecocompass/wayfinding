/* eslint-disable prettier/prettier */
import { SAVE_LOCATION_STORE } from "../actions";

const initialState = {
    savedLocations: [],
};

const userDetailReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVE_LOCATION_STORE:
            return { ...state, savedLocations: action.payload };

        default:
            return state;
    }
};

export default userDetailReducer;
