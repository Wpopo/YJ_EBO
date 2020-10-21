import React, { useCallback } from 'react';
import InputSearch2 from 'BaseComponent/InputSearch';

export default {
  title: 'INP-EBO | 基本組件/InputSearch',
};

/**
 * @param {String} name 設定搜尋框指定的Name
 * @param {string} defaultPlaceholder 顯示提示字，預設顯示『显示名称』
 * @param {length} searchLength 設定輸入此數字以上的字元才可使用搜尋，預設為『0』
 * @param {function} onClick 確認進行搜尋事件
 */

export const keyInLengthLimit = () => (
  <InputSearch2
    name="searchInput"
    defaultPlaceholder="請輸入搜尋內容"
    searchLength={3}
    onClick={useCallback(value => console.log(`InputSearch, ${value}`))}
  />
);
