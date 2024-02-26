import { all, call, put, takeLatest } from "redux-saga/effects";
import { LOGIN, REGISTER } from "../actions";
import { storeToken } from "../actions/auth";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import { readToken, saveToken, userLogin, userSignup } from "../../services/network.service";
import { SagaIterator } from "redux-saga";
import { useSelector } from "react-redux";

function* signUpSaga(payload: any): any {
    const authToken = useSelector((state:any)=>{return state.token})
    /* if (authToken) {
      console.log("auth token",authToken)
      RootNavigation.navigate('Map', {});
    }
    else { */
      const response = yield userSignup(payload);
      yield saveToken(response.access_token)
      RootNavigation.navigate('Map', {});
}
function* loginSaga(payload: any): any {
   /*  const authToken = useSelector((state:any)=>{return state.token})
    if (authToken) {
      RootNavigation.navigate('Map', {});
    } 
    else {*/
      const response = yield userLogin(payload);
      yield saveToken(response.access_token)
      RootNavigation.navigate('Map', {});
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
