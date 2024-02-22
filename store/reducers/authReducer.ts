import { LOGIN, REGISTER, SESSION_OK, STORE_TOKEN} from "../actions";
const initialState = {username:'',email:'',password:''};


const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return [action.payload]
        case REGISTER:
            return [action.payload];
        case STORE_TOKEN:
            console.log('TOKEN STORED');
            return [action.payload];
        case SESSION_OK:
            console.log('Session validated',action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;
