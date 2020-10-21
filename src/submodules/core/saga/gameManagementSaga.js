import { takeEvery, call } from 'redux-saga/effects';
import { GAME_MANAGEMENT as API } from 'Constants/api/api';

import {
  getGameCategories,
  getGameList,
  getDashboard,
  resetPool,
  manualDraw,
  revokeDraw,
  correctDraw,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

function* _getGameCategories({ payload }) {
  yield call(axiosData, API.GET_CATEGORIES(payload));
}

function* _getGameList({ payload }) {
  yield call(axiosData, API.GET_LIST(payload));
}

function* _getDashboard({ payload }) {
  yield call(axiosData, API.GET_DASHBOARD(payload));
}

function* _resetPool({ payload }) {
  yield call(axiosData, API.RESET_POOL(payload));
}

function* _manualDraw({ payload }) {
  yield call(axiosData, API.MANUAL_DRAW(payload));
}

function* _revokeDraw({ payload }) {
  yield call(axiosData, API.REVOKE_DRAW(payload));
}

function* _correctDraw({ payload }) {
  yield call(axiosData, API.CORRECT_DRAW(payload));
}

export function* watchGameManagementSaga() {
  yield takeEvery(getGameCategories, _getGameCategories);
  yield takeEvery(getGameList, _getGameList);
  yield takeEvery(getDashboard, _getDashboard);
  yield takeEvery(resetPool, _resetPool);
  yield takeEvery(manualDraw, _manualDraw);
  yield takeEvery(revokeDraw, _revokeDraw);
  yield takeEvery(correctDraw, _correctDraw);
}
