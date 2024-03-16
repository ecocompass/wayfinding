import { GETROUTES, HIDETOAST, SHOWTOAST, UPDATECENTERLOCATION, UPDATESEARCHSTATUS, UPDATEUSERLOCATION, UPDATEVIEWMODE, ZOOMADJUST } from "."

export const setLocation = (location: any) => {
    return {
        type: UPDATEUSERLOCATION,
        payload: location,
    };
};

export const setCenter = (location:any) => {
    return {
        type: UPDATECENTERLOCATION,
        payload: location,
    };
};

export const setZoom = (zoomLevel:any) => {
    return {
        type: ZOOMADJUST,
        payload: zoomLevel
    }
}

export const setSearchStatus = (status:any) => {
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


export const showToast= (message: any) => {
    return {
        type: SHOWTOAST,
        payload:message
    }
}

export const hideToast=()=>{
    return {
        type:HIDETOAST
    }
}