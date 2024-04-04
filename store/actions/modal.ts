import { SAVEDLOCATIONMODAL } from ".";


export const ToggleLocationModal = (options:any) => {
    return {
        type: SAVEDLOCATIONMODAL,
        payload: options,
    };
};