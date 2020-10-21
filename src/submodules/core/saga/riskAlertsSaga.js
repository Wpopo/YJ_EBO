import { takeEvery, put, call } from 'redux-saga/effects';
import { RISK_ALERTS as API } from 'Constants/api/api';
import { axiosData } from './axiosSaga';

import { getAllConditionAction, getAllPlayersAction } from 'Redux/axios/action';

function* getAllCondition({ payload }) {
  console.log('取得風控警報所有情況數量列表 API8-1, param:', payload);
  yield call(axiosData, API.GET_RISK_ALERT_CONDITION(payload));
}

function* getAllPlayers({ payload }) {
  console.log('取得風控警報所有Player資料 API8-2, param:', payload);
  yield call(axiosData, API.GET_RISK_ALERT_PLAYERS(payload));
}

export function* watchRiskAlertsSaga() {
  yield takeEvery(getAllConditionAction, getAllCondition);
  yield takeEvery(getAllPlayersAction, getAllPlayers);
}
