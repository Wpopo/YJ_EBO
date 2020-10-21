import React from 'react';
import ButtonOperation from 'BaseComponent/ButtonOperation';

export default {
  title: 'INP-EBO | 基本組件/ButtonOperation',
};

/**
 *
 * @param {string} stylesType button種類
 * @param {string} text 傳入的文字
 * @param {function} handleClick 傳入點擊事件
 * @param {boolean} disabled 是否可點擊
 */

export const primary = () => (
  <ButtonOperation
    stylesType="primary"
    text="编辑"
    handleClick={() => console.log('click')}
  />
);

export const success = () => (
  <ButtonOperation
    stylesType="success"
    text="启用"
    handleClick={() => console.log('click')}
  />
);

export const danger = () => (
  <ButtonOperation
    stylesType="danger"
    text="撤单"
    handleClick={() => console.log('click')}
  />
);

export const warning = () => (
  <ButtonOperation
    stylesType="warning"
    text="暂停"
    handleClick={() => console.log('click')}
  />
);

export const info = () => (
  <ButtonOperation
    stylesType="info"
    text="详情"
    handleClick={() => console.log('click')}
  />
);

export const disabled = () => (
  <ButtonOperation
    stylesType="primary"
    text="撤单"
    handleClick={() => console.log('click')}
    disabled
  />
);
