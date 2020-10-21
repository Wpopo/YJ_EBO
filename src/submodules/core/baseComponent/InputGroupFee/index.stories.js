import React from 'react';
import { useImmer } from 'use-immer';
import InputGroupFee from 'BaseComponent/InputGroupFee';
import styles from './index.module.scss';
export default {
  title: 'INP-EBO | 基本組件/InputGroupFee',
};

/**
 *
 * @param {string} title 顯示標題，預設不顯示標題
 * @param {string} placeholder  顯示提示字，預設不顯示提示字
 * @param {string} defaultValue 預設輸入框的值，預設為空值
 * @param {boolean} hasCheckbox 是否顯示核取方塊，預設不顯示核取方塊
 * @param {string} checkboxName 核取方塊的名字
 * @param {function} checkboxChange 核取方塊改變事件
 * @param {boolean} checkboxChecked 核取方塊是否勾選，預設不勾選
 * @param {boolean} inputDisable 可否輸入之預設值，預設false
 * @param {string} unit 顯示單位，預設為％
 * @param {boolean} hasButton 右方是否為按鈕，預設false
 * @param {boolean} buttonDisable 按鈕是否disable, 預設false
 * @param {string|function} buttonContent 按鈕內容
 * @param {function} cusChange 輸入框改變事件
 * @param {function} cusClick 按鈕點擊事件
 * @param {Object} endAdornment endAdornment
 */

export const withCheckbox = () => {
  const [check, setCheck] = useImmer({ checkedA: true });
  const handleChange = event => {
    setCheck(draftState => {
      draftState[event.target.name] = event.target.checked;
    });
  };

  return (
    <InputGroupFee
      title="全部"
      defaultValue="0"
      checkboxName="checkedA"
      checkboxChange={handleChange}
      checkboxChecked={check.checkedA}
      hasCheckbox
      cusChange={e => console.log('Changed: ', e)}
    />
  );
};

export const withoutCheckbox = () => {
  return (
    <InputGroupFee
      title="全部"
      placeholder="請輸入渠道手续费"
      inputDisable={false}
      cusChange={e => console.log('Changed: ', e)}
    />
  );
};

export const withButton = () => {
  const [check, setCheck] = useImmer({ checkedA: true });
  const handleChange = event => {
    setCheck(draftState => {
      draftState[event.target.name] = event.target.checked;
    });
  };
  return (
    <InputGroupFee
      title="上级帐号"
      placeholder="请输入上级帐号"
      checkboxName="checkedA"
      checkboxChange={handleChange}
      checkboxChecked={check.checkedA}
      hasCheckbox
      cusChange={e => console.log('Changed: ', e)}
      hasButton
      buttonContent="检查帐号"
      cusClick={e => console.log('Clicked: ', e)}
    />
  );
};

export const withoutCheckbox2 = () => {
  return (
    <InputGroupFee
      title="状态"
      defaultValue="可疑"
      inputDisable={true}
      hasButton
      buttonContent={<i className={`las la-history ${styles.buttonIcon}`} />}
      cusClick={e => console.log('Clicked: ', e)}
    />
  );
};
