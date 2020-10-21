import React from 'react';
import RadioBase from 'BaseComponent/RadioBase';

export default {
  title: 'INP-EBO | 基本組件/RadioBase',
};

/**
 *
 * @param {array} list 選單清單，格式：[{code: 'X1', name: 'Y1'}, {code: 'X2', name: 'Y2'}, ...]
 * @param {string} title 顯示標題，預設不顯示標題
 * @param {string} defaultValue 預設的選項值
 * @param {function} cusHandleChange 客製化選單改變事件,
 * @param {string} flex_direction title與radio排列方向, 若輸入'row'則為平行排列
 *
 */

export const listAttribute = () => (
  <RadioBase
    title="状态"
    list={[
      { code: '1', name: '启用' },
      { code: '2', name: '暂停' },
      { code: '3', name: '禁用' },
    ]}
    defaultValue={1}
    cusHandleChange={v => console.log(`RadioBase, ${v}`)}
  />
);

export const flex_row = () => (
  <RadioBase
    title="状态"
    list={[
      { code: '1', name: '启用' },
      { code: '2', name: '暂停' },
      { code: '3', name: '禁用' },
    ]}
    defaultValue={1}
    cusHandleChange={v => console.log(`RadioBase, ${v}`)}
    flex_direction="row"
  />
);
