import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import {
  GETROUTES,
  GET_TOKEN,
  LOGIN,
  REGISTER,
  ROUTES_STORE,
  SAVE_LOCATION,
  TOKEN_STORE,
  UPDATEVIEWMODE,
  PREF_STORE,
  SETPREFERENCE,
  LOGOUT,
} from "../actions";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import {
  readPref,
  readToken,
  saveToken,
  userLogin,
  userSignup,
  removeStorageItem,
  getPath,
  saveLocation,
  userLogout,
} from "../../services/network.service";
import { SagaIterator } from "redux-saga";
import { VIEWMODE } from "../../constants";
import { hideToast, showToast } from "../actions/setLocation";
import { useDispatch } from "react-redux";
import { toggleSpinner } from "../actions/auth";


function* signUpSaga(payload: any): any {

  yield put(toggleSpinner());

  const response = yield userSignup(payload);
  console.log(response);

  yield put(toggleSpinner());

  if (response.access_token) {
    yield saveToken(response.access_token);
    RootNavigation.navigate('Preference', {});
  } else {
    yield put(showToast(response.message));
    yield delay(2000);
    yield put(hideToast());
  }
}

function* loginSaga(payload: any): any {

  yield put(toggleSpinner());

  const response = yield userLogin(payload);

  yield put(toggleSpinner());

  if (response.access_token) {
    yield saveToken(response.access_token);
    RootNavigation.navigate('Map', {});
  } else {
    yield put(showToast(response.message));
    yield delay(2000);
    yield put(hideToast());
  }
}
function* handleToast(message: string) {
  yield put(showToast(message));
  yield delay(2000);
  yield put(hideToast());
}

function* tokenSaga() {

  yield put(toggleSpinner());

  const response = yield readToken();

  yield put(toggleSpinner());

  if (response) {
    let token_time = response.timestamp;
    let now = new Date().getTime();
    let diff = (now - token_time) / 1000 / 60;
    if (diff < 2000) {
      yield put({ type: TOKEN_STORE, payload: response });
      RootNavigation.navigate('Preference', {});
    } else {
      yield removeStorageItem('access_token_obj');
      RootNavigation.navigate('Login', {});
    }
  }
}

function* prefSaga(payload: any): any {

  yield put(toggleSpinner());

  const response = yield readPref(payload);

  yield put(toggleSpinner());

  if (response) {
    yield put({ type: PREF_STORE, payload: response });
    RootNavigation.navigate('Map', {});
  }
}

function* getPathSaga(action) {

  yield put(toggleSpinner());

  const response = yield getPath(action.payload);

  yield all([
  put(toggleSpinner()),
  put({
    type: ROUTES_STORE,
    payload: { walk: response.shortestPathCoordinates },
  }), 
  put({ type: UPDATEVIEWMODE, payload: VIEWMODE.preview })
])

}

function* saveLocationSaga(action) {
  yield put(toggleSpinner());
  const response = yield saveLocation(action.payload);
  yield put(toggleSpinner());
  // handle response
  console.log(response);
}

function* logoutSaga() {
  yield put(toggleSpinner());
  const response = yield userLogout();
  yield put(toggleSpinner());
  console.log(response);
  yield removeStorageItem('access_token_obj');
  RootNavigation.navigate('Login', {});
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
function* watchPrefSaga(): SagaIterator {
  yield takeLatest(SETPREFERENCE, prefSaga);
}

function* watchLogoutSaga(): SagaIterator {
  yield takeLatest(LOGOUT, logoutSaga);
}

function* appSagas() {
  yield all([
    call(watchSagaRegister),
    call(watchSagaLogin),
    call(watchTokenSaga),
    call(watchPrefSaga),
    call(watchGetPath),
    call(watchSaveLocationSaga),
    call(watchLogoutSaga),
  ]);
}

export default appSagas;
