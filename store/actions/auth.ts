import { REGISTER } from ".";

export const register = (register:any) => {
    return {
        type: REGISTER,
        payload: register,
    };
};
