/* eslint-disable prettier/prettier */
import { UPDATEUSERLOCATION, UPDATECENTERLOCATION, UPDATESEARCHSTATUS } from "../actions";

const initialState = {
    centerLocation: [0, 0],
    userLocation: [0, 0],
    isSearching: false,
};

const locationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATEUSERLOCATION:
            return { ...state, userLocation: action.payload };
        case UPDATECENTERLOCATION:
            return { ...state, centerLocation: action.payload };
        case UPDATESEARCHSTATUS:
            return { ...state, isSearching: action.payload };
        default:
            return initialState;
    }
};

export default locationReducer;
