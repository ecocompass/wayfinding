import { LIST_FETCHED, REGISTER} from "../actions";
const initialState = {username:'',email:'',password:''};


const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case REGISTER:
            console.log('updated');
            return [action.payload];
        case LIST_FETCHED:
            console.log('list fetched');
            return [...action.data];
        default:
            return state;
    }
}

export default authReducer;
