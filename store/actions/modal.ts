import { SAVEDLOCATIONMODAL } from ".";


export const ToggleLocationModal = (options) => {
    return {
        type: SAVEDLOCATIONMODAL,
        payload: options,
    };
};