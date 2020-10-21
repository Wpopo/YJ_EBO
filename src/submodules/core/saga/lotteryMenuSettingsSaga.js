import { takeEvery, call } from 'redux-saga/effects';
import { MENU_SETTINGS as API } from 'Constants/api/api';

import {
  getNormalLotteries,
  getMenuSettings,
  editMenuSettings,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

function* _getNormalLotteries({ payload }) {
  yield call(axiosData, API.GET_NORMAL_LOTTERIES(payload));
}

function* _getMenuSettings({ payload }) {
  yield call(axiosData, API.GET_NORMAL_LOTTERIES(payload));
  yield call(axiosData, API.GET(payload));
}

function* _editMenuSettings({ payload }) {
  yield call(axiosData, API.EDIT(payload));
}

export function* watchLotteryMenuSettingsSaga() {
  yield takeEvery(getNormalLotteries, _getNormalLotteries);
  yield takeEvery(getMenuSettings, _getMenuSettings);
  yield takeEvery(editMenuSettings, _editMenuSettings);
}
