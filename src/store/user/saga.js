import { put, call, takeLatest } from "redux-saga/effects";
import { setLogout, setLogedUser, performLogedIn, performUserSet, performRegister, setAllUsers, performAllUsersSet } from "./slice";

import { registerUser, logOut, logIn, getUsers } from "../../service/UserService";

function* registerHandler(action) {
  try {
    const { data } = yield call(registerUser, (action.payload));
    localStorage.setItem("access_token", data.authorisation.token);
    console.log(data);
    yield put(setLogedUser(data.user));
  } catch (err) {
    console.log(err);
  }
}

function* loginHandler(action) {
  try {
    const { data } = yield call(logIn, action.payload);
    localStorage.setItem("access_token", data.authorisation.token);
    yield put(setLogedUser(data.user));
  } catch (err) {
    console.log(err);
  }
}

function* logoutHandler() {
  try {
    yield put(setLogout());
  } catch (err) {
    console.log(err);
  }
}

function* allUsersHandler() {
  try {
    const { data } = yield call(getUsers);
    yield put(setAllUsers(data));
  } catch (err) {
    console.log(err);
  }
}

export function* watchRegisterUser() {
  yield takeLatest(performRegister.type, registerHandler);
}

export function* watchLoginUser() {
  yield takeLatest(performUserSet.type, loginHandler);
}

export function* watchLogoutUser() {
  yield takeLatest(performLogedIn.type, logoutHandler);
}

export function* watchAllUsers() {
  yield takeLatest(performAllUsersSet.type, allUsersHandler);
}