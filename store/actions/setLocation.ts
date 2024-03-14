import { GETROUTES, SAVE_LOCATION, UPDATECENTERLOCATION, UPDATESEARCHSTATUS, UPDATEUSERLOCATION, UPDATEVIEWMODE, ZOOMADJUST } from "."

export const setLocation = (location: any) => {
    return {
        type: UPDATEUSERLOCATION,
        payload: location,
    };
};

export const setCenter = (location) => {
    return {
        type: UPDATECENTERLOCATION,
        payload: location,
    };
};

export const setZoom = (zoomLevel) => {
    return {
        type: ZOOMADJUST,
        payload: zoomLevel
    }
}

export const setSearchStatus = (status) => {
    return {
        type: UPDATESEARCHSTATUS,
        payload: status
    }
}

export const updateViewMode = (mode: string) => {
    return {
        type: UPDATEVIEWMODE,
        payload: mode
    }
}

export const getRoutes = (payload: any) => {
    return {
        type: GETROUTES,
        payload
    }
}

export const saveLocationAPI = (payload: any) => {
    return {
        type: SAVE_LOCATION,
        payload
    }
}
