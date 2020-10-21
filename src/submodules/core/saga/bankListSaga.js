import { takeEvery, put, call, select } from 'redux-saga/effects';
import Helper from 'Helper';
import { BANK_LIST as API } from 'Constants/api/api';
import {
  openMessage,
  setMessageTitle,
} from 'Redux/uiMBO/uiMessagePopup/action';
import { setContent, setParams } from 'Redux/messagePopup/action';
import {
  getBankList,
  getDetailTargetGroupWithFee,
  editDetailBankList,
  editDetailBankList2,
  addDetailBankList,
  getLimitReached,
  editLimitReached,
  getTargetGroupWithFee,
  getBankNameList,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

// 取得銀行收款渠道列表
function* getBankListFn({ payload }) {
  console.log('取得銀行收款渠道列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_LIST(payload));
}

// 取得該筆資金層級今日存款詳細資料
export function* getDetailTargetGroupWithFeeFn({ payload }) {
  console.log('取得該筆資金層級今日存款詳細資料, id:' + payload);

  yield call(axiosData, API.GET_DETAIL_TARGET_GROUP_WITH_FEE(payload));
}

// 修改該筆銀行收款渠道資料
function* editDetailBankListFn({ payload }) {
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
  console.log('修改該筆銀行收款渠道資料, param:');
  console.log(param);

  yield call(getDetailTargetGroupWithFeeFn, { payload: param.paymentOptionID });
  const {
    setKey: getDetailTargetGroupWithFeeKey,
  } = API.GET_DETAIL_TARGET_GROUP_WITH_FEE({});
  const getJson = state =>
    state.axios.key?.[getDetailTargetGroupWithFeeKey.page]?.[
      getDetailTargetGroupWithFeeKey.function
    ];
  const result = yield select(getJson);

  if (result) {
    param = { ...param, targetGroupWithFee: result.json };
    yield call(axiosData, API.EDIT_DETAIL_LIST(param));
    yield put(getBankList(searchParam));
  }
}

function* editDetailBankListFn2({ payload }) {
  if (payload.amountPerDepositFrom.length <= 0) {
    payload = { ...payload, amountPerDepositFrom: '0' };
  }
  if (payload.amountPerDepositTo.length <= 0) {
    payload = { ...payload, amountPerDepositTo: '-1' };
  }
  if (payload.depositAlertLimit.length <= 0) {
    payload = { ...payload, depositAlertLimit: '-1' };
  }
  console.log('修改該筆銀行收款渠道資料, param:');
  console.log(payload);

  yield call(axiosData, API.EDIT_DETAIL_LIST(payload));
  yield put(getBankList(payload));
}

// 新增一筆銀行收款渠道資料
function* addDetailBankListFn({ payload }) {
  if (payload.amountPerDepositFrom.length <= 0) {
    payload = { ...payload, amountPerDepositFrom: '0' };
  }
  if (payload.amountPerDepositTo.length <= 0) {
    payload = { ...payload, amountPerDepositTo: '-1' };
  }
  if (payload.depositAlertLimit.length <= 0) {
    payload = { ...payload, depositAlertLimit: '-1' };
  }
  console.log('修改該筆銀行收款渠道資料, param:');
  console.log(payload);
  yield call(axiosData, API.ADD_DETAIL_LIST(payload));
}

// 取得已達限額修改記錄
function* getLimitReachedFn({ payload }) {
  console.log('取得已達限額修改記錄, id:' + payload);
  const tableColumns = [
    {
      Header: '操作日期',
      accessor: 'time',
      width: 130,
    },
    {
      Header: '操作前',
      align: 'right',
      width: 120,
      Cell: ({ row: { original } }) =>
        Helper.number.format({ num: original.before, nanValue: '－' }),
    },
    {
      Header: '操作后',
      align: 'right',
      width: 125,
      Cell: ({ row: { original } }) =>
        typeof original.after === 'object'
          ? original.after
          : Helper.number.format({
              num: original.after,
              nanValue: '－',
            }),
    },
    {
      Header: '操作者',
      accessor: 'user',
      width: 90,
    },
  ];

  yield call(axiosData, API.GET_LIMIT_REACHED(payload));
  const { setKey: getLimitReachedKey } = API.GET_LIMIT_REACHED({});
  const getJson = state =>
    state.axios.key?.[getLimitReachedKey.page]?.[getLimitReachedKey.function];
  const result = yield select(getJson);
  if (result) {
    sessionStorage.setItem(
      'editLimitReachedParam',
      JSON.stringify({ paymentOptionID: payload, depositAmount: 0 })
    );

    yield put(
      setParams({
        sessionStorageKey: 'editLimitReachedParam',
        dispatchType: editLimitReached,
      })
    );
    yield put(setContent([['table', tableColumns, result]]));
    yield put(setMessageTitle('已达限额历程'));
    yield put(openMessage());
  }
}

// 修改已達限額修改記錄
function* editLimitReachedFn({ payload }) {
  console.log('修改已達限額修改記錄, param:');
  console.log(payload);

  yield call(axiosData, API.EDIT_LIMIT_REACHED(payload));
}

// 取得商家所有支付群組列表
function* getTargetGroupWithFeeFn({ payload }) {
  console.log('取得商家所有支付群組列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_TARGET_GROUP_WITH_FEE(payload));
}

// 取得銀行列表
function* getBankNameListFn() {
  console.log('取得銀行列表');

  yield call(axiosData, API.GET_BANK_NAME_LIST());
}

export function* watchBankList() {
  yield takeEvery(getBankList, getBankListFn);

  yield takeEvery(getDetailTargetGroupWithFee, getDetailTargetGroupWithFeeFn);

  yield takeEvery(editDetailBankList, editDetailBankListFn);

  yield takeEvery(editDetailBankList2, editDetailBankListFn2);

  yield takeEvery(addDetailBankList, addDetailBankListFn);

  yield takeEvery(getLimitReached, getLimitReachedFn);

  yield takeEvery(editLimitReached, editLimitReachedFn);

  yield takeEvery(getTargetGroupWithFee, getTargetGroupWithFeeFn);

  yield takeEvery(getBankNameList, getBankNameListFn);
}
