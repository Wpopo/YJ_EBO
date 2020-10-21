import React from 'react';
import store from 'Redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LeftMenu from 'Layout/LeftMenu';

export default {
  title: 'INP-EBO | 統一版型組件/LeftMenu',
};

/**
 * @param {String} logo 集團Logo Component
 * @param {String} merchantName 集團名字
 * @param {Array} merchantID 集團ID
 */

export const leftmenu = () => (
  <Provider store={store}>
    <BrowserRouter>
      <LeftMenu merchantName="大时代" />
    </BrowserRouter>
  </Provider>
);
