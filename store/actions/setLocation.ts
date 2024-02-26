import { UPDATECENTERLOCATION, UPDATESEARCHSTATUS, UPDATEUSERLOCATION } from "."

export const setLocation = (location:any) => {
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

export const setSearchStatus = (status) => {
    return {
        type: UPDATESEARCHSTATUS,
        payload: status
    }
}
