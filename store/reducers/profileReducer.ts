import { READPROFILE } from "../actions";

const initialState = { username: '' };

const profileReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case READPROFILE:
            return { username: action.payload }
        default:
            return state;
    }
}
export default profileReducer