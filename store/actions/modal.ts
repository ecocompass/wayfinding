import { AWARDMODAL, FEEDBACKMODAL, INCIDENTMODAL, REROUTEMODAL, SAVEDLOCATIONMODAL } from ".";


export const ToggleLocationModal = (options: any) => {
    return {
        type: SAVEDLOCATIONMODAL,
        payload: options,
    };
};

export const ToggleRerouteModal = (options: any) => {
    return {
        type: REROUTEMODAL,
        payload: options,
    };
};

export const ToggleFeedbackModal = (options: any) => {
    return {
        type: FEEDBACKMODAL,
        payload: options,
    };
};

export const ToggleIncidentModal = (options: any) => {
    return {
        type: INCIDENTMODAL,
        payload: options
    }
}

export const ToggleAwardModal = (options: any) => {
    return {
        type: AWARDMODAL,
        payload: options,
    };
};
