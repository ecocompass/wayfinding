
import {
    SAVE_LOCATION,
    PREF_STORE,
    SHOWTOAST,
    HIDETOAST,
    SETPREFERENCE,
    UPDATECENTERLOCATION,
    UPDATESEARCHSTATUS,
    UPDATEUSERLOCATION,
    ZOOMADJUST,
    GETROUTES,
    UPDATEVIEWMODE,
    GET_SAVE_LOCATIONS,
} from '.';

export const setLocation = (location: any) => {
    return {
        type: UPDATEUSERLOCATION,
        payload: location,
    };
};

export const setCenter = (location: any) => {
    return {
        type: UPDATECENTERLOCATION,
        payload: location,
    };
};

export const setZoom = (zoomLevel: any) => {
    return {
        type: ZOOMADJUST,
        payload: zoomLevel,
    };
};

export const setSearchStatus = (status: any) => {
    return {
        type: UPDATESEARCHSTATUS,
        payload: status,
    };
};

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
export const updateViewMode = (mode: string) => {
    return {
        type: UPDATEVIEWMODE,
        payload: mode,
    };
};

export const getRoutes = (payload: any) => {
    return {
        type: GETROUTES,
        payload
    }
}

export const showToast = (message: any, type: string = 'info') => {
    return {
        type: SHOWTOAST,
        payload: { message, type },
    };
};

export const hideToast = () => {
    return {
        type: HIDETOAST,
    };
};
export const saveLocationAPI = (payload: any) => {
    return {
        type: SAVE_LOCATION,
        payload,
    };
};

export const getSaveLocationsAPI = () => {
    return {
        type: GET_SAVE_LOCATIONS
    }
}
