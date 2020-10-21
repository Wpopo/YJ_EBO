import React from 'react';
import store from 'Redux/store';
import { Provider } from 'react-redux';
import Header from 'Layout/Header';

export default {
  title: 'INP-EBO | 統一版型組件/Header',
};

/**
 * @param {String} title 頁面標題
 * @param {String} userName 登入的User名字
 * @param {Array} logoutFn 登出時，執行的動作
 */

export const header = () => (
  <Provider store={store}>
    <Header logoutFn={() => console.log('log out!')} />
  </Provider>
);
