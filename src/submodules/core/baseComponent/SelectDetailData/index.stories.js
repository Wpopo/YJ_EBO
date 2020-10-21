import React from 'react';
import SelectDetailData from 'BaseComponent/SelectDetailData';
import SpanStatus from 'BaseComponent/SpanStatus';

export default {
  title: 'INP-EBO | 基本組件/SelectDetailData',
};

/**
 *
 * @param {array} list 下拉式選單清單，格式：[{text:'', value:''}, {...}, ...]
 * @param {string} title 顯示標題，預設不顯示標題
 * @param {string} defaultValue 預設的選項值
 * @param {string} size 顯示大小，預設sm (xl,lg,md,sm,xs)
 * @param {function} renderValue 客製化顯示的值
 * @param {function} cusHandleChange 客製化下拉式選單改變事件,
 *
 */

export const sizeXl = () => (
  <SelectDetailData
    title="收款银行"
    defaultValue={1}
    size="xl"
    list={[
      { text: 'text1', value: 1 },
      { text: 'text2', value: 2 },
    ]}
    renderValue={v => <SpanStatus value={v} />}
    cusHandleChange={v => console.log('SelectDetailData', v)}
  />
);

export const sizeLg = () => (
  <SelectDetailData
    title="收款银行"
    defaultValue="请选择收款银行"
    size="lg"
    list={[
      { text: 'text1', value: 1 },
      { text: 'text2', value: 2 },
    ]}
    cusHandleChange={v => alert(`SelectDetailData, ${v}`)}
  />
);

export const sizeMd = () => (
  <SelectDetailData
    title="收款银行"
    defaultValue="请选择收款银行"
    size="md"
    list={[
      { text: 'text1', value: 1 },
      { text: 'text2', value: 2 },
    ]}
    cusHandleChange={v => alert(`SelectDetailData, ${v}`)}
  />
);

export const sizeSm = () => (
  <SelectDetailData
    title="收款银行"
    defaultValue="请选择收款银行"
    size="sm"
    list={[
      { text: 'text1', value: 1 },
      { text: 'text2', value: 2 },
    ]}
    cusHandleChange={v => alert(`SelectDetailData, ${v}`)}
  />
);

export const sizeXs = () => (
  <SelectDetailData
    title="收款银行"
    defaultValue="请选择收款银行"
    size="xs"
    list={[
      { text: '1', value: 1 },
      { text: '10', value: 10 },
    ]}
    cusHandleChange={v => alert(`SelectDetailData, ${v}`)}
  />
);
