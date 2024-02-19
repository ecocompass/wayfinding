import { REGISTER} from "../actions";

const initialState = {username:'',email:'',password:''};


const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REGISTER:
            console.log('updated');
            return [...action.payload];

        default:
            return initialState;
    }
}

export default authReducer;
