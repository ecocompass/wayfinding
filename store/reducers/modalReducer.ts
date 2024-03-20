/* eslint-disable prettier/prettier */

import { SAVEDLOCATIONMODAL } from "../actions";


const initialState = {
    savedLocationModal: false,
}

export const modalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVEDLOCATIONMODAL:
            return { ...state, savedLocationModal: action.payload };
        default:
            return state;
    }
};
