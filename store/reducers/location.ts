/* eslint-disable prettier/prettier */
import { UPDATEUSERLOCATION, UPDATECENTERLOCATION, UPDATESEARCHSTATUS, ZOOMADJUST, SETPREFERENCE, PREF_STORE, UPDATEPATHVIEWED } from "../actions";
import { VIEWMODE } from "../../constants";
import { UPDATEVIEWMODE, ROUTES_STORE } from "../actions";

const initialState = {
    centerLocation: [0, 0],
    userLocation: [0, 0],
    isSearching: false,
    zoomLevel: 14,
    viewMode: VIEWMODE.search,
    recommendedRoutes: {}
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
            return { ...state, recommendedRoutes: action.payload };
        case UPDATEPATHVIEWED:
            let updatedRoutes = state.recommendedRoutes.options.map((opt) => {
                return {
                    ...opt,
                    isViewed: (opt.pathId === action.payload) ? true : false,
                };
            });
            return {
                ...state, recommendedRoutes: { options: updatedRoutes },
            };
        default:
            return state;
    }
};

export default locationReducer;
