import React from 'react';
import TimeLine from 'BaseComponent/TimeLine';

export default {
  title: 'INP-EBO | 基本組件/TimeLine',
};

/**
 *
 * @param {string} list 顯示的時間軸清單，格式[{right: 'xxx', left: { title: 'xxx', content: 'xxx' },...},
 *
 */

export const timeLine = () => (
  <TimeLine
    list={[
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
    ]}
  />
);
