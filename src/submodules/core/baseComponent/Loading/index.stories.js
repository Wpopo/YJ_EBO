import React from 'react';
import Loading from 'BaseComponent/Loading';
import { useDispatch } from 'react-redux';
import { getDepositList } from 'Redux/axios/action';

import store from 'Redux/store';
import { Provider } from 'react-redux';

export default {
  title: 'INP-EBO | 基本組件/Loading',
};

/**
 * @param {Boolean} loading 是否顯示loading畫面
 *
 */

export const loading = () => (
  <Provider store={store}>
    <Buttons />
    <Loading loading />
  </Provider>
);

const Buttons = () => {
  const dispatch = useDispatch();
  const searchParam = {
    // 存款單狀態
    status: '待审核',
    // 選取的集團代號
    merchantGroup: '',
    // 選取的商家代號
    merchant: '123',
    // 選取的起始提交時間
    submitDateFrom: '',
    // 選取的結束提交時間
    submitDateTo: '',
    // 選取的起始審核時間
    approveDateFrom: '',
    // 選取的結束審核時間
    approveDateTo: '',
    // 選取的起始存款金額
    depositAmountFrom: '',
    // 選取的結束存款金額
    depositAmountTo: '',
    // 選取的支付方式
    paymentMethod: '',
    // 輸入的存款單編號>
    depositID: '',
    // 輸入的 player 帳號
    playerUserName: '',
    // 目前頁數>
    currentPage: '1',
    // 選取的每頁數量
    quantityPerPage: '10',
    // 提交時間排序方式 up/down>
    sortBySubmitDate: '',
  };

  return (
    <>
      <button
        onClick={() => {
          dispatch(getDepositList(searchParam));
        }}
      >
        call API
      </button>
    </>
  );
};
