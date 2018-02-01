import { fork } from "redux-saga/effects";
import watchLoginSaga from "../saga/login";

export default function* RootSaga() {
    yield [
        fork(watchLoginSaga)
    ];
}