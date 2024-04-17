import { AWARDMODAL, FEEDBACKMODAL, REROUTEMODAL, SAVEDLOCATIONMODAL } from "../actions";

const initialState = {
    savedLocationModal: false,
    feedbackModal: false,
    awardModal: false,
    rerouteModal: false,
}

export const modalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVEDLOCATIONMODAL:
            return { ...state, savedLocationModal: action.payload };
        case FEEDBACKMODAL:
            return { ...state, feedbackModal: action.payload };
        case AWARDMODAL:
            return { ...state, awardModal: action.payload };
        case REROUTEMODAL:
            return { ...state, rerouteModal: action.payload };
        default:
            return state;
    }
};
