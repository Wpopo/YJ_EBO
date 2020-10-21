import { createAction } from 'redux-actions';

export const requestData = createAction('REQUEST_DATA');
export const receiveSuccess = createAction('RECEIVE_SUCCESS');
export const receiveFail = createAction('RECEIVE_FAIL');
export const receiveDone = createAction('RECEIVE_DONE');

// for saga
// 金流管理 存款列表
export const getDepositList = createAction('GET_DEPOSIT_LIST');
export const getDepositListRemarkHistory = createAction(
  'GET_DEPOSIT_LIST_REMARK_HISTORY'
);
export const editDepositListData = createAction('EDIT_DEPOSIT_LIST_DATA');

// 金流管理 提款列表
export const getWithdrawalsList = createAction('GET_WITHDRAWALS_LIST');
export const getDetailWithdrawalsList = createAction(
  'GET_DETAIL_WITHDRAWALS_LIST'
);
export const getWithdrawalsListRemarkHistory = createAction(
  'GET_WITHDRAWALS_LIST_REMARK_HISTORY'
);
export const editWithdrawalsListData = createAction(
  'EDIT_WITHDRAWALS_LIST_DATA'
);
export const getWithdrawalsListPaymentMethods = createAction(
  'GET_WITHDRAWALS_LIST_PAYMENT_METHODS'
);

// 金流設置 銀行管理
export const getBankList = createAction('GET_BANK_LIST');
export const getDetailTargetGroupWithFee = createAction(
  'GET_DETAIL_TARGET_GROUP_WITH_FEE'
);
export const editDetailBankList = createAction('EDIT_DETAIL_BANK_LIST');
export const editDetailBankList2 = createAction('EDIT_DETAIL_BANK_LIST_2');
export const addDetailBankList = createAction('ADD_DETAIL_BANK_LIST');
export const getLimitReached = createAction('GET_LIMIT_REACHED');
export const editLimitReached = createAction('EDIT_LIMIT_REACHED');
export const getTargetGroupWithFee = createAction('GET_TARGET_GROUP_WITH_FEE');
export const getBankNameList = createAction('GET_BANK_NAME_LIST');

// 金流設置 在線支付
export const getGatewayList = createAction('GET_GATEWAY_LIST');
export const editDetailGatewayList = createAction('EDIT_DETAIL_GATEWAY_LIST');
export const editDetailGatewayList2 = createAction(
  'EDIT_DETAIL_GATEWAY_LIST_2'
);
export const addDetailGatewayList = createAction('ADD_DETAIL_GATEWAY_LIST');
export const getPaymentProvider = createAction('GET_PAYMENT_PROVIDER');
export const getPaymentMethod = createAction('GET_PAYMENT_METHOD');
export const getPaymentOption = createAction('GET_PAYMENT_OPTION');
export const getAccountNumber = createAction('GET_ACCOUNT_NUMBER');
export const getAccountNumberHistory = createAction(
  'GET_ACCOUNT_NUMBER_HISTORY'
);

// 金流設置 在線支付
export const getPaymentRiskList = createAction('GET_PAYMENT_RISK_LIST');
export const editWithdrawalsDetail = createAction('GET_WITHDRAWALS_DETAIL');
export const getDetailPaymentRiskProvider = createAction(
  'GET_DETAIL_PAYMENT_RISK_PROVIDER'
);
export const editDetailPaymentRiskProvider = createAction(
  'EDIT_DETAIL_PAYMENT_RISK_PROVIDER'
);
export const getTargetGroupPaymentRisk = createAction(
  'GET_TARGET_GROUP_PAYMENT_RISK'
);
export const editTargetGroupPaymentRisk = createAction(
  'EDIT_TARGET_GROUP_PAYMENT_RISK'
);

//風控警報 警報列表
export const getAllConditionAction = createAction('GET_ALL_CONDITION_ACTION');
export const getAllPlayersAction = createAction('GET_ALL_PLAYERS_ACTION');

//風控警報 受限玩家
export const getPlayerListAction = createAction('GET_PLAYER_LIST_ACTION');

// 風控警報 新增警報
export const getRiskAlertListAction = createAction(
  'GET_RISK_ALERT_LIST_ACTION'
);
export const editRiskAlertListAction = createAction(
  'EDIT_RISK_ALERT_LIST_ACTION'
);

//風控警報 警報註記玩家限制
export const getAlertNameListAction = createAction(
  'GET_ALERT_NAME_LIST_ACTION'
);

export const getPlayerAlertsAction = createAction('GET_PLAYER_ALERTS_ACTION');
export const savePlayerAlertDataAction = createAction(
  'SAVE_PLAYER_ALERT_DATA_ACTION'
);
export const getPlayerAlertsDetailAction = createAction(
  'GET_PLAYER_ALERTS_DETAIL_ACTION'
);
export const getPlayerAlertsLogAction = createAction(
  'GET_PLAYER_ALERTS_LOG_ACTION'
);
export const savePlayerRestricDetailAction = createAction(
  'SAVE_PLAYER_RESTRIC_DETAIL_ACTION'
);

// 系统设置 商家设置
export const getMerchantInfo = createAction('GET_MERCHANT_INFO');
export const editMerchantInfo = createAction('EDIT_MERCHANT_INFO');
export const getLogListInfo = createAction('GET_LOG_LIST_INFO');

