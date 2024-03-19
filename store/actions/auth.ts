import {  GET_TOKEN, LOGIN, LOGOUT, PROFILE, READPROFILE, REGISTER, SESSION_OK, TOKEN_STORE } from ".";

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

export const logoutAction = () => {
    return {
        type: LOGOUT,
    };
};

export const profileAction = () => {
    return {
        type: PROFILE,
    }
}

export const storeProfile = (profile: any) => {
    return {
        type: READPROFILE,
        payload: profile
    }
}