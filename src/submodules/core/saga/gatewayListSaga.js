import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
  GATEWAY_LIST as API,
  BANK_LIST as BANK_LIST_API,
} from 'Constants/api/api';
import {
  openMessage,
  setMessageTitle,
} from 'Redux/uiMBO/uiMessagePopup/action';
import { setContent, setParams } from 'Redux/messagePopup/action';
import {
  getGatewayList,
  editDetailGatewayList,
  editDetailGatewayList2,
  addDetailGatewayList,
  getPaymentProvider,
  getPaymentMethod,
  getPaymentOption,
  getAccountNumber,
  getAccountNumberHistory,
} from 'Redux/axios/action';
import { getDetailTargetGroupWithFeeFn } from 'Saga/bankListSaga';
import { axiosData } from './axiosSaga';

// 取得三方支付渠道列表
function* getGatewayListFn({ payload }) {
  console.log('取得三方支付渠道列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_LIST(payload));
}

// 修改該筆三方支付渠道資料
function* editDetailGatewayListFn({ payload }) {
  let { param, searchParam } = payload;
  if (param.amountPerDepositFrom.length <= 0) {
    param = { ...param, amountPerDepositFrom: '0' };
  }
  if (param.amountPerDepositTo.length <= 0) {
    param = { ...param, amountPerDepositTo: '-1' };
  }
  if (param.depositAlertLimit.length <= 0) {
    param = { ...param, depositAlertLimit: '-1' };
  }
  console.log('修改該筆三方支付渠道資料, param:');
  console.log(param);

  yield call(getDetailTargetGroupWithFeeFn, { payload: param.paymentOptionID });
  const {
    setKey: getDetailGatewayListKey,
  } = BANK_LIST_API.GET_DETAIL_TARGET_GROUP_WITH_FEE({});
  const getJson = state =>
    state.axios.key?.[getDetailGatewayListKey.page]?.[
      getDetailGatewayListKey.function
    ];
  const result = yield select(getJson);

  if (result) {
    param = { ...param, targetGroupWithFee: result.json };
    yield call(axiosData, API.EDIT_DETAIL_LIST(param));
    yield put(getGatewayList(searchParam));
  }
}

// 修改該筆三方支付渠道資料
function* editDetailGatewayListFn2({ payload }) {
  if (payload.amountPerDepositFrom.length <= 0) {
    payload = { ...payload, amountPerDepositFrom: '0' };
  }
  if (payload.amountPerDepositTo.length <= 0) {
    payload = { ...payload, amountPerDepositTo: '-1' };
  }
  if (payload.depositAlertLimit.length <= 0) {
    payload = { ...payload, depositAlertLimit: '-1' };
  }
  console.log('修改該筆三方支付渠道資料, param:');
  console.log(payload);

  yield call(axiosData, API.EDIT_DETAIL_LIST(payload));
  yield put(getGatewayList(payload));
}

// 新增一筆三方支付渠道資料
function* addDetailGatewayListFn({ payload }) {
  if (payload.amountPerDepositFrom.length <= 0) {
    payload = { ...payload, amountPerDepositFrom: '0' };
  }
  if (payload.amountPerDepositTo.length <= 0) {
    payload = { ...payload, amountPerDepositTo: '-1' };
  }
  if (payload.depositAlertLimit.length <= 0) {
    payload = { ...payload, depositAlertLimit: '-1' };
  }
  console.log('新增一筆三方支付渠道資料, param:');
  console.log(payload);
  yield call(axiosData, API.ADD_DETAIL_LIST(payload));
}

// 取得三方商戶列表
function* getPaymentProviderFn({ payload }) {
  console.log('取得三方商戶列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_PAYMENT_PROVIDER(payload));
}

// 取得支付类别列表
function* getPaymentMethodFn({ payload }) {
  console.log('取得支付类别列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_PAYMENT_METHOD(payload));
}

// 取得支付选项列表
function* getPaymentOptionFn({ payload }) {
  console.log('取得支付选项列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_PAYMENT_OPTION(payload));
}

// 取得三方特定商戶名稱底下的商戶號列表
function* getAccountNumberFn({ payload }) {
  console.log('取得三方特定商戶名稱底下的商戶號列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_ACCOUNT_NUMBER(payload));

  const { setKey: getAccountNumberKey } = API.GET_ACCOUNT_NUMBER({});
  const getJson = state =>
    state.axios.key?.[getAccountNumberKey.page]?.[getAccountNumberKey.function];
  const result = yield select(getJson);
  if (result) {
    sessionStorage.setItem('editAccountNumberParam', JSON.stringify(payload));

    yield put(
      setParams({
        sessionStorageKey: 'editAccountNumberParam',
        dispatchType: getAccountNumberHistory,
      })
    );
    yield put(openMessage());
    yield put(setMessageTitle('快捷带入'));
    yield put(setContent([['select', 'xl', result]]));
  }
}

// 取得三方特定商戶號的歷史輸入紀錄
function* getAccountNumberHistoryFn({ payload }) {
  console.log('取得三方特定商戶號的歷史輸入紀錄, param:');
  console.log(payload);

  yield call(axiosData, API.GET_ACCOUNT_NUMBER_HISTORY(payload));
}

export function* watchGatewayList() {
  yield takeEvery(getGatewayList, getGatewayListFn);

  yield takeEvery(editDetailGatewayList, editDetailGatewayListFn);

  yield takeEvery(editDetailGatewayList2, editDetailGatewayListFn2);

  yield takeEvery(addDetailGatewayList, addDetailGatewayListFn);

  yield takeEvery(getPaymentProvider, getPaymentProviderFn);

  yield takeEvery(getPaymentMethod, getPaymentMethodFn);

  yield takeEvery(getPaymentOption, getPaymentOptionFn);

  yield takeEvery(getAccountNumber, getAccountNumberFn);

  yield takeEvery(getAccountNumberHistory, getAccountNumberHistoryFn);
}
