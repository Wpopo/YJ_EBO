import { takeEvery, put, call, select } from 'redux-saga/effects';
import { WITHDRAWALS_LIST as API } from 'Constants/api/api';
import {
  openMessage,
  setMessageTitle,
} from 'Redux/uiMBO/uiMessagePopup/action';
import { setContent, setParams } from 'Redux/messagePopup/action';
import {
  getWithdrawalsList,
  getDetailWithdrawalsList,
  getWithdrawalsListRemarkHistory,
  editWithdrawalsListData,
  getWithdrawalsListPaymentMethods,
} from 'Redux/axios/action';
import { closeDrawer } from 'Redux/uiMBO/uiDrawer/action';
import { axiosData } from './axiosSaga';

// 取得玩家提款單列表
function* getWithdrawalsListFn({ payload }) {
  console.log('取得玩家提款單列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_LIST(payload));
}

// 取得該筆提款單詳細資料
function* getDetailWithdrawalsListFn({ payload }) {
  console.log('取得該筆提款單詳細資料, id:');
  console.log(payload);

  yield call(axiosData, API.GET_DETAIL_LIST(payload));
}

// 取得該筆提款單備註歷程
function* getWithdrawalsListRemarkHistoryFn({ payload }) {
  console.log('取得該筆提款單備註歷程, id:' + payload);

  yield call(axiosData, API.GET_REMARK_HISTORY(payload));
}

// 修改該筆提款單資料
function* editWithdrawalsListDataFn({ payload }) {
  let { param, searchParam, isCloseDrawer } = payload;
  console.log('修改該筆提款單資料, param:');
  console.log(param);

  yield call(axiosData, API.EDIT_DETAIL_LIST(param));
  yield put(getWithdrawalsList(searchParam));
  if (isCloseDrawer) yield put(closeDrawer());
}

// 取得該商家可下發的支付方式
function* getWithdrawalsListPaymentMethodsFn({ payload }) {
  console.log('取得該商家可下發的支付方式,param:');
  console.log(payload);

  yield call(axiosData, API.GET_PAYMENT_METHODS());

  const { setKey: getDataKey } = API.GET_PAYMENT_METHODS({});
  const getJson = state =>
    state.axios.key?.[getDataKey.page]?.[getDataKey.function];
  const selectGroup = yield select(getJson);

  if (selectGroup) {
    sessionStorage.setItem(
      'editWithdrawalsLisListParam',
      JSON.stringify(payload)
    );
    yield put(
      setParams({
        sessionStorageKey: 'editWithdrawalsLisListParam',
        dispatchType: editWithdrawalsListData,
      })
    );
    yield put(openMessage());
    yield put(setMessageTitle('支付方式'));
    yield put(setContent([['select', 'xl', selectGroup]]));
  }
}

export function* watchWithdrawalsList() {
  yield takeEvery(getWithdrawalsList, getWithdrawalsListFn);

  yield takeEvery(getDetailWithdrawalsList, getDetailWithdrawalsListFn);

  yield takeEvery(
    getWithdrawalsListRemarkHistory,
    getWithdrawalsListRemarkHistoryFn
  );

  yield takeEvery(editWithdrawalsListData, editWithdrawalsListDataFn);
  yield takeEvery(
    getWithdrawalsListPaymentMethods,
    getWithdrawalsListPaymentMethodsFn
  );
}
