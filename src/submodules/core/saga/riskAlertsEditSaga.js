import { takeEvery, put, call } from 'redux-saga/effects';
import { RISK_ALERTS as API } from 'Constants/api/api';
import { closeMessage } from 'Redux/uiMBO/uiMessagePopup/action';
import {
  getRiskAlertListAction,
  editRiskAlertListAction,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

// 取得警報設置列表
function* getRiskAlertList({ payload }) {
  console.log('取得警報設置列表 API7-1, param:');
  console.log(payload);

  yield call(axiosData, API.GET_RISK_ALERT_LIST(payload));
}

// 修改指定警報設置資料
function* editRiskAlertList(action) {
  console.log('修改警報設置列表 API7-2, param:');
  console.log(action.payload);
  yield call(axiosData, API.EDIT_RISK_ALERT_LIST(action.payload));
  yield put(closeMessage());
  const paramGet = {
    ruleType: action.payload.ruleType,
    merchant: action.payload.merchant,
    merchantGroup: action.payload.merchantGroup,
  };
  yield put(getRiskAlertListAction(paramGet));
}

export function* watchRiskAlertsEditSaga() {
  yield takeEvery(getRiskAlertListAction, getRiskAlertList);
  yield takeEvery(editRiskAlertListAction, editRiskAlertList);
}
