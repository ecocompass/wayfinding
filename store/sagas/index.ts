import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_TOKEN, LOGIN, REGISTER, TOKEN_STORE } from "../actions";
import { storeToken } from "../actions/auth";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import {
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
    RootNavigation.navigate('Map', {});
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

function* watchSagaRegister(): SagaIterator {
  yield takeLatest(REGISTER, signUpSaga);
}

function* watchSagaLogin(): SagaIterator {
  yield takeLatest(LOGIN, loginSaga);
}

function* watchTokenSaga(): SagaIterator {
  yield takeLatest(GET_TOKEN, tokenSaga);
}

function* appSagas() {
  yield all([
    call(watchSagaRegister),
    call(watchSagaLogin),
    call(watchTokenSaga),
  ]);
}

export default appSagas;
