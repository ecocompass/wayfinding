import { UPDATECENTERLOCATION, UPDATEUSERLOCATION } from "."

export const setLocation = (location) => {
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
