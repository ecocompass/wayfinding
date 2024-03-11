import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_TOKEN, LOGIN, PREF_STORE, REGISTER, SETPREFERENCE, TOKEN_STORE } from "../actions";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import {
  readPref,
  readToken,
  saveToken,
  userLogin,
  userSignup,
} from "../../services/network.service";
import { SagaIterator } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";

function* signUpSaga(payload: any): any {
  const response = yield userSignup(payload);
  if (response.access_token) {
    yield saveToken(response.access_token);
  //  RootNavigation.navigate('Map', {});
    RootNavigation.navigate('Preference', {});

  } else {
    console.log("BE Error", response);
  }
}

function* loginSaga(payload: any): any {
  const response = yield userLogin(payload);
  yield saveToken(response.access_token);
  RootNavigation.navigate('Map', {});
}

function* tokenSaga() {
  const response = yield readToken();
  if (response) {
    yield put({ type: TOKEN_STORE, payload: response });
    RootNavigation.navigate('Map', {});
  }
}

function* prefSaga(payload:any):any{
  console.log("Pref",payload)
  const response= yield readPref(payload);
  if(response){
    console.log("Pref res",response)
    yield put({type:PREF_STORE,payload:response});
    RootNavigation.navigate('Map', {});
  }
}

function* watchSagaRegister(): SagaIterator {
  yield takeLatest(REGISTER, signUpSaga);
}

function* watchSagaLogin(): SagaIterator {
  yield takeLatest(LOGIN, loginSaga);
}

function* watchTokenSaga(): SagaIterator {
  yield takeLatest(GET_TOKEN, tokenSaga);
}


function* watchPrefSaga(): SagaIterator {
  yield takeLatest(SETPREFERENCE, prefSaga);
}

function* appSagas() {
  yield all([
    call(watchSagaRegister),
    call(watchSagaLogin),
    call(watchTokenSaga),
    call(watchPrefSaga)
  ]);
}

export default appSagas;
