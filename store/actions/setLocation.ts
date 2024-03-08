import { UPDATECENTERLOCATION, UPDATESEARCHSTATUS, UPDATEUSERLOCATION, ZOOMADJUST } from "."

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
