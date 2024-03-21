import { SETPREFERENCE, PREF_STORE, PROFILE, READPROFILE } from ".";

export const prefAction = (pref: any) => {
    return {
        type: SETPREFERENCE,
        payload: pref,
    };
};

export const prefStore = (pref: string) => {
    return {
        type: PREF_STORE,
        payload: pref,
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