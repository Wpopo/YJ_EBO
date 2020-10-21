import React from 'react';
import store from 'Redux/store';
import { Provider } from 'react-redux';
import MessagePopup from 'Layout/MessagePopup';
import Demo from './demo';

export default {
  title: 'INP-EBO | 統一版型組件/MessagePopup',
};

/**
 * @param {String} title 頁面標題
 * @param {String} userName 登入的User名字
 * @param {Array} logoutFn 登出時，執行的動作
 */

export const span_with_two_button = () => (
  <Provider store={store}>
    <MessagePopup />
    <Demo styleDemo="style-1" />
    {/* 
    <ButtonBase
      size="xl"
      list={[
        {
          value: 'openMessage',
          onClick: () => {
            openMessage();
            setMessageTitle('确认删除警报条件？');
            setContent([
              ['span', '确认删除 危险赢家 警报条件？一旦删除将无法复原。'],
            ]);
          },
        },
      ]}
    /> 
    */}
  </Provider>
);

export const input_and_textarea_with_two_button = () => (
  <Provider store={store}>
    <MessagePopup />
    <Demo styleDemo="style-2" />
    {/* 
    <ButtonBase
      size="xl"
      list={[
        {
          value: 'openMessage',
          onClick: () => {
            openMessage();
            setMessageTitle('手动触发');
          },
        },
      ]}
    /> 
    */}
  </Provider>
);

export const timeline_with_no_button = () => (
  <Provider store={store}>
    <MessagePopup />
    <Demo styleDemo="style-3" />
    {/* 
    const timelineConfig = [
      {
        right: '备注日期',
        left: { title: '用户帐号', content: '备注内容' },
      },
      {
        right: '2020-01-01 12:12:12',
        left: {
          title: 'user001',
          content:
            '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
        },
      },
      {
        right: '2020-01-01 12:12:12',
        left: {
          title: 'user001',
          content:
            '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
        },
      },
      {
        right: '2020-01-01 12:12:12',
        left: {
          title: 'user001',
          content:
            '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
        },
      },
    ];
    <ButtonBase
      size="xl"
      list={[
        {
          value: 'openMessage',
          onClick: () => {
            openMessage();
            setMessageTitle('备注历程');
            setContent([['timeLine', timelineConfig]]);
          },
        },
      ]}
    /> 
    */}
  </Provider>
);

export const Select_with_two_button = () => (
  <Provider store={store}>
    <MessagePopup />
    <Demo styleDemo="style-4" />
    {/* 
    const selectGroup1 = [
      { text: '单期中奖金额', value: 1 },
      { text: '单期投注金额', value: 2 },
      { text: '单期注单次数', value: 3 },
      { text: '当日总盈亏', value: 4 },
    ];
    <ButtonBase
      size="xl"
      list={[
        {
          value: 'openMessage',
          onClick: () => {
            openMessage();
            setMessageTitle('快捷带入');
            setContent([
              ['select', 'xl', selectGroup1],
            ]);
          },
        },
      ]}
    />
    */}
  </Provider>
);

export const Table_with_one_button = () => (
  <Provider store={store}>
    <MessagePopup />
    <Demo styleDemo="style-5" />
    {/* 
    const tableList = {
      header: [
        { title: '操作日期', textAlign: 'left' },
        { title: '操作前', textAlign: 'right' },
        { title: '操作后', textAlign: 'right' },
      ],
      bodyConfig: [
        { textAlign: 'left', width: 110 },
        { textAlign: 'right', width: 153 },
        { textAlign: 'right', width: 153 },
      ],
      body: [
        {
          data: ['2020-01-01 12:12:12', '999.000', '111.000'],
        },
        {
          data: ['2020-01-01 12:12:12', '1,123.000', '999.000'],
        },
        {
          data: ['2020-01-01 12:12:12', '111,111.000', '1,123.000'],
        },
        {
          data: ['2020-01-01 12:12:12', '222,222.000', '111,111.000'],
        },
        {
          data: ['2020-01-01 12:12:12', '333,333.000', '222,222.000'],
        },
        {
          data: ['2020-01-01 12:12:12', '444,444.000', '333,333.000'],
        },
        {
          data: ['2020-01-01 12:12:12', '555,555.000', '444,444.000'],
        },
        {
          data: ['2020-01-01 12:12:12', '666,666.000', '555,555.000'],
        },
        {
          data: ['2020-01-01 12:12:12', '999,999,999,999.000', '666,666.000'],
        },
      ],
    };
    <ButtonBase
      size="xl"
      list={[
        {
          value: 'openMessage',
          onClick: () => {
            openMessage();
            setMessageTitle('已达限额历程');
            setContent([['table', 'sm', tableList]]);
          },
        },
      ]}
    />
    */}
  </Provider>
);
