import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import {
  GETROUTES,
  GET_TOKEN,
  LOGIN,
  REGISTER,
  ROUTES_STORE,
  SAVE_LOCATION,
  UPDATEVIEWMODE,
  PREF_STORE,
  SETPREFERENCE,
  LOGOUT,
  GET_SAVE_LOCATIONS,
  SAVE_LOCATION_STORE,
  PROFILE,
  SAVETRIP,
  SETGOALS,
  READGOALS,
  SETWEATHER,
  SETOFFLINE,
  GETOFFLINE,
  SETTRIPHISTORY,
  SETFEEDBACK,
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
  saveTrip,
  userGoals,
  readGoals,
  fetchWeather,
  saveMap,
  readMap,
  getTripHistory,
  userFeedback,
} from "../../services/network.service";

import { goalStore, prefStore, storeProfile } from "../actions/user";

import { SagaIterator } from "redux-saga";
import { VIEWMODE, errorMessage, successMessage } from "../../constants";
import {
  getWeather,
  hideToast,
  showToast,
  getTrips,
  saveOffline
} from "../actions/setLocation";
import { toggleSpinner } from "../actions/auth";
import { process_path } from "../../services/path_processor";

function* signUpSaga(payload: any): any {
  yield put(toggleSpinner());

  const response = yield userSignup(payload);

  yield put(toggleSpinner());

  if (response.access_token) {
    yield saveToken(response.access_token);
    RootNavigation.navigate('Preference', {});
  } else {
    yield call(handleToast, response.message);
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
    yield call(handleToast, response.message);
  }
}
function* handleToast(message: string, type = 'info') {
  yield put(showToast(message, type));
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
    if (res && res.payload) {
      yield put(prefStore(res.payload));
      RootNavigation.navigate('Map', {});
    } else if (res && !res.payload) {
      yield call(handleToast, errorMessage);
      RootNavigation.navigate('Preference', {});
    } else {
      yield removeStorageItem('access_token_obj');
      RootNavigation.navigate('Register', {});
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
    RootNavigation.navigate('Map', {});
  } else {
    yield call(handleToast, errorMessage);
  }
}
function* getPathSaga(action: any): any {
  yield put(toggleSpinner());

  const response = yield getPath(action.payload);
  let recommendationList = process_path(response);
  if (response && !response.error) {
    yield all([
      put(toggleSpinner()),
      put({
        type: ROUTES_STORE,
        payload: { options: recommendationList },
      }),
      put({ type: UPDATEVIEWMODE, payload: VIEWMODE.preview }),
    ]);
  } else {
    yield put(toggleSpinner());
    yield call(handleToast, "Something went wrong")
  }
}

function* saveTripSaga(action: any): any {
  yield put(toggleSpinner());
  const response = yield saveTrip(action.payload);
  yield put(toggleSpinner());
  if (response) {
    yield call(handleToast, 'Trip Completed!', 'success');
    // handle awards
    // yield put(setAwards(response.payload));
  }
  if (!response || response.error) {
    yield call(handleToast, errorMessage);
  }
}

function* saveLocationSaga(action: any): any {
  yield put(toggleSpinner());
  const response = yield saveLocation(action.payload);
  yield put(toggleSpinner());
  // handle response
  if (response) {
    yield call(handleToast, successMessage, 'success');
  } else {
    yield call(handleToast, errorMessage);
  }
}

function* getSaveLocationSaga(): any {
  const response = yield getSaveLocations();
  if (response) {
    yield put({ type: SAVE_LOCATION_STORE, payload: response.saved_locations });
  } else {
    yield call(handleToast, errorMessage);
  }
}

function* logoutSaga(): any {
  yield put(toggleSpinner());
  const response = yield userLogout();
  yield put(toggleSpinner());
  yield removeStorageItem('access_token_obj');
  RootNavigation.navigate('Register', {});
}
function* ProfileSaga(): any {
  yield put(toggleSpinner());
  const response = yield readProfile();
  yield put(toggleSpinner());
  if (response) {
    yield put(storeProfile(response));
  } else {
    yield call(handleToast, errorMessage);
  }
}

function* WeatherSaga(payload: any): any {
  yield put(toggleSpinner());
  const response = yield fetchWeather(payload);
  yield put(toggleSpinner());

  if (response) {
    yield put(getWeather(response));
  } else {
    yield call(handleToast, errorMessage);
  }
}

function* readGoalsSaga(): any {
  yield put(toggleSpinner());
  const response = yield readGoals();
  yield put(toggleSpinner());
  if (response.payload) {
    yield put(goalStore(response.payload));
  } else {
    yield put(showToast('Something went wrong!'));
    yield delay(2000);
    yield put(hideToast());
  }
}
function* saveOfflineSaga(payload:any):any{
  yield saveMap(payload);
}
function* tripHistorySaga(): any {
  yield put(toggleSpinner());
  const response = yield getTripHistory();
  yield put(toggleSpinner());
  if (response.saved_locations) {
    yield put(getTrips(response.saved_locations));
  }
  else { handleToast(errorMessage) }
}

function* feedbackSaga(payload: any): any {
  yield put(toggleSpinner());
  const response = yield userFeedback(payload);
  yield put(toggleSpinner());
  if (response.payload) {
    yield call(handleToast, successMessage);
  } else {
    yield call(handleToast, errorMessage);
  }
}

function* getOfflineSaga(payload:any):any{
 const response= yield readMap();
 if(response.payload){
  yield put(saveOffline(response.payload))
 }
}
function* watchSaveTrip(): SagaIterator {
  yield takeLatest(SAVETRIP, saveTripSaga);
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
function* watchWeatherSaga(): SagaIterator {
  yield takeLatest(SETWEATHER, WeatherSaga);
}

function* watchOfflineSaga():SagaIterator{
  yield takeLatest(SETOFFLINE,saveOfflineSaga)
}

function* watchMapSaga():SagaIterator{
  yield takeLatest(GETOFFLINE,getOfflineSaga)
}
function* watchTripHistorySaga(): SagaIterator {
  yield takeLatest(SETTRIPHISTORY, tripHistorySaga);
}
function* watchFeedbackSaga(): SagaIterator {
  yield takeLatest(SETFEEDBACK, feedbackSaga);
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
    call(watchSaveTrip),
    call(watchGoalSaga),
    call(watchReadGoalSaga),
    call(watchWeatherSaga),
    call(watchOfflineSaga),
    call(watchMapSaga),
    call(watchTripHistorySaga),
    call(watchFeedbackSaga),
  ]);
}

export default appSagas;
