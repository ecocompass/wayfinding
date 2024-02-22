import { LOGIN, REGISTER, SESSION_OK, STORE_TOKEN } from ".";

export const loginAction = (login: any) => {
    return {
        type: LOGIN,
        payload: login,
    };
};

export const registerAction = (register: any) => {
    return {
        type: REGISTER,
        payload: register,
    };
};

export const storeToken = (result: any) => {
    return {
        type: STORE_TOKEN,
        payload: result,
    };
};

export const sessionOK = (bool: any) => {
    return {
        type: SESSION_OK,
        payload: bool
    }
}