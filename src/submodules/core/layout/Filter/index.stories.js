import React from 'react';
import Filter from 'Layout/Filter';

export default {
  title: 'INP-EBO | 統一版型組件/Filter',
};

/**
 *
 * @param {string} defaultPlaceholder 顯示提示字，預設顯示『显示名称』
 * @param {length} searchLength 設定輸入此數字以上的字元才可使用搜尋，預設為『0』
 * @param {function} onSearchClick 確認進行搜尋事件
 * @param {string} buttonGroupRight 右邊Button模組，可傳入參數如下：{
 *        @param {string} list 顯示Button模組，若傳入多個則顯示Button群組模式，若傳入一個則顯示單一Button的模式，格式：[{ value: 'xxx', onClick: () => ... }],{...},
 *        @param {string} defaultIndex for Button Group使用，預設選擇的按鈕
 *        @param {string} size 按鈕顯示大小，預設md (xxl,xl,lg,md,sm,xs)
 *        @param {string} styleType 顯示的樣式，預設為『style-1』
 *  }
 * @param {string} buttonGroupLeft 左邊Button模組，可傳入參數如下：{
 *        @param {string} list 顯示Button模組，若傳入多個則顯示Button群組模式，若傳入一個則顯示單一Button的模式，格式：[{ value: 'xxx', onClick: () => ... }],{...},
 *        @param {string} defaultIndex for Button Group使用，預設選擇的按鈕
 *        @param {string} size 按鈕顯示大小，預設md (xxl,xl,lg,md,sm,xs)
 *        @param {string} styleType 顯示的樣式，預設為『style-1』
 *  }
 */

export const filter = () => (
  <Filter
    onSearchClick={v => console.log('onSearchClick', v)}
    buttonGroupRight={{
      list: [
        { value: '全部', onClick: () => console.log('全部') },
        { value: '待审核', onClick: () => console.log('待审核') },
        { value: '批准', onClick: () => console.log('批准') },
        { value: '拒绝', onClick: () => console.log('拒绝') },
      ],
      size: 'md',
      styleType: 'style-4',
    }}
    buttonGroupLeft={{
      list: [{ value: '筛选', onClick: () => console.log('筛选') }],
      size: 'md',
      styleType: 'style-2',
    }}
  />
);
