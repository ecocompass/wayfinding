import { FEEDBACKMODAL, SAVEDLOCATIONMODAL } from ".";


export const ToggleLocationModal = (options:any) => {
    return {
        type: SAVEDLOCATIONMODAL,
        payload: options,
    };
};

export const ToggleFeedbackModal = (options:any) => {
    return {
        type: FEEDBACKMODAL,
        payload: options,
    };
};

export const ToggleAwardModal = (options:any) => {
    return {
        type: FEEDBACKMODAL,
        payload: options,
    };
};