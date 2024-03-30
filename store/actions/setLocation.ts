
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
    UPDATEPATHVIEWED,
    RESETPATHS,
    VIEWUSERDIRECTION
} from '.';

export const setUserLocation = (location: any) => {
    return {
        type: UPDATEUSERLOCATION,
        payload: location,
    };
};

export const updateUserDirectionView = () => {
    return {
        type: VIEWUSERDIRECTION,
    }
}

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

export const updateViewedPath = (pathId) => {
    return {
        type: UPDATEPATHVIEWED,
        payload: pathId
    }
}

export const resetPaths = () => {
    return {
        type: RESETPATHS,
    }
}
