import { GETWEATHER,  SETWEATHER } from "../actions";
const initialState = { lat:0,lon:0,result:{}};


const weatherReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case SETWEATHER:
            return [action.payload];
        case GETWEATHER:
            return {...state,result:action.payload}    
        default:
            return state;
    }
}

export default weatherReducer;
