import { fork } from 'redux-saga/effects';
import { watchCloseMessage, watchDelete } from './messageSaga';
import { watchDepositList } from './depositListSaga';
import { watchWithdrawalsList } from './withdrawalsListSaga';
import { watchBankList } from './bankListSaga';
import { watchGatewayList } from './gatewayListSaga';
import { watchPaymentRisk } from './paymentRiskSaga';
import { watchRiskAlertsEditMark } from './riskAlertsEditMarkSaga';
import { watchRiskAlertsEditSaga } from './riskAlertsEditSaga';
import { watchRiskAlertsSaga } from './riskAlertsSaga';
import { watchPlayerRestrictions } from './playerRestrictionsSaga';
import { watchMerchantSaga } from './merchantSaga';
import { watchLotteryListSaga } from './lotteryListSaga';
import { watchLotteryMenuSettingsSaga } from './lotteryMenuSettingsSaga';
import { watchPlayerLists } from './playerListsSaga';
import { watchGameManagementSaga } from './gameManagementSaga';
import { watchCommunication } from './communicationSaga';

export default function* rootSaga() {
  yield fork(watchCloseMessage);
  yield fork(watchDelete);
  yield fork(watchDepositList);
  yield fork(watchWithdrawalsList);
  yield fork(watchBankList);
  yield fork(watchGatewayList);
  yield fork(watchPaymentRisk);
  yield fork(watchRiskAlertsEditMark);
  yield fork(watchRiskAlertsEditSaga);
  yield fork(watchRiskAlertsSaga);
  yield fork(watchPlayerRestrictions);
  yield fork(watchMerchantSaga);
  yield fork(watchLotteryListSaga);
  yield fork(watchLotteryMenuSettingsSaga);
  yield fork(watchPlayerLists);
  yield fork(watchGameManagementSaga);
  yield fork(watchCommunication);
}
