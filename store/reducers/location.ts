/* eslint-disable prettier/prettier */
import { UPDATEUSERLOCATION } from "../actions";

const initialState = [0, 0]


const locationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATEUSERLOCATION:
            console.log('updated');
            return [...action.payload];

        default:
            return initialState;
    }
}

export default locationReducer;
