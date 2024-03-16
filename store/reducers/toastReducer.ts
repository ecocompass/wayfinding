import { HIDETOAST, SHOWTOAST } from "../actions";

const initialState = {
    toastMessage: '',
    show: false,
  };
  
  const toastReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case SHOWTOAST:
        return {
          toastMessage: action.payload,
          show: true,
        };
        case HIDETOAST:
            return {
                toastMessage:'',
                show:false
            };
      default:
        return state;
    }
  };

export default toastReducer