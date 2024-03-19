import { READPROFILE } from "../actions";

const initialState = { username: '' };

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case READPROFILE:
            return {...state, payload: action.payload }
        default:
            return state;
    }
}
export default profileReducer