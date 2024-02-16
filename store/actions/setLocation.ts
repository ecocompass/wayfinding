import { UPDATEUSERLOCATION } from "."

export const setLocation = (location) => {
    return {
        type: UPDATEUSERLOCATION,
        payload: location,
    };
};
