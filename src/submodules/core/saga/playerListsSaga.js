import { takeEvery, call, take } from 'redux-saga/effects';
import { axiosData } from './axiosSaga';
import { PLAYER_LISTS as API } from 'Constants/api/api';
import {
  getPlayerListsAction,
  getPlayerDetailsAction,
  upgradeLevelOneAction,
  editUplineAction,
  editAccessLimitAction,
  getOddsRangeAction,
  getTopLineOddsRangeAction,
  addNewPlayerAction,
  editPlayerBasicAction,
  getCapitalFlowListAction,
  getTotalDepositAction,
  getTotalWithdrawalsAction,
  getTotalBettingRecordAction,
  getPlayerChartDataAction,
  getPlayerChartDataAction2,
  getTotalDownLineCountAction,
  getGameTypeAction,
  getPlayerProfileAction,
  getPlayerDepositAction,
  getWalletListAction,
  getWalletValueAction,
  getBankCardListAction,
  deleteBankCardAction,
  getGameReportAction,
  getPromoListAction,
  editPromoListAction,
  getDownLineListAction,
  sendMessageAction,
  editUnbindAction,
  editPlayerUnlockAction,
  getTimeLineListAction,
  getTotalAssetsAmountAction,
  editAmountAdjustmentAction,
  editWalletTransferAction,
  editApplyForRechargeAction,
  editApplyForWithdrawalAction,
  checkTopLineAccountAction,
} from 'Redux/axios/action';
//玩家列表
function* getPlayerLists({ payload }) {
  console.log('取得玩家列表 API 18-1', payload);
  yield call(axiosData, API.GET_PLAYER_LISTS(payload));
}
function* upgradeLevelOne({ payload }) {
  console.log('批量升為層級一 API 18-2', payload);
  yield call(axiosData, API.UPGRADE_LEVEL_ONE(payload));
  yield getPlayerLists({ payload });
}
function* editUpline({ payload }) {
  console.log('批量修改上級 API 18-3', payload);
  yield call(axiosData, API.EDIT_UPLINE(payload));
  yield getPlayerLists({ payload });
}
function* editAccessLimit({ payload }) {
  console.log(' 批量修改權限為代理 API18-4', payload);
  yield call(axiosData, API.GET_PLAYER_DETAILS(payload));
  yield getPlayerLists({ payload });
}
function* editUnlock({ payload }) {
  console.log(' 批量修改權限為代理 API18-5', payload);
  yield call(axiosData, API.EDIT_PLAYER_UNLOCK(payload));
  yield getPlayerLists({ payload });
}
function* checkTopLineAccount({ payload }) {
  console.log('確認上級帳號是否存在', payload);
  yield call(axiosData, API.GET_TOPLINE_ACCOUNT(payload));
}
function* getPlayerDetails({ payload }) {
  console.log('取得該玩家詳細資料 API18-6', payload);
  yield call(axiosData, API.GET_PLAYER_DETAILS(payload));
}
//玩家列表 新增玩家
function* getOddsRange({ payload }) {
  console.log('查詢商家的獎金組範圍 API 18-a-1', payload);
  yield call(axiosData, API.GET_PLAYER_ODDS_RANGE(payload));
}
function* getToplineOddsRange({ payload }) {
  console.log('查詢上級帳號的獎金組範圍 API 18-a-2', payload);
  yield call(axiosData, API.GET_TOPLINE_ODDS_RANGE(payload));
}
function* addNewPlayer({ payload }) {
  console.log('新增一筆用戶資料 API 18-a-3', payload);
  yield call(axiosData, API.ADD_NEW_PLAYER(payload));
}
//玩家列表 編輯玩家
function* editPlayerBasic({ payload }) {
  console.log('編輯玩家 基本信息', payload);
  yield call(axiosData, API.EDIT_PLAYER_BASIC(payload));
}
//玩家列表 玩家詳情 PlayerProfile.js
function* getPlayerProfile({ payload }) {
  console.log('取得該玩家詳細資料Profile', payload);
  const response = yield call(axiosData, API.GET_PLAYER_PROFILE(payload));
  console.log('function*getPlayerProfile -> response', response);
}
function* getPlayerDeposit({ payload }) {
  console.log('取得該玩家總資產', payload);
  yield call(axiosData, API.GET_PLAYER_DEPOSIT(payload));
}
function* getGameReport({ payload }) {
  console.log('取得遊戲報表', payload);
  yield call(axiosData, API.GET_GAME_REPORT(payload));
}
function* getPromoList({ payload }) {
  console.log('取得發送優惠列表', payload);
  yield call(axiosData, API.GET_PROMO_LIST(payload));
}
function* editPromoList({ payload }) {
  console.log('修改發送優惠列表', payload);
  yield call(axiosData, API.EDIT_PROMO_LIST(payload));
  const params = { playerID: payload.playerID, type: payload.type };
  yield getPromoList({ payload: params });
}
function* getDownLineList({ payload }) {
  console.log('取得下級名單', payload);
  yield call(axiosData, API.GET_DOWN_LINE_LIST(payload));
}
function* sendMessage({ payload }) {
  console.log('發送站內信', payload);
  yield call(axiosData, API.SEND_MESSAGE(payload));
}
function* editUnbind({ payload }) {
  console.log('解除登录方式绑定', payload);
  yield call(axiosData, API.EDIT_UNBIND(payload));
}
function* getWalletList({ payload }) {
  console.log('取得三方遊戲列表', payload);
  yield call(axiosData, API.GET_WALLET_LIST(payload));
}
function* getWalletValue({ payload }) {
  console.log('取得三方額度', payload);
  yield call(axiosData, API.GET_WALLET_VALUE(payload));
}
function* getBankCardList({ payload }) {
  console.log('取得銀行卡列表', payload);
  yield call(axiosData, API.GET_BANK_CARD_LIST(payload));
}
function* getTimeLineList({ payload }) {
  console.log('取得登入日誌', payload);
  yield call(axiosData, API.GET_TIME_LINE_LIST(payload));
}
function* deleteBankCard({ payload }) {
  console.log('刪除銀行卡', payload);
  yield call(axiosData, API.DELETE_BANK_CARD(payload));
}
//玩家列表 玩家紀錄 PlayerRecord.js
function* getTotalDeposit({ payload }) {
  console.log('取得今日入款總金額', payload);
  yield call(axiosData, API.GET_TOTAL_DEPOSIT(payload));
}
function* getTotalWithdrawals({ payload }) {
  console.log('取得今日出款總金額', payload);
  yield call(axiosData, API.GET_TOTAL_WITHDRAWALS(payload));
}
function* getCapitalFlowList({ payload }) {
  console.log('取得資金流水列表', payload);
  yield call(axiosData, API.GET_CAPITAL_FLOW_LIST(payload));
}
function* getTotalBettingRecord({ payload }) {
  console.log('取得今日投注記錄總金額', payload);
  yield call(axiosData, API.GET_TOTAL_BETTING_RECORD(payload));
}
function* getPlayerChartData({ payload }) {
  console.log('取得平台表現 圖檔資料', payload);
  yield call(axiosData, API.GET_PLAYER_CHART_DATA(payload));
}
function* getPlayerChartData2({ payload }) {
  console.log('取得產品表現 圖檔資料', payload);
  yield call(axiosData, API.GET_PLAYER_CHART_DATA2(payload));
}
function* getTotalDownLineCount({ payload }) {
  console.log('取得全部下級人數', payload);
  yield call(axiosData, API.GET_TOTAL_DOWN_LINE_COUNT(payload));
}
function* getGameType({ payload }) {
  console.log('取得全部遊戲類型', payload);
  yield call(axiosData, API.GET_GAME_TYPE(payload));
}
function* getTotalAssetsAmount({ payload }) {
  console.log('取得總資產、鎖定金額', payload);
  yield call(axiosData, API.GET_TOTAL_ASSETS_AMOUNT(payload));
}
function* editAmountAdjustment({ payload }) {
  console.log('設定玩家服務的金額調整', payload);
  yield call(axiosData, API.EDIT_AMOUNT_ADJUSTMENT(payload));
}
function* editWalletTransfer({ payload }) {
  console.log('設定玩家服務的錢包轉帳', payload);
  yield call(axiosData, API.EDIT_WALLET_TRANSFER(payload));
}
function* editApplyForRecharge({ payload }) {
  console.log('設定玩家服務的提交充值', payload);
  yield call(axiosData, API.EDIT_APPLY_FOR_RECHARGE(payload));
}
function* editApplyForWithdrawal({ payload }) {
  console.log('設定玩家服務的提交提款', payload);
  yield call(axiosData, API.EDIT_APPLY_FOR_WITHDRAWAL(payload));
}
export function* watchPlayerLists() {
  yield takeEvery(getPlayerListsAction, getPlayerLists);
  yield takeEvery(upgradeLevelOneAction, upgradeLevelOne);
  yield takeEvery(editUplineAction, editUpline);
  yield takeEvery(editAccessLimitAction, editAccessLimit);
  yield takeEvery(editPlayerUnlockAction, editUnlock);
  yield takeEvery(checkTopLineAccountAction, checkTopLineAccount);
  yield takeEvery(getPlayerDetailsAction, getPlayerDetails);
  yield takeEvery(getPlayerProfileAction, getPlayerProfile);
  yield takeEvery(getPlayerDepositAction, getPlayerDeposit);
  yield takeEvery(getWalletListAction, getWalletList);
  yield takeEvery(getWalletValueAction, getWalletValue);
  yield takeEvery(getBankCardListAction, getBankCardList);
  yield takeEvery(deleteBankCardAction, deleteBankCard);
  yield takeEvery(getTimeLineListAction, getTimeLineList);
  yield takeEvery(getGameReportAction, getGameReport);
  yield takeEvery(getPromoListAction, getPromoList);
  yield takeEvery(editPromoListAction, editPromoList);
  yield takeEvery(getDownLineListAction, getDownLineList);
  yield takeEvery(sendMessageAction, sendMessage);
  yield takeEvery(editUnbindAction, editUnbind);
  yield takeEvery(getOddsRangeAction, getOddsRange);
  yield takeEvery(getTopLineOddsRangeAction, getToplineOddsRange);
  yield takeEvery(addNewPlayerAction, addNewPlayer);
  yield takeEvery(editPlayerBasicAction, editPlayerBasic);
  yield takeEvery(getTotalDepositAction, getTotalDeposit);
  yield takeEvery(getTotalWithdrawalsAction, getTotalWithdrawals);
  yield takeEvery(getCapitalFlowListAction, getCapitalFlowList);
  yield takeEvery(getTotalBettingRecordAction, getTotalBettingRecord);
  yield takeEvery(getPlayerChartDataAction, getPlayerChartData);
  yield takeEvery(getPlayerChartDataAction2, getPlayerChartData2);
  yield takeEvery(getTotalDownLineCountAction, getTotalDownLineCount);
  yield takeEvery(getGameTypeAction, getGameType);
  yield takeEvery(getTotalAssetsAmountAction, getTotalAssetsAmount);
  yield takeEvery(editAmountAdjustmentAction, editAmountAdjustment);
  yield takeEvery(editWalletTransferAction, editWalletTransfer);
  yield takeEvery(editApplyForRechargeAction, editApplyForRecharge);
  yield takeEvery(editApplyForWithdrawalAction, editApplyForWithdrawal);
}
