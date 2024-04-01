/* eslint-disable prettier/prettier */
import { UPDATEUSERLOCATION, UPDATECENTERLOCATION, UPDATESEARCHSTATUS, ZOOMADJUST, SETPREFERENCE, PREF_STORE, GETWEATHER } from "../actions";
import { VIEWMODE } from "../../constants";
import { UPDATEVIEWMODE, ROUTES_STORE } from "../actions";

const initialState = {
    centerLocation: [0, 0],
    userLocation: [0, 0],
    isSearching: false,
    zoomLevel: 14,
    viewMode: VIEWMODE.search,
    routes: {},
    weather: {}
};

const locationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATEVIEWMODE:
            return { ...state, viewMode: action.payload };
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
        case PREF_STORE:
            return { ...state, pref: action.payload };
        case ROUTES_STORE:
            return { ...state, routes: action.payload };
        case GETWEATHER:
            return { ...state, weather: action.payload };
        default:
            return state;
    }
};

export default locationReducer;
