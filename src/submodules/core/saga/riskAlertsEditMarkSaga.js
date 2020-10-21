import { takeEvery, put, delay, call } from 'redux-saga/effects';
import {
  closeMessage,
  openMessage,
  setMessageTitle,
} from 'Redux/uiMBO/uiMessagePopup/action';
import { axiosData } from './axiosSaga';
import {
  RISK_ALERTS as API_RISK_ALERTS,
  PLAYER_RESTRICTIONS as API_PLAYER_RESTRICTIONS,
} from 'Constants/api/api';
import { setContent } from 'Redux/messagePopup/action';
import {
  getAlertNameListAction,
  getPlayerAlertsAction,
  savePlayerAlertDataAction,
  getPlayerAlertsDetailAction,
  getPlayerAlertsLogAction,
  savePlayerRestricDetailAction,
} from 'Redux/axios/action';

function* getAlertNameList({ payload }) {
  console.log('取得該player觸發的警報名稱列表 API9-1, param:', payload);
  yield call(axiosData, API_RISK_ALERTS.GET_ALERT_NAME_LIST(payload));
}
function* getPlayerAlerts({ payload }) {
  console.log(
    '取得該player在特定警報名稱下觸發的警報列表名稱 API9-2, param:',
    payload
  );
  yield call(axiosData, API_RISK_ALERTS.GET_PLAYER_ALERTS(payload));
}
function* savePlayerAlertData({ payload }) {
  console.log('修改該Player指定警報情況的資料 API9-3, param:', payload);
  const param = JSON.parse(localStorage.getItem('savePlayerAlertDataParam'));
  localStorage.removeItem('savePlayerAlertDataParam');
  console.log(param);
  yield call(axiosData, API_RISK_ALERTS.SAVE_PLAYER_ALERT_DATA(param));

  yield put(closeMessage());
  yield put(setMessageTitle('保存成功'));
  yield put(setContent([]));
  yield put(openMessage());
  yield delay(1000);
  yield put(closeMessage());

  const param2 = {
    currentPage: 1,
    merchant: param.merchant,
    merchantGroup: param.merchantGroup,
    playerID: param.playerID,
    quantityPerPage: param.quantityPerPage,
    ruleName: param.ruleName,
    ruleStatus: param.ruleStatus,
    ruleType: param.ruleType,
  };
  yield put(getAlertNameListAction(param2));
  yield put(getPlayerAlertsAction(param2));
}

function* getPlayerAlertsDetail({ payload }) {
  console.log('取得該Player限制的詳細狀態 API10-1,param:', payload);
  yield call(
    axiosData,
    API_PLAYER_RESTRICTIONS.GET_PLAYER_ALERTS_DETAIL(payload)
  );
  console.log('取得該Player遊戲產品的詳細限制狀況 API10-3 爱码彩票');
  yield call(
    axiosData,
    API_PLAYER_RESTRICTIONS.GET_PLAYER_ALERTS_PRODUCT({
      ...payload,
      productID: 'iNumLottery',
    })
  );
  console.log('取得該Player遊戲產品的詳細限制狀況 API10-3 红包游戏');
  yield call(
    axiosData,
    API_PLAYER_RESTRICTIONS.GET_PLAYER_ALERTS_PRODUCT({
      ...payload,
      productID: 'redPocket',
    })
  );
}
function* getPlayerAlertsLog({ payload }) {
  console.log('取得該Player風控狀態歷程 API10-2, param:', payload);
  yield call(axiosData, API_PLAYER_RESTRICTIONS.GET_PLAYER_ALERTS_LOG(payload));
}
function* savePlayerRestricDetail(action) {
  console.log('修改該Player限制的詳細資料 API10-4, param:');
  const param = JSON.parse(
    localStorage.getItem('savePlayerRestricDetailParam')
  );
  console.log(param);

  localStorage.removeItem('savePlayerRestricDetailParam');
  yield call(
    axiosData,
    API_PLAYER_RESTRICTIONS.SAVE_PLAYER_RESTRIC_DETAIL(param)
  );
  yield put(closeMessage());
  yield put(setMessageTitle('保存成功'));
  yield put(openMessage());
  yield delay(2000);
  yield put(closeMessage());
  const actionGetPlayer = {
    merchant: param.merchant,
    merchantGroup: param.merchantGroup,
    playerID: param.playerID,
  };
  yield put(getPlayerAlertsDetailAction(actionGetPlayer));
}

export function* watchRiskAlertsEditMark() {
  yield takeEvery(getAlertNameListAction, getAlertNameList);
  yield takeEvery(getPlayerAlertsAction, getPlayerAlerts);
  yield takeEvery(savePlayerAlertDataAction, savePlayerAlertData);
  yield takeEvery(getPlayerAlertsDetailAction, getPlayerAlertsDetail);
  yield takeEvery(getPlayerAlertsLogAction, getPlayerAlertsLog);
  yield takeEvery(savePlayerRestricDetailAction, savePlayerRestricDetail);
}
