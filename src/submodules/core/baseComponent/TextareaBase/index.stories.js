import React from 'react';
import TextareaBase from 'BaseComponent/TextareaBase';

export default {
  title: 'INP-EBO | 基本組件/TextareaBase',
};

/**
 *
 * @param {string} title 顯示標題，預設不顯示標題
 * @param {string} placeholder  顯示提示字，預設不顯示提示字
 * @param {string} defaultValue 預設輸入框的值，預設為空值
 * @param {function} cusChange 輸入框改變事件
 *
 */

export const withTitle = () => (
  <TextareaBase
    title="這是標題"
    placeholder="請輸入文字"
    cusChange={value => alert(`TextareaBase, ${value}`)}
  />
);

export const withoutTitle = () => (
  <TextareaBase defaultValue="This is a book" />
);
