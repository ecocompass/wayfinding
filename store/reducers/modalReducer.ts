/* eslint-disable prettier/prettier */

import FeedbackModal from "../../components/Modals/feedback_modal";
import { AWARDMODAL, FEEDBACKMODAL, SAVEDLOCATIONMODAL } from "../actions";


const initialState = {
    savedLocationModal: false,
    feedbackModal: false,
    awardModal:false
}

export const modalReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SAVEDLOCATIONMODAL:
            return { ...state, savedLocationModal: action.payload };
        case FEEDBACKMODAL:
            return { ...state, feedbackModal: action.payload };
        case AWARDMODAL:
            return { ...state, awardModal: action.payload };
        default:
            return state;
    }
};
