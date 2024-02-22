import { UPDATEUSERLOCATION } from "."

export const setLocation = (location:any) => {
    return {
        type: UPDATEUSERLOCATION,
        payload: location,
    };
};
