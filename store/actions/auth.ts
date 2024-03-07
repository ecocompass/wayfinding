import { GET_TOKEN, LOGIN, REGISTER, SESSION_OK, STORE_TOKEN, TOKEN_STORE } from ".";

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

export const getToken = () => {
    return {
        type: GET_TOKEN,
    };
};

export const storeToken = (token: any) => {
    return {
        type: STORE_TOKEN,
        payload: token,
    };
};

export const tokenStore = (token: string) => {
    return {
        type: TOKEN_STORE,
        payload: token
    }
}

export const sessionOK = (bool: any) => {
    return {
        type: SESSION_OK,
        payload: bool,
    };
};

export const logoutAction = (token: any) => {
    return {
        type: logoutAction,
        payload: token,
    };
};
