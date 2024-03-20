import { TOGGLESPINNER } from "../actions";

const initialState = {
    show: false,
};

const spinnerReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TOGGLESPINNER:
            let show = state.show
            return { ...state, show: !show }
        default:
            return state;
    }
};

export default spinnerReducer;