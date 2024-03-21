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
  GET_SAVE_LOCATIONS,
  SAVE_LOCATION_STORE,
  PROFILE,
} from "../actions";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import {
  readToken,
  saveToken,
  userLogin,
  userSignup,
  removeStorageItem,
  getPath,
  saveLocation,
  userLogout,
  getSaveLocations,
  readProfile,
  userPref,
  getPreference,
} from "../../services/network.service";
import { SagaIterator } from "redux-saga";
import { VIEWMODE } from "../../constants";
import { prefStore, storeProfile } from "../actions/user";
import { hideToast, showToast } from "../actions/setLocation";


function* signUpSaga(payload: any): any {
  const response = yield userSignup(payload);
  console.log(response);
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
  const response = yield userLogin(payload);
  if (response.access_token) {
    yield saveToken(response.access_token);
    const res = yield getPreference();
    if (res.payload) {
      console.log("Preferences", res)
      yield put(prefStore(res.payload))
      RootNavigation.navigate('Map', {});
    }
    else {
      RootNavigation.navigate('Preference', {});
    }

  } else {
    yield put(showToast(response.message));
    yield delay(2000);
    yield put(hideToast());
  }
}

function* tokenSaga(): any {
  const response = yield readToken();

  if (response) {
    let token_time = response.timestamp;
    let now = new Date().getTime();
    let diff = (now - token_time) / 1000 / 60;
    const res = yield getPreference();
    if (res.payload) {
      yield put(prefStore(res.payload))
      console.log("Preferences", res)
      RootNavigation.navigate('Map', {});
    }
    else {
      RootNavigation.navigate('Preference', {});
    }

  }
  else {
    yield removeStorageItem('access_token_obj');
    RootNavigation.navigate('Register', {});
  }
}

function* prefSaga(payload: any): any {
  const response = yield userPref(payload);
  if (response) {
    yield put({ type: PREF_STORE, payload: response });
    RootNavigation.navigate('Map', {});
  }
}

function* getPathSaga(action: any): any {
  const response = yield getPath(action.payload);

  yield put({
    type: ROUTES_STORE,
    payload: { walk: response.shortestPathCoordinates },
  });
  yield put({ type: UPDATEVIEWMODE, payload: VIEWMODE.preview });
}

function* saveLocationSaga(action: any): any {
  const response = yield saveLocation(action.payload);
  // handle response
  console.log(response);
  yield put(showToast('saved successfully!', 'success'));
  yield delay(2000);
  yield put(hideToast());
}

function* getSaveLocationSaga() {
  const response = yield getSaveLocations();
  console.log(response);
  yield put({ type: SAVE_LOCATION_STORE, payload: response });
}

function* logoutSaga(): any {
  const response = yield userLogout();
  console.log(response);
  yield removeStorageItem('access_token_obj');
  RootNavigation.navigate('Register', {});
}
function* ProfileSaga(): any {
  const response = yield readProfile();
  console.log(response);
  yield put(storeProfile(response))
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

function* watchGetLocationSaga(): SagaIterator {
  yield takeLatest(GET_SAVE_LOCATIONS, getSaveLocationSaga);
}

function* watchProfileSaga(): SagaIterator {
  yield takeLatest(PROFILE, ProfileSaga);
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
    call(watchGetLocationSaga),
    call(watchProfileSaga),
  ]);
}

export default appSagas;
