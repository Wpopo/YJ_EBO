import axios from 'axios';
import { tokenExpired } from 'Redux/identity/action';
import { add, sub, format } from 'date-fns';

axios.defaults.timeout = 5000;
// 域名
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

/**
 * 從 localStorage 獲取 token
 */
export const getLocalStorageToken = () => {
  try {
    let localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      return JSON.parse(localStorageToken);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * http request 欄截
 */
axios.interceptors.request.use(
  config => {
    let tokenObj = getLocalStorageToken();
    config.data = JSON.stringify(config.data);
    config.headers = {
      // 如果沒有cors的問題則可以都不加
      'Access-Control-Allow-Origin': process.env.REACT_APP_API_BASE_URL,
      'Access-Control-Allow-Methods': 'GET, POST, PUT',
      Token: tokenObj ? tokenObj.token : '',
    };
    if (
      !config.withoutAuth &&
      tokenObj &&
      tokenObj.expireAt < new Date().getTime()
    ) {
      return Promise.reject({
        type: tokenExpired().type,
        message: '请重新登入！',
        config,
      });
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * http response 欄截
 */
// 異常處理
axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    console.log('err', err);
    if (err && err.response) {
      switch (err.response.status) {
        case 404:
          console.log('找不到该页面');
          err.response.message = '找不到该页面';
          break;
        case 500:
          console.log('伺服器出错');
          err.response.message = '伺服器出错';
          break;
        case 503:
          console.log('服务失效');
          err.response.message = '服务失效';
          break;
        default:
          console.log(`连接错误 ${err.response.status}`);
          err.response.message = `连接错误 ${err.response.status}`;
      }
      return Promise.reject(err.response);
    } else {
      console.log('连接到服务器失败');
      return Promise.reject(err);
    }
  }
);

/**
 * MAIN
 */
export const callApi = ({ url, params, method = 'POST', withoutAuth }) => {
  return (
    axios({
      url: `${url}`,
      method,
      data: params,
      withoutAuth,
    })
      .then(res => res.data)
      // TODO 測試用，與後端 API 對接後，整個 catch 要移除
      .catch(error => {
        switch (url) {
          // 取得玩家存款單列表
          case 'getDepositList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  isThirdParty: false,
                  time: '2020-01-01 10:10:10',
                  id: 'D200602111219470',
                  playerName: 'Ada',
                  amount: '999999999999',
                  status: '待审核',
                  requester: 'user001',
                  auditor: '－',
                  auditTime: '－',
                  depositorName: '野比大雄',
                  paymentType: '本地银行',
                  bankName: '建设银行',
                  accountNumber: '1234567890',
                  payeeName: '哆啦Ａ梦',
                  paymentMethod: '手动',
                  bonus: '123',
                  fee: '123',
                  actualAmount: '999999999999',
                },
                {
                  isThirdParty: true,
                  time: '2020-01-01 10:10:10',
                  id: 'D200602111398000',
                  playerName: 'Faithe',
                  amount: '999999999999',
                  status: '批准',
                  requester: 'user001',
                  auditor: 'user001',
                  auditTime: '2020-01-02 10:10:10',
                  depositorName: '野比大雄',
                  paymentType: '微信支付',
                  providerName: '富乐支付',
                  providerNumber: '1234567890',
                  paymentOption: 'H5支付',
                  paymentMethod: '自动',
                  bonus: '123',
                  fee: '123',
                  actualAmount: '999999999999',
                },
                {
                  isThirdParty: false,
                  time: '2020-01-01 10:10:10',
                  id: 'D200602387210000',
                  playerName: 'Gabrielle',
                  amount: '999999999999',
                  status: '拒绝',
                  requester: 'user001',
                  auditor: 'user001',
                  auditTime: '2020-01-02 10:10:10',
                  depositorName: '野比大雄',
                  paymentType: '本地银行',
                  bankName: '建设银行',
                  accountNumber: '1234567890',
                  payeeName: '哆啦Ａ梦',
                  paymentMethod: '手动',
                  bonus: '123',
                  fee: '123',
                  actualAmount: '999999999999',
                },
                {
                  isThirdParty: false,
                  time: '2020-01-01 10:10:10',
                  id: 'D200602041210000',
                  playerName: 'Hannah',
                  amount: '999999999999',
                  status: '撤销',
                  requester: 'user001',
                  auditor: 'user001',
                  auditTime: '2020-01-02 10:10:10',
                  depositorName: '野比大雄',
                  paymentType: '本地银行',
                  bankName: '建设银行',
                  accountNumber: '1234567890',
                  payeeName: '哆啦Ａ梦',
                  paymentMethod: '手动',
                  bonus: '123',
                  fee: '123',
                  actualAmount: '999999999999',
                },
                {
                  isThirdParty: false,
                  time: '2020-01-01 10:10:10',
                  id: 'D200602111210000',
                  playerName: 'Ida',
                  amount: '999999999999',
                  status: '跳转失败',
                  requester: 'user001',
                  auditor: 'user001',
                  auditTime: '2020-01-02 10:10:10',
                  depositorName: '野比大雄',
                  paymentType: '本地银行',
                  bankName: '建设银行',
                  accountNumber: '1234567890',
                  payeeName: '哆啦Ａ梦',
                  paymentMethod: '手动',
                  bonus: '123',
                  fee: '123',
                  actualAmount: '999999999999',
                },
              ],
            };

            break;
          // 取得該筆存款單詳細資料
          case 'getDetailDepositList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  id: typeof params.id === 'object' ? params.id.id : params.id,
                  state: '待审核',
                  data: {
                    v1: '2020-01-01 10:10:10',
                    v2: 'Ada',
                    v3: 'user001',
                    v4: '－',
                    v5: '－',
                    v6: '野比大雄',
                    v7: '999,999,999,999.000',
                    v8: '银行入款',
                    v9: '建设银行',
                    v10: '1234567890',
                    v11: '哆啦Ａ梦',
                    v12: '手动',
                    v13: '123.000',
                    v14: '',
                    v15: '999,999,999,999.000',
                    v16: '',
                  },
                },
              ],
            };

            break;
          // 取得該筆存款單備註歷程
          case 'getDepositListRemarkHistory':
          case 'getWithdrawalsListRemarkHistory':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  time: '2020-01-01 12:12:12',
                  user: 'user001',
                  content:
                    '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
                },
                {
                  time: '2020-01-01 12:12:12',
                  user: 'user001',
                  content:
                    '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
                },
                {
                  time: '2020-01-01 12:12:12',
                  user: 'user001',
                  content:
                    '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
                },
                {
                  time: '2020-01-01 12:12:12',
                  user: 'user001',
                  content:
                    '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
                },
              ],
            };

            break;
          // 取得玩家提款單列表
          case 'getWithdrawalsList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  time: '2020-01-01 10:10:10',
                  id: 'W200602111210947',
                  playerName: 'Ada',
                  amount: '999999999999',
                  status: '待审核',
                },
                {
                  time: '2020-01-01 10:10:10',
                  id: 'W200602111210033',
                  playerName: 'Faithe',
                  amount: '999999999999',
                  status: '批准',
                },
                {
                  time: '2020-01-01 10:10:10',
                  id: 'W200602111210300',
                  playerName: 'Gabrielle',
                  amount: '999999999999',
                  status: '拒绝',
                },
                {
                  time: '2020-01-01 10:10:10',
                  id: 'W200602111210800',
                  playerName: 'Hannah',
                  amount: '999999999999',
                  status: '待下发',
                },
                {
                  time: '2020-01-01 10:10:10',
                  id: 'W200602111210347',
                  playerName: 'Ida',
                  amount: '999999999999',
                  status: '已下发',
                },
              ],
            };

            break;
          // 取得該筆提款單詳細資料
          case 'getDetailWithdrawalsList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  id: typeof params.id === 'object' ? params.id.id : params.id,
                  state: '待审核',
                  data: {
                    v1: '2020-01-01 10:10:10',
                    v2: 'Ada',
                    v3: 'user001',
                    v4: '2020-01-02 10:10:10',
                    v5: 'user001',
                    v6: '－',
                    v7: '－',
                    v8: '野比大雄',
                    v9: '999999999999',
                    v10: '建设银行',
                    v11: '1234567890',
                    v12: '1234567890',
                    v13: ['可疑玩家', '禁止登录'],
                    v14: '999999999999',
                    v15: '999999999999',
                    v16: '999999999999',
                    v17: '999999999999',
                    v18: '【手动】农银上海支行－银行出款－上海银行',
                    v19: '123',
                    v20: '999999999999',
                    v21: '',
                  },
                },
              ],
            };

            break;
          // 取得該商家可下發的支付方式
          case 'WithdrawalsListPaymentMethods':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                { text: '【自动】乐付支付－微信支付－H5支付', value: 1 },
                { text: '【手动】农银上海支行－银行出款－上海银行', value: 2 },
              ],
            };

            break;
          // 取得銀行收款渠道列表
          case 'getBankList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  paymentOptionID: '001',
                  displayBankName: '农银上海支行',
                  bankName: '农业银行',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'true',
                  depositLimit: '4800',
                  depositAlertLimit: '1000',
                  depositMode: '非入款',
                  withdrawalMode: '手动出款',
                  device: '电脑端',
                  status: '启用',
                },
                {
                  paymentOptionID: '002',
                  displayBankName: '交银青岛支行',
                  bankName: '交通银行',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'false',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  depositMode: '非入款',
                  withdrawalMode: '自动出款',
                  device: '电脑端',
                  status: '启用',
                },
                {
                  paymentOptionID: '003',
                  displayBankName: '兴银长春支行',
                  bankName: '兴业银行',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'false',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  depositMode: '手动入款',
                  withdrawalMode: '非出款',
                  device: '电脑端',
                  status: '启用',
                },
                {
                  paymentOptionID: '004',
                  displayBankName: '广银义岛支行',
                  bankName: '广发银行',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'false',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  depositMode: '自动入款',
                  withdrawalMode: '非出款',
                  device: '电脑端',
                  status: '启用',
                },
                {
                  paymentOptionID: '005',
                  displayBankName: '上农滨江支行',
                  bankName: '上海农商',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'false',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  depositMode: '非入款',
                  withdrawalMode: '手动出款',
                  device: '电脑端',
                  status: '启用',
                },
                {
                  paymentOptionID: '006',
                  displayBankName: '建银上海支行',
                  bankName: '建设银行',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'false',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  depositMode: '手动入款',
                  withdrawalMode: '手动出款',
                  device: '电脑端',
                  status: '启用',
                },
                {
                  paymentOptionID: '007',
                  displayBankName: '民银南苑支行',
                  bankName: '民生银行',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'false',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  depositMode: '手动入款',
                  withdrawalMode: '自动出款',
                  device: '电脑端',
                  status: '启用',
                },
                {
                  paymentOptionID: '008',
                  displayBankName: '中信香港支行',
                  bankName: '中信银行',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'false',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  depositMode: '自动入款',
                  withdrawalMode: '手动出款',
                  device: '电脑端',
                  status: '暂停',
                },
                {
                  paymentOptionID: '009',
                  displayBankName: '上海上海支行',
                  bankName: '上海银行',
                  providerName: '富乐支付',
                  accountNumber: '123412341234',
                  accountName: '剛田武',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '1000',
                  accountNumberHide: 'false',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  depositMode: '自动入款',
                  withdrawalMode: '自动出款',
                  device: '电脑端',
                  status: '禁用',
                },
              ],
            };

            break;
          // 取得該筆銀行收款渠道詳細資料
          case 'getDetailTargetGroupWithFee':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  id: 'all',
                  groupName: '全部',
                  fee: '1',
                  amount: '999999999',
                  select: false,
                },
                {
                  id: '001',
                  groupName: '黑钻玩家',
                  fee: '1',
                  amount: '999999999',
                  select: true,
                },
                {
                  id: '002',
                  groupName: '钻石玩家',
                  fee: '2',
                  amount: '888888888',
                  select: true,
                },
                {
                  id: '003',
                  groupName: '白金玩家',
                  fee: '3',
                  amount: '777777777',
                  select: true,
                },
                {
                  id: '004',
                  groupName: '黄金玩家',
                  fee: '4',
                  amount: '666666666',
                  select: true,
                },
                {
                  id: '005',
                  groupName: '一般玩家',
                  fee: '5',
                  amount: '555555555',
                  select: true,
                },
              ],
            };

            break;
          // 已達限額修改記錄
          case 'getLimitReached':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  time: '2020-01-01 12:12:12',
                  before: '999',
                  after: '111',
                  user: 'user001',
                },
                {
                  time: '2020-01-01 12:12:12',
                  before: '1123',
                  after: '999',
                  user: 'user001',
                },
                {
                  time: '2020-01-01 12:12:12',
                  before: '111111',
                  after: '1123',
                  user: 'user001',
                },
                {
                  time: '2020-01-01 12:12:12',
                  before: '222222',
                  after: '111111',
                  user: 'user001',
                },
                {
                  time: '2020-01-01 12:12:12',
                  before: '333333',
                  after: '222222',
                  user: 'user001',
                },
                {
                  time: '2020-01-01 12:12:12',
                  before: '444444',
                  after: '333333',
                  user: 'user001',
                },
                {
                  time: '2020-01-01 12:12:12',
                  before: '555555',
                  after: '444444',
                  user: 'user001',
                },
                {
                  time: '2020-01-01 12:12:12',
                  before: '666666',
                  after: '555555',
                  user: 'user001',
                },
                {
                  time: '2020-01-01 12:12:12',
                  before: '999999',
                  after: '666666',
                  user: 'user001',
                },
              ],
            };
            break;
          // 取得商家所有支付群組列表
          case 'getTargetGroupWithFee':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  id: 'all',
                  groupName: '全部',
                  fee: '0',
                  amount: '0',
                  select: false,
                },
                {
                  id: '001',
                  groupName: '黑钻玩家',
                  fee: '0',
                  amount: '0',
                  select: false,
                },
                {
                  id: '002',
                  groupName: '钻石玩家',
                  fee: '0',
                  amount: '0',
                  select: false,
                },
                {
                  id: '003',
                  groupName: '白金玩家',
                  fee: '0',
                  amount: '0',
                  select: false,
                },
                {
                  id: '004',
                  groupName: '黄金玩家',
                  fee: '0',
                  amount: '0',
                  select: false,
                },
                {
                  id: '005',
                  groupName: '一般玩家',
                  fee: '0',
                  amount: '0',
                  select: false,
                },
              ],
            };
            break;
          // 取得銀行列表
          case 'getBankNameList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  text: '农业银行',
                },
                {
                  text: '交通银行',
                },
                {
                  text: '兴业银行',
                },
                {
                  text: '广发银行',
                },
                {
                  text: '上海农商',
                },
                {
                  text: '建设银行',
                },
                {
                  text: '民生银行',
                },
                {
                  text: '中信银行',
                },
                {
                  text: '上海银行',
                },
              ],
            };
            break;
          // 取得三方支付渠道列表
          case 'getGatewayList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  paymentOptionID: '001',
                  displayOptionName: '富乐微信',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '微信支付',
                  paymentOption: 'H5支付',
                  status: '启用',
                  depositMode: '非入款',
                  withdrawalMode: '手动出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '4800',
                  depositAlertLimit: '1000',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
                {
                  paymentOptionID: '002',
                  displayOptionName: '富乐支付宝',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '支付宝支付',
                  paymentOption: 'App支付',
                  status: '启用',
                  depositMode: '非入款',
                  withdrawalMode: '自动出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
                {
                  paymentOptionID: '003',
                  displayOptionName: '富乐银联',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '银联支付',
                  paymentOption: 'H5支付',
                  status: '启用',
                  depositMode: '手动入款',
                  withdrawalMode: '非出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
                {
                  paymentOptionID: '004',
                  displayOptionName: '富乐快捷',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '快捷支付',
                  paymentOption: 'App支付',
                  status: '启用',
                  depositMode: '自动入款',
                  withdrawalMode: '非出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
                {
                  paymentOptionID: '005',
                  displayOptionName: '富乐网银',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '网银支付',
                  paymentOption: 'H5支付',
                  status: '启用',
                  depositMode: '非入款',
                  withdrawalMode: '手动出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
                {
                  paymentOptionID: '006',
                  displayOptionName: '易宝微信',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '微信支付',
                  paymentOption: 'App支付',
                  status: '启用',
                  depositMode: '手动入款',
                  withdrawalMode: '手动出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
                {
                  paymentOptionID: '007',
                  displayOptionName: '易宝支付宝',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '支付宝支付',
                  paymentOption: 'H5支付',
                  status: '启用',
                  depositMode: '手动入款',
                  withdrawalMode: '自动出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
                {
                  paymentOptionID: '008',
                  displayOptionName: '易宝银联',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '银联支付',
                  paymentOption: 'App支付',
                  status: '暂停',
                  depositMode: '自动入款',
                  withdrawalMode: '手动出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
                {
                  paymentOptionID: '009',
                  displayOptionName: '易宝快捷',
                  paymentProvider: '富乐支付',
                  accountNumber: '1234567890',
                  paymentMethod: '快捷支付',
                  paymentOption: 'H5支付',
                  status: '禁用',
                  depositMode: '自动入款',
                  withdrawalMode: '自动出款',
                  support: '电脑端',
                  device: '电脑端',
                  amountPerDepositFrom: '1',
                  amountPerDepositTo: '2000',
                  depositLimit: '999999',
                  depositAlertLimit: '999999',
                  gatewayFee: '5',
                  domainName: '',
                  securityKey: '',
                  targetGroupWithFee: [],
                },
              ],
            };
            break;
          // 取得三方商戶列表
          case 'getPaymentProvider':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  text: '富乐支付',
                },
              ],
            };
            break;
          // 取得支付类别列表
          case 'getPaymentMethod':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  text: '微信支付',
                  option: [{ text: 'H5支付' }, { text: 'App支付' }],
                },
                {
                  text: '支付宝支付',
                  option: [{ text: 'H5支付' }, { text: 'App支付' }],
                },
                {
                  text: '银联支付',
                  option: [{ text: 'H5支付' }, { text: 'App支付' }],
                },
                {
                  text: '快捷支付',
                  option: [{ text: 'H5支付' }, { text: 'App支付' }],
                },
                {
                  text: '网银支付',
                  option: [{ text: 'H5支付' }],
                },
              ],
            };
            break;
          // 取得支付选项列表
          case 'getPaymentOption':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  text: 'H5支付',
                },
                {
                  text: 'App支付',
                },
              ],
            };
            break;
          // 取得三方特定商戶名稱底下的商戶號列表
          case 'getAccountNumber':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                { text: '1234567890', value: '1234567890' },
                { text: '1234567891', value: '1234567891' },
                { text: '1234567892', value: '1234567892' },
                { text: '1234567893', value: '1234567893' },
              ],
            };
            break;
          // 取得三方特定商戶號的歷史輸入紀錄
          case 'getAccountNumberHistory':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                accountNumber: params.accountNumber,
                gatewayFee: 5,
                securityKey: '1234',
              },
            };
            break;
          // 取得目標群組統計資料
          case 'getPaymentRiskList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  paymentRiskID: '001',
                  groupName: '黑钻玩家',
                  detail: [
                    {
                      title: '微信支付',
                      data: [
                        {
                          title: 'H5支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: true,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '易宝支付',
                            },
                            {
                              title: '闪付微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '闪付支付',
                            },
                          ],
                        },
                        {
                          title: 'APP支付',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '支付宝支付',
                      data: [
                        {
                          title: 'APP支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐支付宝',
                              percentage: 2,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝支付宝',
                              percentage: 2,
                              mobile: true,
                              pc: false,
                              sign: '入',
                              data: '易宝支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '银联支付',
                      data: [
                        {
                          title: '银联扫码',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '快捷支付',
                      data: [
                        {
                          title: '快捷',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '网银支付',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 5,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '本地银行',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '农银上海支行',
                              percentage: 3,
                              mobile: false,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  paymentRiskID: '002',
                  groupName: '钻石玩家',
                  detail: [
                    {
                      title: '微信支付',
                      data: [
                        {
                          title: 'H5支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: true,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '易宝支付',
                            },
                            {
                              title: '闪付微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '闪付支付',
                            },
                          ],
                        },
                        {
                          title: 'APP支付',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '支付宝支付',
                      data: [
                        {
                          title: 'APP支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐支付宝',
                              percentage: 2,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝支付宝',
                              percentage: 2,
                              mobile: true,
                              pc: false,
                              sign: '入',
                              data: '易宝支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '银联支付',
                      data: [
                        {
                          title: '银联扫码',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '快捷支付',
                      data: [
                        {
                          title: '快捷',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '网银支付',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 5,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '本地银行',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '农银上海支行',
                              percentage: 3,
                              mobile: false,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  paymentRiskID: '003',
                  groupName: '白金玩家',
                  detail: [
                    {
                      title: '微信支付',
                      data: [
                        {
                          title: 'H5支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: true,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '易宝支付',
                            },
                            {
                              title: '闪付微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '闪付支付',
                            },
                          ],
                        },
                        {
                          title: 'APP支付',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '支付宝支付',
                      data: [
                        {
                          title: 'APP支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐支付宝',
                              percentage: 2,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝支付宝',
                              percentage: 2,
                              mobile: true,
                              pc: false,
                              sign: '入',
                              data: '易宝支付',
                            },
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '银联支付',
                      data: [
                        {
                          title: '银联扫码',
                          subTitle: '随机',
                          data: [],
                        },
                      ],
                    },
                    {
                      title: '快捷支付',
                      data: [
                        {
                          title: '快捷',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '网银支付',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 5,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '本地银行',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '农银上海支行',
                              percentage: 3,
                              mobile: false,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  paymentRiskID: '004',
                  groupName: '黄金玩家',
                  detail: [
                    {
                      title: '微信支付',
                      data: [
                        {
                          title: 'H5支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: true,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '易宝支付',
                            },
                            {
                              title: '闪付微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '闪付支付',
                            },
                          ],
                        },
                        {
                          title: 'APP支付',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝支付宝',
                              percentage: 2,
                              mobile: true,
                              pc: false,
                              sign: '入',
                              data: '易宝支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '支付宝支付',
                      data: [
                        {
                          title: 'APP支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐支付宝',
                              percentage: 2,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '银联支付',
                      data: [
                        {
                          title: '银联扫码',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '快捷支付',
                      data: [
                        {
                          title: '快捷',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '网银支付',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 5,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '本地银行',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '农银上海支行',
                              percentage: 3,
                              mobile: false,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  paymentRiskID: '005',
                  groupName: '一般玩家',
                  detail: [
                    {
                      title: '微信支付',
                      data: [
                        {
                          title: 'H5支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '闪付微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '闪付支付',
                            },
                          ],
                        },
                        {
                          title: 'APP支付',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '支付宝支付',
                      data: [
                        {
                          title: 'APP支付',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐支付宝',
                              percentage: 2,
                              mobile: false,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝支付宝',
                              percentage: 2,
                              mobile: true,
                              pc: false,
                              sign: '入',
                              data: '易宝支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '银联支付',
                      data: [
                        {
                          title: '银联扫码',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                            {
                              title: '富乐微信',
                              percentage: 1,
                              mobile: true,
                              pc: true,
                              sign: '入',
                              data: '富乐支付',
                            },
                            {
                              title: '易宝微信',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '易宝支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '快捷支付',
                      data: [
                        {
                          title: '快捷',
                          subTitle: '随机',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 1,
                              mobile: true,
                              pc: false,
                              sign: '出',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '网银支付',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '富乐银联',
                              percentage: 5,
                              mobile: true,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      title: '本地银行',
                      data: [
                        {
                          title: '农业银行',
                          subTitle: '满额',
                          data: [
                            {
                              title: '农银上海支行',
                              percentage: 3,
                              mobile: false,
                              pc: false,
                              sign: '全',
                              data: '富乐支付',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            };
            break;
          // 取得該支付選項擁有的所有 provider
          case 'getDetailPaymentRiskProvider':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                id: '黑钻玩家',
                data: [
                  {
                    method: '微信支付',
                    option: [
                      {
                        title: 'H5支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: false,
                      },
                      {
                        title: 'APP支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                    ],
                  },
                  {
                    method: '支付宝支付',
                    option: [
                      {
                        title: 'H5支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                      {
                        title: 'APP支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 2,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 2,
                            select: false,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 2,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                    ],
                  },
                  {
                    method: '银联支付',
                    option: [
                      {
                        title: 'H5支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                      {
                        title: 'APP支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                    ],
                  },
                  {
                    method: '快捷支付',
                    option: [
                      {
                        title: 'H5支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                      {
                        title: 'APP支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                    ],
                  },
                  {
                    method: '网银支付',
                    option: [
                      {
                        title: 'H5支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                      {
                        title: 'APP支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                    ],
                  },
                  {
                    method: '本地银行',
                    option: [
                      {
                        title: 'H5支付',
                        provider: [
                          {
                            id: '富乐微信 / 富乐支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '易宝微信 / 易宝支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '闪付微信 / 闪付支付 / 1234567890',
                            fee: 1,
                            select: true,
                          },
                          {
                            id: '其他微信 / 其他支付 / 1234567890',
                            fee: 1,
                            select: false,
                          },
                        ],
                        mode: true,
                      },
                    ],
                  },
                ],
              },
            };
            break;
          case 'getTargetGroupPaymentRisk':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                categoryName: '一般群組',
                updateFrequency: '每日',
                data: [
                  {
                    group: '黑钻玩家',
                    key: 1,
                    index: 1,
                    conditions: [
                      {
                        field: 1,
                        absoluteTime: true,
                        dateFrom: '2020/06/15',
                        dateTo: '2020/06/30',
                        days: null, //absoluteTime: false 才會有值
                        amount: '1000', // 依 fieldID 決定有沒有值
                      },
                      {
                        field: 2,
                        absoluteTime: true,
                        dateFrom: '2020/06/15',
                        dateTo: '2020/06/30',
                        days: null, //absoluteTime: false 才會有值
                        amount: '1000', // 依 fieldID 決定有沒有值
                      },
                      // {
                      //   field: 3,
                      //   absoluteTime: false,
                      //   dateFrom: null,
                      //   dateTo: null,
                      //   days: 30, //absoluteTime: false 才會有值
                      //   amount: 1000, // 依 fieldID 決定有沒有值
                      // },
                      {
                        field: 4,
                        days: '30',
                      },
                    ],
                    mode: false, // true: "AND", false: "OR"
                  },
                  {
                    group: '钻石玩家',
                    key: 3,
                    index: 3,
                    conditions: [
                      {
                        field: 1,
                        absoluteTime: true,
                        dateFrom: '2020/06/15',
                        dateTo: '2020/06/30',
                        days: null, //absoluteTime: false 才會有值
                        amount: '1000', // 依 fieldID 決定有沒有值
                      },
                      {
                        field: 2,
                        absoluteTime: true,
                        dateFrom: '2020/06/15',
                        dateTo: '2020/06/30',
                        days: null, //absoluteTime: false 才會有值
                        amount: '1000', // 依 fieldID 決定有沒有值
                      },
                      {
                        field: 3,
                        absoluteTime: false,
                        dateFrom: null,
                        dateTo: null,
                        days: '30', //absoluteTime: false 才會有值
                        amount: '1000', // 依 fieldID 決定有沒有值
                      },
                      {
                        field: 4,
                        days: '30',
                      },
                      {
                        field: 5,
                        isProxyPlayer: true,
                      },
                    ],
                    mode: true, // true: "AND", false: "OR"
                  },
                  {
                    group: '白金玩家',
                    key: 2,
                    index: 2,
                    conditions: [
                      {
                        field: 1,
                        absoluteTime: true,
                        dateFrom: '2020/06/15',
                        dateTo: '2020/06/30',
                        days: null, //absoluteTime: false 才會有值
                        amount: '1000', // 依 fieldID 決定有沒有值
                      },
                      {
                        field: 2,
                        absoluteTime: true,
                        dateFrom: '2020/06/15',
                        dateTo: '2020/06/30',
                        days: null, //absoluteTime: false 才會有值
                        amount: '1000', // 依 fieldID 決定有沒有值
                      },
                      {
                        field: 3,
                        absoluteTime: false,
                        dateFrom: null,
                        dateTo: null,
                        days: '30', //absoluteTime: false 才會有值
                        amount: '1000', // 依 fieldID 決定有沒有值
                      },
                      {
                        field: 4,
                        days: '30',
                      },
                      {
                        field: 5,
                        isProxyPlayer: true,
                      },
                    ],
                    mode: true, // true: "AND", false: "OR"
                  },
                ],
              },
            };
            break;
          case 'getRiskAlertCondition':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  name: '手动触发',
                  触发: Math.floor(Math.random() * 100),
                  待定: Math.floor(Math.random() * 100),
                  审核: Math.floor(Math.random() * 100),
                },
                {
                  name: '危险赢家',
                  触发: Math.floor(Math.random() * 100),
                  待定: Math.floor(Math.random() * 100),
                  审核: Math.floor(Math.random() * 100),
                },
                {
                  name: '中奖赢家',
                  触发: Math.floor(Math.random() * 100),
                  待定: Math.floor(Math.random() * 100),
                  审核: Math.floor(Math.random() * 100),
                },
                {
                  name: '单期赢家',
                  触发: Math.floor(Math.random() * 100),
                  待定: Math.floor(Math.random() * 100),
                  审核: Math.floor(Math.random() * 100),
                },
                {
                  name: '投注赢家',
                  触发: Math.floor(Math.random() * 100),
                  待定: Math.floor(Math.random() * 100),
                  审核: Math.floor(Math.random() * 100),
                },
                {
                  name: '盈亏赢家',
                  触发: Math.floor(Math.random() * 100),
                  待定: Math.floor(Math.random() * 100),
                  审核: Math.floor(Math.random() * 100),
                },
                {
                  name: '盈亏赢家2',
                  触发: Math.floor(Math.random() * 100),
                  待定: Math.floor(Math.random() * 100),
                  审核: Math.floor(Math.random() * 100),
                },
                {
                  name: '盈亏赢家3',
                  触发: Math.floor(Math.random() * 100),
                  待定: Math.floor(Math.random() * 100),
                  审核: Math.floor(Math.random() * 100),
                },
              ],
            };
          case 'getRiskAlertPlayers':
            const testArr = Array.apply(
              null,
              Array(params.quantityPerPage)
            ).map(function(x, i) {
              return (params.currentPage - 1) * params.quantityPerPage + i;
            });
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                totalCount: 100,
                data: testArr.map(el => ({
                  playerID: 'id' + el,
                  playerName: 'Ada - ' + el,
                  alerts: [
                    '危险赢家',
                    '中奖赢家',
                    '单期赢家',
                    '投注赢家',
                    '盈亏赢家',
                    '盈亏赢家',
                  ].splice(0, Math.floor(Math.random() * 5 + 1)),
                  date: '2020-01-01 10:10:10',
                })),
              },
            };
          //新增風控警報
          case 'getRiskAlertList':
            switch (params.ruleType) {
              case 'immediate':
                return {
                  success: 'true',
                  message: '拒絕存取',
                  code: '1',
                  data: {
                    ruleType: 'immediate',
                    conditions: [
                      {
                        index: 0,
                        new: false,
                        mainInputDefaultValue: 'ABC',
                        defaultStatus: '2',
                        defaultValue: [
                          {
                            selectedValue: 2,
                            buttonBase: 0,
                            inputDetailData: '100',
                          },
                          {
                            selectedValue: 3,
                            buttonBase: 1,
                            inputDetailData: '300',
                          },
                        ],
                      },
                      {
                        index: 1,
                        new: false,
                        mainInputDefaultValue: 'DEF',
                        defaultStatus: '1',
                        defaultValue: [
                          {
                            selectedValue: 2,
                            buttonBase: 0,
                            inputDetailData: '500',
                          },
                          {
                            selectedValue: 3,
                            buttonBase: 1,
                            inputDetailData: '700',
                          },
                        ],
                      },
                    ],
                  },
                };
              case 'daily':
                return {
                  success: 'true',
                  message: '拒絕存取',
                  code: '1',
                  data: {
                    ruleType: 'daily',
                    conditions: [
                      {
                        index: 0,
                        new: false,
                        mainInputDefaultValue: 'JKL',
                        defaultStatus: '1',
                        defaultValue: [
                          {
                            firstSelect: 1,
                            selectedValue: 2,
                            buttonBase: 0,
                            inputDetailData: '100',
                          },
                          {
                            firstSelect: 1,
                            selectedValue: 3,
                            buttonBase: 1,
                            inputDetailData: '200',
                          },
                        ],
                      },
                    ],
                  },
                };
              default:
                return null;
            }
          case 'getPlayerList':
            const restrictions = () => [
              {
                restriction: '可疑玩家',
                time: randomDateStr(),
                operator: randomID(),
              },
              {
                restriction: '禁止登录',
                time: randomDateStr(),
                operator: randomID(),
              },
              {
                restriction: '禁止优惠',
                time: randomDateStr(),
                operator: randomID(),
              },
              {
                restriction: '禁止优惠',
                time: randomDateStr(),
                operator: randomID(),
              },
            ];
            const el1 = {
              playerName: randomID(),
              playerID: randomID(),
              restrictions: restrictions().splice(0, 3),
            };
            const el2 = {
              playerName: randomID(),
              playerID: randomID(),
              restrictions: restrictions().splice(0, 4),
            };
            const el3 = {
              playerName: randomID(),
              playerID: randomID(),
              restrictions: restrictions().splice(1, 2),
            };
            const response = {
              totalCount: params.quantityPerPage * 2,
              data: Array(params.quantityPerPage)
                .fill('1')
                .map(el => {
                  const random = Math.floor(Math.random() * 10);
                  return random % 3 === 0 ? el1 : random % 3 === 1 ? el2 : el3;
                }),
            };
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: response,
            };
          case 'getAlertNameList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: ['手动触发', '危险玩家', '中奖赢家', '单期赢家'],
            };
          case 'getPlayerAlerts':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                totalCount: 100,
                data: [
                  {
                    triggerTime: '2020-01-01 10:10:10',
                    updateTime: '2020-01-01 10:10:10',
                    status: '审核',
                    alert: '单期中奖金额大于999,999,999,999.000',
                  },
                  {
                    triggerTime: '2020-01-01 10:10:10',
                    updateTime: '2020-01-01 10:10:10',
                    status: '触发',
                    alert: '单期中奖金额大于999,999,999,999.000',
                  },
                  {
                    triggerTime: '2020-01-01 10:10:10',
                    updateTime: '2020-01-01 10:10:10',
                    status: '待定',
                    alert: '单期中奖金额大于999,999,999,999.000',
                  },
                  {
                    triggerTime: '2020-01-01 10:10:10',
                    updateTime: '2020-01-01 10:10:10',
                    status: '待定',
                    alert: '单期中奖金额大于999,999,999,999.000',
                  },
                  {
                    triggerTime: '2020-01-01 10:10:10',
                    updateTime: '2020-01-01 10:10:10',
                    status: '待定',
                    alert: '单期中奖金额大于999,999,999,999.000',
                  },
                ],
              },
            };
          case 'getPlayerAlertsDetail':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                restrictions: {
                  可疑玩家: true,
                  禁止登录: false,
                  禁止优惠: false,
                  禁止充值: false,
                  禁止提款: false,
                },
                extProduct: {
                  AG真人: false,
                  VR真人: false,
                  电子游艺: false,
                  IM体育: false,
                  沙巴体育: false,
                  IM棋牌: false,
                  乐游棋牌: false,
                },
              },
            };
          case 'getPlayerAlertsProduct':
            switch (params.productID) {
              case 'iNumLottery':
                return {
                  success: 'true',
                  message: '拒絕存取',
                  code: '1',
                  data: {
                    productID: 'iNumLottery',
                    detail: {
                      腾讯分彩: false,
                      支付宝彩: true,
                      幸运飞挺: false,
                      欢乐生肖: false,
                      集团PK彩60秒: false,
                      商家PK60秒: false,
                      新西兰45秒彩: false,
                      '俄罗斯1.5分彩': false,
                      极速赛车: false,
                      北京PK10: false,
                      北京PK9: false,
                      北京PK8: true,
                      北京PK7: false,
                      北京PK6: false,
                      北京PK5: false,
                      北京PK4: false,
                      北京PK3: false,
                      北京PK2: false,
                      北京PK1: false,
                      北京PK0: false,
                      极速赛车2: false,
                      极速赛车3: false,
                    },
                  },
                };
              case 'redPocket':
                return {
                  success: 'true',
                  message: '拒絕存取',
                  code: '1',
                  data: {
                    productID: 'redPocket',
                    detail: {
                      腾讯分彩: true,
                      支付宝彩: false,
                    },
                  },
                };
              default:
                return null;
            }
          case 'getPlayerAlertsLog':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  date: randomDateTimeStr(),
                  before: '正常',
                  after: '可疑',
                  operator: randomID(),
                  detail: [
                    '开启「可疑玩家」',
                    '关闭「禁止充值」',
                    '关闭「禁止提款」',
                  ],
                },
                {
                  date: randomDateTimeStr(),
                  before: '正常',
                  after: '可疑',
                  operator: randomID(),
                  detail: [
                    '开启「可疑玩家」',
                    '关闭「禁止充值」',
                    '关闭「禁止提款」',
                  ],
                },
                {
                  date: randomDateTimeStr(),
                  before: '正常',
                  after: '可疑',
                  operator: randomID(),
                  detail: [
                    '开启「可疑玩家」',
                    '关闭「禁止充值」',
                    '关闭「禁止提款」',
                  ],
                },
                {
                  date: randomDateTimeStr(),
                  before: '正常',
                  after: '可疑',
                  operator: randomID(),
                  detail: [
                    '开启「可疑玩家」',
                    '关闭「禁止充值」',
                    '关闭「禁止提款」',
                  ],
                },
                {
                  date: randomDateTimeStr(),
                  before: '正常',
                  after: '可疑',
                  operator: randomID(),
                  detail: [
                    '开启「可疑玩家」',
                    '关闭「禁止充值」',
                    '关闭「禁止提款」',
                  ],
                },
              ],
            };
          //玩家管理 玩家列表
          case 'getPlayerLists':
            const data1 = {
              playerID: randomID(),
              online: true,
              lock: false,
              realName: '源静香',
              odds: '1980',
              balance: 123456789,
              level: 3,
              topLine: 'Jacqueline',
              directLower: 100,
              allLower: 9999,
              lastLoginIP: '255.255.255.255',
              domain: 'dongfanghong789.com',
              loginTime: randomDateTimeStr(),
              device: 'iOS',
              duration: '30',
              registerTime: randomDateTimeStr(),
              affiliateAccess: true,
            };
            const data2 = {
              playerID: randomID(),
              online: false,
              lock: true,
              realName: '源静香',
              odds: '1234',
              balance: 123456789,
              level: 2,
              topLine: 'QRRRRP',
              directLower: 200,
              allLower: 888,
              lastLoginIP: '255.255.255.255',
              domain: 'dongfanghong789.com',
              loginTime: randomDateTimeStr(),
              device: 'iOS',
              duration: '30',
              registerTime: randomDateTimeStr(),
              affiliateAccess: false,
            };
            let datas = [];
            for (let i = 0; i < 25; i++) {
              let r = Math.floor(Math.random() * 10);
              if (r % 2 === 0) datas.push(data1);
              else datas.push(data2);
            }
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                totalCount: 100,
                data: datas,
              },
            };
          case 'editUpline':
          case 'upgradeLevelOne':
          case 'editAccessLimit':
          case 'editPlayerUnlock':
          case 'addNewPlayer':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
            };
          case 'checkTopLineAccount':
            if (params.topLineID === 'Ida')
              return {
                success: 'true',
                message: '拒絕存取',
                code: '1',
                data: {
                  account: 'Ida',
                  exist: true,
                },
              };
            else {
              return {
                success: 'true',
                message: '拒絕存取',
                code: '1',
                data: {
                  account: params.topLineID,
                  exist: false,
                },
              };
            }
          case 'getPlayerDetails':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                playerID: params.playerID,
                totalDepositToday: Math.floor(Math.random() * 1000000000),
                totalWithdrawToday: Math.floor(Math.random() * 1000000000),
                totalBetToday: Math.floor(Math.random() * 1000000000),
              },
            };
          case 'getPlayerOddsRange':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                oddsRange: [1700, 1980],
              },
            };
          case 'getToplineOddsRange':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                oddsRange: [1800, 1950],
              },
            };
          //玩家管理 新增玩家
          case 'editPlayerBasic':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
            };
          // 玩家管理 玩家詳情 玩家信息
          case 'getPlayerProfile':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                onlineStatus: true,
                recommendCode: '1234567890',
                access: '代理',
                odds: '1980',
                topLine: 'Jacqueline',
                topLineCode: '2234567890', //上級推薦代碼
                lastLoginIP: '255.255.255.255',
                domain: 'vipzunlong1.com',
                registerIP: '255.255.255.254',
                paymentLevel: '白金玩家',
                playerLevel: 5,
                discountLevel: '优惠层级',
                //
                realName: '源静香',
                playerID: 'Ada',
                birthday: '2000-05-02',
                phoneNumber: '13048668746',
                email: 'ada@gmail.com',
                qqID: '13048668746',
                wechatID: '13048668746',
                holdStatus: '已锁定',
                unlockTime: add(new Date(), {
                  hours: 12,
                  minutes: 12,
                  seconds: 13,
                }),
                depositStatus: '已充值',
                riskStatus: '可疑',
                //綁定
                added: {
                  mobile: true,
                  email: true,
                  qq: false,
                  wechat: false,
                  fingerPrint: false,
                  faceID: true,
                },
                //層級群組
                levels: {
                  paymentLevel: '白金玩家',
                  playerLevel: 5,
                  discountLevel: [
                    '优惠群組1',
                    '优惠群組2',
                    '优惠群組3',
                    '优惠群組4',
                    '优惠群組5',
                    '优惠群組6',
                  ],
                  communicateLevel: [
                    '通訊群組1',
                    '通訊群組2',
                    '通訊群組3',
                    '通訊群組4',
                    '通訊群組5',
                  ],
                },
              },
            };
          case 'getPlayerDeposit':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                locked: Math.floor(Math.random() * 1000000000000),
                available: Math.floor(Math.random() * 1000000000000),
              },
            };
          case 'getGameReport':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  product: '爱码彩票',
                  betAmount: Math.floor(Math.random() * 100000000),
                  profitLoss: Math.floor((Math.random() - 0.5) * 100000000),
                },
                {
                  product: '红包游戏',
                  betAmount: Math.floor(Math.random() * 100000000),
                  profitLoss: Math.floor((Math.random() - 0.5) * 100000000),
                },
              ],
            };

          case 'getTimeLineList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: Array(50)
                .fill(null)
                .map((el, idx) => ({
                  data: {
                    ip: '255.255.255.25' + (idx % 5),
                    domain: 'vipzunlong1.com' + (idx % 4),
                    device:
                      idx % 3 === 0 ? 'iOS' : idx % 3 === 1 ? 'Android' : 'web',
                    status: idx % 3 === 0 ? 'success' : 'fail',
                    type: idx % 2 === 0 ? 'login' : 'logout',
                    inactive: idx % 4 === 0 ? true : false,
                  },
                  time: sub(new Date(), {
                    years: Math.round(idx / 10),
                    days: Math.round(idx / 4),
                    minutes: idx,
                  }),
                })),
            };
          case 'getPromoList': {
            switch (params.type) {
              case 'system':
                return {
                  success: 'true',
                  message: '拒絕存取',
                  code: '1',
                  data: [
                    { type: '精采活动', name: '优惠一', condition: '條件一' },
                    { type: '专属优惠', name: '优惠二', condition: '條件二' },
                  ],
                };
              case 'affiliate':
                return {
                  success: 'true',
                  message: '拒絕存取',
                  code: '1',
                  data: [
                    {
                      type: '福利彩金',
                      name: '优惠一',
                      condition: '條件一',
                    },
                    {
                      type: '领导彩金',
                      name: '优惠二',
                      condition: '條件二',
                    },
                  ],
                };
              default:
                return {
                  success: 'true',
                  message: '拒絕存取',
                  code: '1',
                  data: [],
                };
            }
          }
          case 'getDownLineList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                'Ada001',
                'Bda002',
                'Cda003',
                'Dda004',
                'Eda005',
                'Eda006',
              ],
            };
          case 'getWalletList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                { id: '1', text: '棋牌' },
                { id: '2', text: '真人娱乐' },
                { id: '3', text: '迷你游戏' },
                { id: '4', text: '体育' },
                { id: '5', text: '电竞' },
              ],
            };
          case 'getWalletValue':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                id: params.id,
                value: Math.floor(Math.random() * 100000000),
              },
            };
          case 'getBankCardList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  cardName: '中国银行卡',
                  cardNum: '1234567823458901',
                  bankName: '中国银行',
                  bankAdd: ['胶州经济技术开发区支行', '山东省', '胶州市'],
                  realName: '源静香',
                },
                {
                  cardName: '中国银行卡2',
                  cardNum: '2234567823458902',
                  bankName: '中国银行',
                  bankAdd: ['胶州经济技术开发区支行', '山东省', '胶州市'],
                  realName: '源静香',
                },
              ],
            };
          // 玩家管理 玩家詳情 其他信息 取得平台表現 圖檔資料
          case 'getPlayerChartData':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                [
                  {
                    date: '00:00',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '01:00',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '02:00',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '03:00',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '04:00',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '05:00',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '06:00',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '07:00',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '08:00',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '09:00',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '10:00',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '11:00',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '12:00',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '13:00',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '14:00',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '15:00',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '16:00',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '17:00',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '18:00',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '19:00',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '20:00',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '21:00',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '22:00',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '23:00',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                ],
                [
                  {
                    date: '2020-10-01',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-10-02',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-10-03',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-10-04',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-10-05',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-10-06',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-10-07',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-10-08',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-10-09',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-10-10',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-10-11',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-10-12',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-10-13',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-10-14',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-10-15',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-10-16',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-10-17',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-10-18',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-10-19',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-10-20',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-10-21',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-10-22',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-10-23',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-10-24',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-10-25',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-10-26',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-10-27',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-10-28',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-10-29',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-10-30',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-10-31',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-11-01',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-11-02',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-11-03',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-11-04',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-11-05',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                  {
                    date: '2020-11-06',
                    totalWithdrawals: '345',
                    totalDeposit: '543',
                    profit: '123',
                    teamEarns: '321',
                  },
                  {
                    date: '2020-11-07',
                    totalWithdrawals: '333',
                    totalDeposit: '555',
                    profit: '111',
                    teamEarns: '222',
                  },
                  {
                    date: '2020-11-08',
                    totalWithdrawals: '444',
                    totalDeposit: '333',
                    profit: '222',
                    teamEarns: '111',
                  },
                  {
                    date: '2020-11-09',
                    totalWithdrawals: '555',
                    totalDeposit: '222',
                    profit: '111',
                    teamEarns: '333',
                  },
                ],
              ],
            };
          // 玩家管理 玩家詳情 其他信息 取得產品表現 圖檔資料
          case 'getPlayerChartData2':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  gameName: '腾讯分分彩',
                  投注金额: 5200,
                  有效投注额: 4100,
                },
                {
                  gameName: '北京PK10',
                  投注金额: 5400,
                  有效投注额: 3500,
                },
                {
                  gameName: '支付宝彩',
                  投注金额: 5100,
                  有效投注额: 4800,
                },
                {
                  gameName: '幸运飞挺',
                  投注金额: 5600,
                  有效投注额: 3800,
                },
                {
                  gameName: '欢乐生肖',
                  投注金额: 3800,
                  有效投注额: 2800,
                },
                {
                  gameName: '集团PK彩60秒',
                  投注金额: 2900,
                  有效投注额: 1900,
                },
                {
                  gameName: '商家PK60秒',
                  投注金额: 5100,
                  有效投注额: 3900,
                },
                {
                  gameName: '新西兰45秒彩',
                  投注金额: 4800,
                  有效投注额: 3400,
                },
                {
                  gameName: '俄罗斯1.5分彩',
                  投注金额: 5200,
                  有效投注额: 4100,
                },
                {
                  gameName: '北京赛车',
                  投注金额: 5300,
                  有效投注额: 4200,
                },
                {
                  gameName: '奇趣腾讯',
                  投注金额: 3100,
                  有效投注额: 1800,
                },
                {
                  gameName: '广东快乐十分',
                  投注金额: 4400,
                  有效投注额: 3200,
                },
                {
                  gameName: '香港六合彩',
                  投注金额: 5300,
                  有效投注额: 4300,
                },
                {
                  gameName: '加拿大幸运28',
                  投注金额: 4600,
                  有效投注额: 3200,
                },
                {
                  gameName: '腾讯分分彩1',
                  投注金额: 5200,
                  有效投注额: 4100,
                },
                {
                  gameName: '北京PK101',
                  投注金额: 5400,
                  有效投注额: 3500,
                },
                {
                  gameName: '支付宝彩1',
                  投注金额: 5100,
                  有效投注额: 4800,
                },
                {
                  gameName: '幸运飞挺1',
                  投注金额: 5600,
                  有效投注额: 3800,
                },
                {
                  gameName: '欢乐生肖1',
                  投注金额: 3800,
                  有效投注额: 2800,
                },
                {
                  gameName: '集团PK彩60秒1',
                  投注金额: 2900,
                  有效投注额: 1900,
                },
                {
                  gameName: '商家PK60秒1',
                  投注金额: 5100,
                  有效投注额: 3900,
                },
                {
                  gameName: '新西兰45秒彩1',
                  投注金额: 4800,
                  有效投注额: 3400,
                },
                {
                  gameName: '俄罗斯1.5分彩1',
                  投注金额: 5200,
                  有效投注额: 4100,
                },
                {
                  gameName: '北京赛车1',
                  投注金额: 5300,
                  有效投注额: 4200,
                },
                {
                  gameName: '奇趣腾讯1',
                  投注金额: 3100,
                  有效投注额: 1800,
                },
                {
                  gameName: '广东快乐十分1',
                  投注金额: 4400,
                  有效投注额: 3200,
                },
                {
                  gameName: '香港六合彩1',
                  投注金额: 5300,
                  有效投注额: 4300,
                },
                {
                  gameName: '加拿大幸运281',
                  投注金额: 4600,
                  有效投注额: 3200,
                },
              ],
            };

          // 取得全部下級人數
          case 'getTotalDownLineCount':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: { count: 100 },
            };
          // 取得全部遊戲類型
          case 'getGameType':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                { text: '全部' },
                { text: '时时彩' },
                { text: '11选5' },
                { text: '快3' },
                { text: '快乐十分' },
                { text: '北京赛车' },
                { text: '福彩/六合彩' },
                { text: '幸运28' },
              ],
            };
          // 取得資金流水列表
          case 'getCapitalFlowList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  time: '10:10:10',
                  id: 'W200602111210947',
                  noted: '资金－入款－银行卡',
                  assetsChange: '9999999',
                  lockedChange: '9999999',
                  assets: '9999999',
                  lockedAmount: '9999999',
                  enableAmount: '9999999',
                },
                {
                  time: '10:10:10',
                  id: 'W200602111210497',
                  noted: '资金－出款－银行卡',
                  assetsChange: '9999999',
                  lockedChange: '9999999',
                  assets: '9999999',
                  lockedAmount: '9999999',
                  enableAmount: '9999999',
                },
                {
                  time: '10:10:10',
                  id: 'W200602111210265',
                  noted: '盈亏－彩票－腾讯分分彩',
                  assetsChange: '9999999',
                  lockedChange: '9999999',
                  assets: '9999999',
                  lockedAmount: '9999999',
                  enableAmount: '9999999',
                },
                {
                  time: '10:10:10',
                  id: 'W200602111210000',
                  noted: '盈亏－迷你游戏－游戏名称',
                  assetsChange: '9999999',
                  lockedChange: '9999999',
                  assets: '9999999',
                  lockedAmount: '9999999',
                  enableAmount: '9999999',
                },
                {
                  time: '10:10:10',
                  id: 'W200602111210400',
                  noted: '转帐－转入－产品名称',
                  assetsChange: '9999999',
                  lockedChange: '9999999',
                  assets: '9999999',
                  lockedAmount: '9999999',
                  enableAmount: '9999999',
                },
                {
                  time: '10:10:10',
                  id: 'W200602111210033',
                  noted: '转帐－转出－产品名称',
                  assetsChange: '9999999',
                  lockedChange: '9999999',
                  assets: '9999999',
                  lockedAmount: '9999999',
                  enableAmount: '9999999',
                },
                {
                  time: '10:10:10',
                  id: 'W200602111210300',
                  noted: '彩金－系统优惠－活动种类',
                  assetsChange: '9999999',
                  lockedChange: '9999999',
                  assets: '9999999',
                  lockedAmount: '9999999',
                  enableAmount: '9999999',
                },
                {
                  time: '10:10:10',
                  id: 'W200602111210800',
                  noted: '调整－系统－上分',
                  assetsChange: '9999999',
                  lockedChange: '9999999',
                  assets: '9999999',
                  lockedAmount: '9999999',
                  enableAmount: '9999999',
                },
              ],
            };
          // 玩家紀錄 取得今日入款總金額
          case 'getTotalDeposit':
          case 'getTotalWithdrawals':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: { amount: 888888888888, count: 200 },
            };
          case 'getTotalBettingRecord':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: {
                amount: 888888888888,
                net: 888888888888,
                number: 888888888888,
              },
            };
          // 玩家服務 金額調整 取得總資產、鎖定金額
          case 'getTotalAssetsAmount':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [1000000000, 300000000],
            };
          // 通訊系統 取得收件箱 清單列表
          case 'getInBoxList':
          case 'getSendMailList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  name: 'Barbara',
                  title: '标题一',
                  time: '2020-01-10 10:10:10',
                },
                {
                  name: 'Calista',
                  title: '标题二',
                  time: '2020-01-09 10:10:10',
                },
                {
                  name: 'Daisy',
                  title: '标题三',
                  time: '2020-01-08 10:10:10',
                },
                {
                  name: 'Eartha',
                  title: '标题四',
                  time: '2020-01-07 10:10:10',
                },
                {
                  name: 'Faithe',
                  title: '标题五',
                  time: '2020-01-06 10:10:10',
                },
                {
                  name: 'Gabrielle',
                  title: '标题六',
                  time: '2020-01-05 10:10:10',
                },
                {
                  name: 'Barbara',
                  title: '标题一',
                  time: '2020-01-10 10:10:10',
                },
                {
                  name: 'Calista',
                  title: '标题二',
                  time: '2020-01-09 10:10:10',
                },
                {
                  name: 'Daisy',
                  title: '标题三',
                  time: '2020-01-08 10:10:10',
                },
                {
                  name: 'Eartha',
                  title: '标题四',
                  time: '2020-01-07 10:10:10',
                },
                {
                  name: 'Faithe',
                  title: '标题五',
                  time: '2020-01-06 10:10:10',
                },
                {
                  name: 'Gabrielle',
                  title: '标题六',
                  time: '2020-01-05 10:10:10',
                },
              ],
            };
          case 'getAnnouncementList':
            return {
              success: 'true',
              message: '拒絕存取',
              code: '1',
              data: [
                {
                  title: '停机维护公告',
                  type: '维护',
                  targetGroup:
                    '黑钻玩家、群组1、群组2、群组3、群组4、群组5、群组1、群组2、群组3、群组4、群组5',
                  time: '2020-01-10 10:10:10',
                  status: '启用',
                },
                {
                  title: '临时停机维护公告',
                  type: '维护',
                  targetGroup: '黑钻玩家',
                  time: '2020-01-09 10:10:10',
                  status: '禁用',
                },
                {
                  title: '游戏更新公告',
                  type: '其他',
                  targetGroup: '黑钻玩家、群组1、群组2、群组3、群组4',
                  time: '2020-01-08 10:10:10',
                  status: '启用',
                },
                {
                  title: '优惠活动公告',
                  type: '优惠',
                  targetGroup: '黑钻玩家、群组1、群组2、群组3',
                  time: '2020-01-07 10:10:10',
                  status: '启用',
                },
                {
                  title: '停机维护公告',
                  type: '维护',
                  targetGroup: '黑钻玩家、群组1、群组2',
                  time: '2020-01-06 10:10:10',
                  status: '启用',
                },
                {
                  title: '停机维护公告',
                  type: '维护',
                  targetGroup: '黑钻玩家、群组1',
                  time: '2020-01-05 10:10:10',
                  status: '启用',
                },
                {
                  title: '停机维护公告',
                  type: '维护',
                  targetGroup:
                    '黑钻玩家、群白金玩家、黄金玩家、一般玩家、群白金玩家、黄金玩家、一般玩家、群白金玩家、黄金玩家、一般玩家',
                  time: '2020-01-10 10:10:10',
                  status: '启用',
                },
                {
                  title: '临时停机维护公告',
                  type: '维护',
                  targetGroup: '黑钻玩家、群组1、群组2、群组3、群组4、群组5',
                  time: '2020-01-09 10:10:10',
                  status: '启用',
                },
                {
                  title: '游戏更新公告',
                  type: '其他',
                  targetGroup: '黑钻玩家、群组1、群组2、群组3、群组4',
                  time: '2020-01-08 10:10:10',
                  status: '启用',
                },
                {
                  title: '优惠活动公告',
                  type: '优惠',
                  targetGroup: '黑钻玩家、群组1、群组2、群组3',
                  time: '2020-01-07 10:10:10',
                  status: '启用',
                },
                {
                  title: '停机维护公告',
                  type: '维护',
                  targetGroup: '黑钻玩家、群组1、群组2',
                  time: '2020-01-06 10:10:10',
                  status: '启用',
                },
                {
                  title: '停机维护公告',
                  type: '维护',
                  targetGroup: '黑钻玩家、群组1',
                  time: '2020-01-05 10:10:10',
                  status: '启用',
                },
              ],
            };
          default:
            break;
        }
      })
  );
};

const randomDate = () =>
  new Date(+new Date() - Math.floor(Math.random() * 10000000000));
const randomDateStr = () => format(randomDate(), 'yyyyMMdd');
const randomID = () =>
  Math.random()
    .toString(36)
    .substr(2, 5);
const randomDateTimeStr = () => format(randomDate(), 'yyyyMMdd hh:mm:ss');
