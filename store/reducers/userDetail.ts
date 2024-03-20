/* eslint-disable prettier/prettier */
import { UPDATESAVEDLOCATIONS } from "../actions";

const initialState = {
    savedLocations: [],
};

const userDetailReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATESAVEDLOCATIONS:
            return { ...state, savedLocations: action.payload };

        default:
            return state;
    }
};

export default userDetailReducer;
