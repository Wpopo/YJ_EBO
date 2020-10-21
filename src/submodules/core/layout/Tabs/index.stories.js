import React, { useState } from 'react';
import { Provider } from 'react-redux';

import store from 'Redux/store';

import Tabs from 'Layout/Tabs';
import MessagePopup from 'Layout/MessagePopup';
import SwitchBase from 'BaseComponent/SwitchBase';

import useAlertDialog from 'Hooks/useAlertDialog';
import { useInterceptor } from 'Hooks/useInterceptor';

export default {
  title: 'INP-EBO | 統一版型組件/Tabs',
  decorators: [
    StoryFn => {
      return (
        <Provider store={store}>
          <MessagePopup />
          <StoryFn />
        </Provider>
      );
    },
  ],
};

/**
 * @param {Object} tabList :{
 *        @param {Object} idx Index :{
 *                @param {String} title 標題
 *                @param {Element} children Body Component
 *        }
 * }
 * @param {number} defaultSelectedIdx 預設顯示的頁籤
 * @param {String} stylesType 顯示的樣式，預設顯示『style-1』
 * @param {function} getTab 回傳目前的TabIdx值
 */

const tabList2 = {
  0: { title: 'H5支付', children: <div>123</div> },
  1: { title: 'APP支付', children: <div>456</div> },
};

const tabList = {
  0: {
    title: '微信支付',
    children: <Tabs tabList={tabList2} stylesType={'style-2'}></Tabs>,
  },
  1: { title: '支付宝支付', children: <div>456</div> },
  2: { title: '银联支付', children: <div>789</div> },
  3: { title: '快捷支付', children: <div>012</div> },
  4: { title: '网银支付', children: <div>345</div> },
  5: { title: '银行入款', children: <div>678</div> },
};

export const style_2 = () => {
  const [isEdited, setEdited] = useState(false);

  const alert = useAlertDialog();

  useInterceptor(async (action, prev, next) => {
    console.log('action', action, prev, next);
    if (!isEdited) return;
    await alert(action, `${prev} -> ${next}`);
  });

  return (
    <>
      <SwitchBase
        text="已編輯"
        checked={isEdited}
        switchChange={e => setEdited(!isEdited)}
      />
      <Tabs
        tabList={tabList2}
        stylesType={'style-2'}
        getTab={idx => {
          console.log('current Tab Idx:', idx);
        }}
      ></Tabs>
    </>
  );
};
export const style_1 = () => (
  <Tabs
    tabList={tabList}
    stylesType={'style-1'}
    getTab={idx => {
      console.log('current Tab Idx:', idx);
    }}
  ></Tabs>
);
