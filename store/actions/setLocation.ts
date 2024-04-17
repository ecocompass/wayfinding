
import {
    SAVE_LOCATION,
    SHOWTOAST,
    HIDETOAST,
    UPDATECENTERLOCATION,
    UPDATESEARCHSTATUS,
    UPDATEUSERLOCATION,
    ZOOMADJUST,
    GETROUTES,
    UPDATEVIEWMODE,
    GET_SAVE_LOCATIONS,
    SETWEATHER,
    GETWEATHER,
    UPDATEPATHVIEWED,
    RESETPATHS,
    VIEWUSERDIRECTION,
    UPDATETRIPSTART,
    SAVETRIP,
    SETOFFLINE,
    GETOFFLINE,
    SAVEOFFLINE,
    SETTRIPHISTORY,
    GETTRIPHISTORY,
    SETAWARDS,
    SETFEEDBACK,
    PINGCURRENTTRAFFIC,
    REPORTINCIDENT
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

export const saveTripAPI = (payload: any) => {
    return {
        type: SAVETRIP,
        payload
    }
}

export const getSaveLocationsAPI = () => {
    return {
        type: GET_SAVE_LOCATIONS
    }
}

export const pingCurrentTraficAPI = (id: string) => {
    return {
        type: PINGCURRENTTRAFFIC,
        payload: {
            recommendationId: id
        }
    }
}


export const reportIncidentAPI = (data: any) => {
    return {
        type: REPORTINCIDENT,
        payload: data
    }
}


export const updateViewedPath = (pathId: any) => {
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

export const updateTripDetails = (payload: any) => {
    return {
        type: UPDATETRIPSTART,
        payload,
    }
}
export const setWeather = (location: any) => {
    return {
        type: SETWEATHER,
        payload: location
    }
}

export const getWeather = (payload: any) => {
    return {
        type: GETWEATHER,
        payload: payload
    }
}

export const setOffline = (payload: any) => {
    return {
        type: SETOFFLINE,
        payload: payload
    }
}

export const getOffline = () => {
    return {
        type: GETOFFLINE,

    }
}

export const saveOffline = (payload: string) => {
    return {
        type: SAVEOFFLINE,
        payload: payload
    }
}
export const setTrips = () => {
    return {
        type: SETTRIPHISTORY
    };
};

export const getTrips = (payload: any) => {
    return {
        type: GETTRIPHISTORY,
        payload
    };
};
export const setAwards = (payload: any) => {
    return {
        type: SETAWARDS,
        payload: payload
    }
}
export const setFeedback = (payload: any) => {
    return {
        type: SETFEEDBACK,
        payload: payload
    }
}
