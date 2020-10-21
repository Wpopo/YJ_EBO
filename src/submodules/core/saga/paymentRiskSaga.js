import { takeEvery, put, call, select } from 'redux-saga/effects';
import { PAYMENT_RISK as API } from 'Constants/api/api';
import {
  getPaymentRiskList,
  editWithdrawalsDetail,
  getDetailPaymentRiskProvider,
  editDetailPaymentRiskProvider,
  getTargetGroupPaymentRisk,
  editTargetGroupPaymentRisk,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

// 取得目標群組統計資料
function* getPaymentRiskFn({ payload }) {
  console.log('取得目標群組統計資料, param:');
  console.log(payload);

  yield call(axiosData, API.GET_LIST(payload));
}

// 編輯提款詳情
function* editWithdrawalsDetailFn({ payload }) {
  console.log('編輯提款詳情, param:');
  console.log(payload);

  yield call(axiosData, API.GET_LIST(payload));
}

// 取得目標群組條件設定資料
function* getTargetGroupPaymentRiskFn({ payload }) {
  console.log('取得目標群組條件設定資料, param:');
  console.log(payload);

  yield call(axiosData, API.GET_TARGET_GROUP(payload));
}

// 編輯目標群組條件設定資料
function* editTargetGroupPaymentRiskFn({ payload }) {
  console.log('編輯目標群組條件設定資料, param:');
  console.log(payload);

  yield call(axiosData, API.EDIT_TARGET_GROUP(payload));
}

// 取得該支付選項擁有的所有 provider
function* getDetailPaymentRiskProviderFn({ payload }) {
  console.log('取得該支付選項擁有的所有 provider, param:');
  console.log(payload);

  yield call(axiosData, API.GET_PROVIDER(payload));
}

// 修改該筆目標群組資料
function* editDetailPaymentRiskProviderFn({ payload }) {
  console.log('修改該筆目標群組資料, param:');
  console.log(payload);

  yield call(axiosData, API.EDIT_PROVIDER(payload));
}

export function* watchPaymentRisk() {
  yield takeEvery(getPaymentRiskList, getPaymentRiskFn);

  yield takeEvery(editWithdrawalsDetail, editWithdrawalsDetailFn);

  yield takeEvery(getTargetGroupPaymentRisk, getTargetGroupPaymentRiskFn);

  yield takeEvery(editTargetGroupPaymentRisk, editTargetGroupPaymentRiskFn);

  yield takeEvery(getDetailPaymentRiskProvider, getDetailPaymentRiskProviderFn);

  yield takeEvery(
    editDetailPaymentRiskProvider,
    editDetailPaymentRiskProviderFn
  );
}
