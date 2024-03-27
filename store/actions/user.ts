import { SETPREFERENCE, PREF_STORE, PROFILE, READPROFILE, SETGOALS, GOAL_STORE, READGOALS } from ".";

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

export const goalAction = (goal: any) => {
    return {
        type: SETGOALS,
        payload: goal,
    };
};

export const goalStore = (goal: string) => {
    return {
        type: GOAL_STORE,
        payload: goal,
    };
};

export const readGoalAction = () => {
    return {
        type: READGOALS,
    }
}