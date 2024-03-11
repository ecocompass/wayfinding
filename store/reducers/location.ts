/* eslint-disable prettier/prettier */
import { VIEWMODE } from "../../constants";
import { UPDATEUSERLOCATION, UPDATECENTERLOCATION, UPDATESEARCHSTATUS, ZOOMADJUST, UPDATEVIEWMODE } from "../actions";

const initialState = {
    centerLocation: [0, 0],
    userLocation: [0, 0],
    isSearching: false,
    zoomLevel: 14,
    viewMode: VIEWMODE.search,
};

const locationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATEVIEWMODE:
            return { state, viewMode: action.payload };
        case UPDATEUSERLOCATION:
            return { ...state, userLocation: action.payload };
        case UPDATECENTERLOCATION:
            return { ...state, centerLocation: action.payload };
        case UPDATESEARCHSTATUS:
            return { ...state, isSearching: action.payload };
        case ZOOMADJUST:
            let zoom_delta = Math.trunc(action.payload / 100);
            let zoom = state.zoomLevel - zoom_delta;
            return { ...state, zoomLevel: zoom };
        default:
            return initialState;
    }
};

export default locationReducer;
