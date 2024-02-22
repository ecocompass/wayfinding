import { LIST_FETCHED, REGISTER } from ".";

export const registerAction = (register:any) => {
    return {
        type: REGISTER,
        payload: register,
    };
};

export const storeListData= (result:any) => {
    return {
       type: LIST_FETCHED,
       data : result,
     };
 };
