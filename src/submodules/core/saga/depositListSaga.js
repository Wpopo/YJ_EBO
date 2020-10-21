import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import { DEPOSIT_LIST as API } from 'Constants/api/api';
import {
  getDepositList,
  getDepositListRemarkHistory,
  editDepositListData,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

// 取得玩家存款單列表
export function* getDepositListFn({ payload }) {
  console.log('取得玩家存款單列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_LIST(payload));
}

// 取得該筆存款單備註歷程
export function* getDepositListRemarkHistoryFn({ payload }) {
  console.log('取得該筆存款單備註歷程, id:' + payload);

  yield call(axiosData, API.GET_REMARK_HISTORY(payload));
}

// 修改該筆存款單資料
export function* editDepositListDataFn({ payload }) {
  let { param, searchParam } = payload;
  console.log('修改該筆存款單資料, param:');
  console.log(param);

  yield call(axiosData, API.EDIT_DETAIL_LIST(param));

  yield put(getDepositList(searchParam));
}
export function* watchDepositList() {
  yield takeLatest(getDepositList, getDepositListFn);

  yield takeEvery(getDepositListRemarkHistory, getDepositListRemarkHistoryFn);

  yield takeEvery(editDepositListData, editDepositListDataFn);
}
