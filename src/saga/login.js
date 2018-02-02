import { takeEvery, delay } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import * as Actions from "../actions/index";

function* LoginSaga(action) {
    try {
        yield delay(3000);
        console.log('LOGIN_INPUT_CHANGE');
        yield put({type: Actions.LOGIN_INPUT_CHANGE, action});
        //console.log('WAITING');
        //yield delay(3000);
        //console.log('LOGIN_FALSE');
        //yield put(Actions.LOGIN_FAILED);
    }
    catch (e) {
        console.log('LOGIN_FAILED_SYSTEM_ERROR');
        yield put(Actions.LOGIN_FAILED);
    }
}
export default function* watchLoginSaga() {
    yield* takeEvery(Actions.LOGIN_REQUEST, LoginSaga);
}

