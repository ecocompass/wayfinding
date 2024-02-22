import { all, call, put, takeLatest } from "redux-saga/effects";
import { LOGIN, REGISTER } from "../actions";
import {  storeToken } from "../actions/auth";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import { userLogin, userSignup } from "../../services/network.service";
import { SagaIterator } from "redux-saga";

function* signUpSaga(payload: any): any {

  const response = yield userSignup(payload);
  if (response) {
    yield put(storeToken(response.access_token)),

      RootNavigation.navigate('Map', {});
  }
  else {
    console.log("something wrong");
  }
}
function* loginSaga(payload: any): any {

  const response = yield userLogin(payload);
  if (response) {
    yield put(storeToken(response.access_token)),

      RootNavigation.navigate('Map', {});
  }
  else {
    console.log("something wrong");
  }
}

function* watchSagaRegister(): SagaIterator {
  yield takeLatest(REGISTER, signUpSaga);
}

function* watchSagaLogin(): SagaIterator {
  yield takeLatest(LOGIN, loginSaga);
}

function* appSagas() {
  yield all([call(watchSagaRegister),call(watchSagaLogin)])
}
export default appSagas;