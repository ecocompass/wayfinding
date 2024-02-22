import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { REGISTER } from "../actions";
import { registerAction, storeListData } from "../actions/auth";
import axios from 'axios';
// yield pauses and resume the generator functions
const endpoint = {
  reg: 'http://3.249.30.30:5050/api/auth/signup'
}

export const userSignup = async (payload: any) => {
  console.log("Payload2", payload.payload)
  console.log("End",endpoint.reg);
  let payload2=payload.payload
  payload2=JSON.stringify(payload2)
  console.log("length",payload2.length);
  //const payload3= Buffer.byteLength(payload2,'utf-8')
  return  await fetch(endpoint.reg, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length':String(payload2)
      },
      body: payload2
    }).then(response => response.json()
    ).catch(error=> console.log("Error",error))
  //if(!response.ok) throw new Error('Something Went Wrong!!');
  //const responseData = await response.json()

}
function* signUpSaga(payload: any): any {
  try {
    console.log("Payload", payload)
    //let payload=registerAction;
    const response = yield userSignup(payload);
    console.log("Response",response)
    if (response.status == 201) {
      // to fire another action, use put method
      // here I am storing the data by firing action LIST_FETCHED
      yield put(storeListData(response));
      // for calling another generator funtion use call method
    } else {
      // handle other response code
    }
  } catch (error) {
    console.log(error);
  }
}
function* appSagas() {
  yield takeLatest(REGISTER, signUpSaga);
}
export default appSagas;