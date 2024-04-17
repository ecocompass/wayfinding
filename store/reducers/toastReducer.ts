import { HIDETOAST, SHOWTOAST } from "../actions";

const initialState = {
  toastMessage: '',
  show: false,
  type: 'info',
};

const toastReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOWTOAST:
      return {
        toastMessage: action.payload.message,
        show: true,
        type: action.payload.type ? action.payload.type : 'info'
      };
    case HIDETOAST:
      return {
        toastMessage: '',
        show: false
      };
    default:
      return state;
  }
};

export default toastReducer