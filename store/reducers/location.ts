/* eslint-disable prettier/prettier */
import { UPDATEUSERLOCATION, UPDATECENTERLOCATION } from "../actions";

const initialState = {
    centerLocation: [0, 0],
    userLocation: [0, 0],
};

const locationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATEUSERLOCATION:
            console.log('updated');
            return { ...state, userLocation: action.payload };
        case UPDATECENTERLOCATION:
            return { ...state, centerLocation: action.payload };
        default:
            return initialState;
    }
};

export default locationReducer;
