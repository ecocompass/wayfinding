import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GETROUTES,
  GET_TOKEN,
  LOGIN,
  REGISTER,
  ROUTES_STORE,
  SAVE_LOCATION,
  TOKEN_STORE,
  UPDATEVIEWMODE,
} from "../actions";
import { storeToken } from "../actions/auth";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import {
  readToken,
  saveToken,
  userLogin,
  userSignup,
  removeStorageItem,
  getPath,
  saveLocation,
} from "../../services/network.service";
import { SagaIterator } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { VIEWMODE } from "../../constants";

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
  if (response.access_token) {
    yield saveToken(response.access_token);
    RootNavigation.navigate('Map', {});
  } else {
    console.log("BE Error", response);
  }
}

function* tokenSaga() {
  const response = yield readToken();
  if (response) {
    let token_time = response.timestamp;
    let now = new Date().getTime();
    let diff = (now - token_time) / 1000 / 60;
    if (diff < 2000) {
      yield put({ type: TOKEN_STORE, payload: response });
      RootNavigation.navigate('Map', {});
    } else {
      yield removeStorageItem('access_token_obj');
      RootNavigation.navigate('Login', {});
    }
  }
}

function* getPathSaga(action) {
  const response = yield getPath(action.payload);

  yield put({
    type: ROUTES_STORE,
    payload: { walk: response.shortestPathCoordinates },
  });
  yield put({ type: UPDATEVIEWMODE, payload: VIEWMODE.preview });
}

function* saveLocationSaga(action) {
  const response = yield saveLocation(action.payload);
  // handle response
  console.log(response);
}

function* watchGetPath(): SagaIterator {
  yield takeLatest(GETROUTES, getPathSaga);
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

function* watchSaveLocationSaga(): SagaIterator {
  yield takeLatest(SAVE_LOCATION, saveLocationSaga);
}

function* appSagas() {
  yield all([
    call(watchSagaRegister),
    call(watchSagaLogin),
    call(watchTokenSaga),
    call(watchGetPath),
    call(watchSaveLocationSaga),
  ]);
}

export default appSagas;
