import { takeEvery, call } from 'redux-saga/effects';
import { MERCHANT as API } from 'Constants/api/api';

import {
  getMerchantInfo,
  editMerchantInfo,
  getLogListInfo,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

function* _getMerchantInfo({ payload }) {
  yield call(axiosData, API.GET_INFO(payload));
}

function* _editMerchantInfo({ payload }) {
  yield call(axiosData, API.EDIT_INFO(payload));
}

function* _getLogListInfo({ payload }) {
  console.log('取得日志管理清單,param:');
  console.log(payload);
  yield call(axiosData, API.GET_LOG_LIST_INFO(payload));
}

export function* watchMerchantSaga() {
  yield takeEvery(getMerchantInfo, _getMerchantInfo);
  yield takeEvery(editMerchantInfo, _editMerchantInfo);
  yield takeEvery(getLogListInfo, _getLogListInfo);
}
