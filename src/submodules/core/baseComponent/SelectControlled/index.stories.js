import React, { useState } from 'react';
import SelectControlled from 'BaseComponent/SelectControlled';
import SpanStatus from 'BaseComponent/SpanStatus';

export default {
  title: 'INP-EBO | 基本組件/SelectControlled',
};

/**
 *
 * @param {array} list 下拉式選單清單，格式：[{text:'', value:''}, {...}, ...]
 * @param {string} title 顯示標題，預設不顯示標題
 * @param {string} value 選擇的值
 * @param {string} size 顯示大小，預設sm (xl,lgg,lg,mdd,mmd,md,sm,xs)
 * @param {function} renderValue 客製化顯示的值
 * @param {function} handleChange 下拉式選單改變事件,
 *
 */
export const SizeXl = () => {
  const [v, setV] = useState(1);
  return (
    <SelectControlled
      title="收款银行"
      value={v}
      size="xl"
      list={[
        { text: 'text1', value: 1 },
        { text: 'text2', value: 2 },
      ]}
      renderValue={v => <SpanStatus value={v} />}
      handleChange={(e, v) => {
        console.log('SelectDetailData', e.target.value);
        setV(e.target.value);
      }}
    />
  );
};
