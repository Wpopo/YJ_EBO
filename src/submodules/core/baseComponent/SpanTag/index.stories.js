import React from 'react';
import SpanTag from 'BaseComponent/SpanTag';

export default {
  title: 'INP-EBO | 基本組件/SpanTag',
};

/**
 *
 * @param {string} text 顯示之文字
 * @param {string} disabled 預設disable
 * @param {function} handleClick Ｘ符號點擊事件,
 * @param {string} size 大小style
 *
 */

const handleClick = () => {
  console.log('clicked');
};
export const spanTag = () => (
  <SpanTag text={'文字文字'} handleClick={handleClick} />
);
export const disabledSpanTag = () => (
  <SpanTag text={'文字文字'} handleClick={handleClick} disabled={true} />
);
