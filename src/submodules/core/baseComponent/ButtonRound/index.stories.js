import React from 'react';
import ButtonRound from 'BaseComponent/ButtonRound';

export default {
  title: 'INP-EBO | 基本組件/ButtonRound',
};

/**
 *
 * @param {string} buttonText 按鈕顯示文字，預設'新增'
 * @param {function} buttonIcon 按鈕Icon
 * @param {function} cusClick 傳入之點擊事件
 * @param {string} styleType 顯示的樣式，預設為『style-2』
 * @param {string} size 顯示的大小 預設''
 *
 */

export const whithout_shadow = () => (
  <ButtonRound
    buttonText="每日"
    buttonIcon={<i className={'las la-history'} />}
    styleType="style-1"
    cusClick={name => {
      console.log(name, 'clicked');
    }}
  />
);

export const whith_shadow = () => (
  <ButtonRound
    buttonText="新增"
    buttonIcon={<i className={'las la-plus '} />}
    styleType="style-2"
    cusClick={name => {
      console.log(name, 'clicked');
    }}
  />
);

export const small_woText = () => (
  <ButtonRound
    buttonText=""
    buttonIcon={<i className={'las la-trash-alt la-lg'} />}
    styleType="style-1"
    cusClick={name => {
      console.log(name, 'clicked');
    }}
    size="sm"
  />
);
