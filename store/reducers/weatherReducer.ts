import { GETWEATHER, SETWEATHER } from "../actions";
const initialState = {
    result: {
        weather: [{
            icon: '10d'
        }
        ],
        main: {
            temp: 0
        }
    }
};


const weatherReducer = (state = initialState, action: any) => {
    switch (action.type) {

        case SETWEATHER:
            return [action.payload];
        case GETWEATHER:
            return { ...state, result: action.payload }
        default:
            return state;
    }
}

export default weatherReducer;
