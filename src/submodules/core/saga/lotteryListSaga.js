import { takeEvery, call } from 'redux-saga/effects';
import { LOTTERY as API } from 'Constants/api/api';

import {
  getLotteryList,
  getLotteryGroup,
  addLottery,
  getLotterySettings,
  editLotterySettings,
  editLotteryStatus,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

function* _getLotteryList({ payload }) {
  yield call(axiosData, API.GET_LIST(payload));
}

function* _getLotteryGroup({ payload }) {
  yield call(axiosData, API.GET_GROUP(payload));
}

function* _addLottery({ payload }) {
  yield call(axiosData, API.ADD(payload));
}

function* _getLotterySettings({ payload }) {
  yield call(axiosData, API.GET_SETTINGS(payload));
}

function* _editLotterySettings({ payload }) {
  yield call(axiosData, API.EDIT_SETTINGS(payload));
}

function* _editLotteryStatus({ payload }) {
  yield call(axiosData, API.EDIT_STATUS(payload));
}

export function* watchLotteryListSaga() {
  yield takeEvery(getLotteryList, _getLotteryList);
  yield takeEvery(getLotteryGroup, _getLotteryGroup);
  yield takeEvery(addLottery, _addLottery);
  yield takeEvery(getLotterySettings, _getLotterySettings);
  yield takeEvery(editLotterySettings, _editLotterySettings);
  yield takeEvery(editLotteryStatus, _editLotteryStatus);
}