// 游戏设置 游戏列表
export const getLotteryList = createAction('GET_LOTTERY_LIST');
// ------ 新增品牌彩
export const getLotteryGroup = createAction('GET_LOTTERY_GROUP');
export const addLottery = createAction('ADD_LOTTERY');
// ------ 游戏设置
export const getLotterySettings = createAction('GET_LOTTERY_SETTINGS');
export const editLotterySettings = createAction('EDIT_LOTTERY_SETTINGS');
export const editLotteryStatus = createAction('EDIT_LOTTERY_STATUS');

// 游戏设置 菜单设置
export const getNormalLotteries = createAction('GET_NORMAL_LOTTERIES');
export const getMenuSettings = createAction('GET_MENU_SETTINGS');
export const editMenuSettings = createAction('EDIT_MENU_SETTINGS');

//玩家管理 玩家列表
export const getPlayerListsAction = createAction('GET_PLAYER_LISTS_ACTION');
export const upgradeLevelOneAction = createAction('UPGRADE_LEVEL_ONE');
export const editUplineAction = createAction('EDIT_UPLINE_ACTION');
export const editAccessLimitAction = createAction('EDIT_ACCESS_LIMIT_ACTION');
export const editPlayerUnlockAction = createAction('EDIT_PLAYER_UNLOCK_ACTION');
export const getPlayerDetailsAction = createAction('GET_PLAYER_DETAILS_ACTION');
export const checkTopLineAccountAction = createAction('CHECK_TOPLINE_ACCOUNT');

//玩家管理 新增玩家
export const getOddsRangeAction = createAction('GET_ODDS_RANGE');
export const getTopLineOddsRangeAction = createAction('GET_TOPLINE_ODDS_RANGE');
export const addNewPlayerAction = createAction('ADD_NEW_PLAYER_ACTION');
// 玩家管理 玩家詳情 玩家信息
export const getPlayerProfileAction = createAction('GET_PLAYER_PROFILE_ACTION');
export const getPlayerDepositAction = createAction('GET_PLAYER_DEPOSIT_ACTION');
export const getWalletListAction = createAction('GET_WALLET_LIST_ACTION');
export const getWalletValueAction = createAction('GET_WALLET_VALUE_ACTION');
export const getBankCardListAction = createAction('GET_BANK_CARD_LIST_ACTION');
export const getTimeLineListAction = createAction('GET_TIME_LINE_LIST_ACTION');
export const deleteBankCardAction = createAction('DELETE_BANK_CARD_ACTION');
export const getGameReportAction = createAction('GET_GAME_REPORT_ACTION');
//與(與數據概覽頁共用)=
export const getPromoListAction = createAction('GET_PROMO_LIST_ACTION');
export const editPromoListAction = createAction('EDIT_PROMO_LIST_ACTION');
export const getDownLineListAction = createAction('GET_DOWN_LINE_LIST_ACTION');
export const sendMessageAction = createAction('SEND_MESSAGE_ACTION');
export const editUnbindAction = createAction('EDIT_UNBIND_ACTION');

// 玩家管理 編輯玩家
export const editPlayerBasicAction = createAction('EDIT_PLAYER_BASIC_ACTION');

// 玩家管理 玩家詳情 玩家紀錄
export const getCapitalFlowListAction = createAction('GET_CAPITAL_FLOW_LIST');
export const getTotalDepositAction = createAction('GET_TOTAL_DEPOSIT');
export const getTotalWithdrawalsAction = createAction('GET_TOTAL_WITHDRAWALS');
export const getTotalBettingRecordAction = createAction(
  'GET_TOTAL_BETTING_RECORD'
);
// 玩家管理 玩家詳情 其他信息
export const getPlayerChartDataAction = createAction('GET_PLAYER_CHART_DATA');
export const getPlayerChartDataAction2 = createAction('GET_PLAYER_CHART_DATA2');
export const getTotalDownLineCountAction = createAction(
  'GET_TOTAL_DOWN_LINE_COUNT'
);
export const getGameTypeAction = createAction('GET_GAME_TYPE');
// 玩家管理 玩家詳情 玩家服務
export const getTotalAssetsAmountAction = createAction(
  'GET_TOTAL_ASSETS_AMOUNT'
);
export const editAmountAdjustmentAction = createAction(
  'EDIT_AMOUNT_ADJUSTMENT'
);
export const editWalletTransferAction = createAction('EDIT_WALLET_TRANSFER');

export const editApplyForRechargeAction = createAction(
  'EDIT_APPLY_FOR_RECHARGE'
);
export const editApplyForWithdrawalAction = createAction(
  'EDIT_APPLY_FOR_WITHDRAWAL'
);

// 游戏管理
export const getGameCategories = createAction('GET_GAME_CATEGORIES');
export const getGameList = createAction('GET_GAME_LIST');
export const getDashboard = createAction('GET_DASHBOARD');
export const resetPool = createAction('RESET_POOL');
export const manualDraw = createAction('MANUAL_DRAW');
export const revokeDraw = createAction('REVOKE_DRAW');
export const correctDraw = createAction('CORRECT_DRAW');

// 通訊系統
export const getInBoxList = createAction('GET_INBOX_LIST');
export const getSendMailList = createAction('GET_SEND_MAIL_LIST');
export const getAnnouncementList = createAction('GET_ANNOUNCEMENT_LIST');
