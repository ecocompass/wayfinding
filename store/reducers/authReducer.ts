import { GET_TOKEN, LOGIN, REGISTER, SESSION_OK, TOKEN_STORE } from "../actions";
const initialState = { username: '', email: '', password: '', token: '' };


const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TOKEN_STORE:
            return { ...initialState, token: action.payload };
        case LOGIN:
            return [action.payload]
        case REGISTER:
            return [action.payload];
        case SESSION_OK:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;
