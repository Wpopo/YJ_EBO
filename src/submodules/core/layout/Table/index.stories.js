import React, { Fragment } from 'react';
import store from 'Redux/store';
import { Provider } from 'react-redux';
import Table from 'Layout/Table';
import SpanStatus from 'BaseComponent/SpanStatus';

export default {
  title: 'INP-EBO | 統一版型組件/Table',
};

export const table = () => (
  <Provider store={store}>
    <Table isCheckbox isSelectedRow tableList={tableList} />
  </Provider>
);

const tableList = {
  header: [
    { title: '显示名称', textAlign: 'left' },
    { title: '收款银行', textAlign: 'center' },
    { title: '商户名称', textAlign: 'center' },
    { title: '已达限额', textAlign: 'right' },
    { title: '状态', textAlign: 'left' },
    { title: '操作', textAlign: 'left' },
  ],
  bodyConfig: [
    { textAlign: 'left', width: 150 },
    { textAlign: 'center', width: 100 },
    { textAlign: 'center', width: 100 },
    { textAlign: 'right', width: 200 },
    { textAlign: 'left', width: 100 },
    { textAlign: 'left', width: 100 },
  ],
  body: [
    {
      onClick: () => {
        console.log('onClick-1');
        console.log('setOpenDrawer(true)');
      },
      data: [
        '农银上海支行',
        '农业银行',
        '富乐支付',
        '4,800',
        <SpanStatus value={'启用'} styleType={'style-1'} />,
        <Fragment>
          <span
            onClick={e => {
              e.stopPropagation();
              console.log('编辑');
            }}
          >
            编辑
          </span>
          <span
            onClick={e => {
              e.stopPropagation();
              console.log('暂停');
            }}
          >
            暂停
          </span>
        </Fragment>,
      ],
    },
    {
      onClick: () => console.log('onClick-2'),
      data: [
        '交银青岛支行',
        '交通银行',
        '富乐支付',
        '999,999,999,999.000',
        <SpanStatus value={'启用'} styleType={'style-1'} />,
        <Fragment>
          <span
            onClick={e => {
              e.stopPropagation();
              console.log('编辑');
            }}
          >
            编辑
          </span>
          <span
            onClick={e => {
              e.stopPropagation();
              console.log('暂停');
            }}
          >
            暂停
          </span>
        </Fragment>,
      ],
    },
    {
      onClick: () => console.log('onClick-3'),
      data: [
        '兴银长春支行',
        '兴业银行',
        '富乐支付',
        '999,999,999,999.000',
        <SpanStatus value={'启用'} styleType={'style-1'} />,
        <Fragment>
          <span
            onClick={e => {
              e.stopPropagation();
              console.log('编辑');
            }}
          >
            编辑
          </span>
          <span
            onClick={e => {
              e.stopPropagation();
              console.log('暂停');
            }}
          >
            暂停
          </span>
        </Fragment>,
      ],
    },
    {
      onClick: () => console.log('onClick-4'),
      data: [
        '广银义岛支行',
        '广发银行',
        '富乐支付',
        '999,999,999,999.000',
        <SpanStatus value={'启用'} styleType={'style-1'} />,
        <Fragment>
          <span
            onClick={e => {
              e.stopPropagation();
              console.log('编辑');
            }}
          >
            编辑
          </span>
          <span
            onClick={e => {
              e.stopPropagation();
              console.log('暂停');
            }}
          >
            暂停
          </span>
        </Fragment>,
      ],
    },
  ],
};
