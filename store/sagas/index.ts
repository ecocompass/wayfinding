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
  GOAL_STORE,
  SETGOALS,
  READGOALS,
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
  userGoals,
  readGoals,
} from "../../services/network.service";
import { SagaIterator } from "redux-saga";
import { VIEWMODE } from "../../constants";
import { goalStore, prefStore, storeProfile } from "../actions/user";
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
    const res = yield getPreference();
    if (res.payload) {
      yield put(prefStore(res.payload));
      RootNavigation.navigate('Map', {});
    } else {
      RootNavigation.navigate('Preference', {});
    }
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

function* tokenSaga(): any {
  yield put(toggleSpinner());

  const response = yield readToken();

  yield put(toggleSpinner());

  if (response) {
    let token_time = response.timestamp;
    let now = new Date().getTime();
    let diff = (now - token_time) / 1000 / 60;
    const res = yield getPreference();
    if (res.payload) {
      yield put(prefStore(res.payload));
      RootNavigation.navigate('Map', {});
    } else {
      RootNavigation.navigate('Preference', {});
    }
  } else {
    yield removeStorageItem('access_token_obj');
    RootNavigation.navigate('Register', {});
  }
}

function* prefSaga(payload: any): any {
  yield put(toggleSpinner());

  const response = yield userPref(payload);

  yield put(toggleSpinner());

  if (response) {
    yield put({ type: PREF_STORE, payload: response });
    RootNavigation.navigate('Goals', {});
  }
}
function* goalSaga(payload: any): any {
  yield put(toggleSpinner());

  const response = yield userGoals(payload);

  yield put(toggleSpinner());

  if (response) {
    yield put({ type: GOAL_STORE, payload: response });
    RootNavigation.navigate('Map', {});
  }
}
function* getPathSaga(action: any): any {
  yield put(toggleSpinner());

  const response = yield getPath(action.payload);

  yield all([
    put(toggleSpinner()),
    put({
      type: ROUTES_STORE,
      payload: { walk: response.shortestPathCoordinates },
    }),
    put({ type: UPDATEVIEWMODE, payload: VIEWMODE.preview }),
  ]);
}

function* saveLocationSaga(action: any): any {
  yield put(toggleSpinner());
  const response = yield saveLocation(action.payload);
  yield put(toggleSpinner());
  // handle response
  yield put(showToast('saved successfully!', 'success'));
  yield delay(2000);
  yield put(hideToast());
}

function* getSaveLocationSaga():any {
  const response = yield getSaveLocations();
  yield put({ type: SAVE_LOCATION_STORE, payload: response.saved_locations });
}

function* logoutSaga(): any {
  yield put(toggleSpinner());
  const response = yield userLogout();
  yield put(toggleSpinner());
  console.log(response);
  yield removeStorageItem('access_token_obj');
  RootNavigation.navigate('Register', {});
}
function* ProfileSaga(): any {
  const response = yield readProfile();
  yield put(storeProfile(response));
}

function* readGoalsSaga(): any {
  yield put(toggleSpinner());
  const response = yield readGoals();
  console.log("res",response)
  yield put(toggleSpinner());
  if(response){
  yield put(goalStore(response));
  

  }
  else {
    yield put(showToast('saved successfully!', 'success'));
    yield delay(2000);
    yield put(hideToast());
  }
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

function* watchGoalSaga(): SagaIterator {
  yield takeLatest(SETGOALS, goalSaga);
}

function* watchReadGoalSaga(): SagaIterator {
  yield takeLatest(READGOALS, readGoalsSaga);
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
    call(watchGoalSaga),
    call(watchReadGoalSaga)
  ]);
}

export default appSagas;
