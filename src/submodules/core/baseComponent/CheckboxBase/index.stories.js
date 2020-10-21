import React from 'react';
import { useImmer } from 'use-immer';
import CheckboxBase from 'BaseComponent/CheckboxBase';

export default {
  title: 'INP-EBO | 基本組件/CheckboxBase',
};

/**
 *
 * @param {string} title 顯示標題，預設不顯示標題
 * @param {string} text  顯示提示字，預設不顯示文字
 * @param {string} checkboxName 核取方塊的名字
 * @param {function} checkboxChange 核取方塊改變事件
 * @param {boolean} checkboxChecked 核取方塊是否勾選，預設不勾選
 * @param {boolean} disabled 核取方塊是否可勾選，預設false
 */

export const withTitleAndText = () => {
  const [check, setCheck] = useImmer({ checkedB: true });
  const handleChange = event => {
    setCheck(draftState => {
      draftState[event.target.name] = event.target.checked;
    });
  };

  return (
    <CheckboxBase
      title="询问客服"
      checkboxName="checkedB"
      checkboxChange={e => handleChange(e)}
      checkboxChecked={check.checkedB}
      text="询问客服"
    />
  );
};

export const withTitle = () => {
  const [check, setCheck] = useImmer({ checkedB: true });
  const handleChange = event => {
    setCheck(draftState => {
      draftState[event.target.name] = event.target.checked;
    });
  };

  return (
    <CheckboxBase
      title="询问客服"
      checkboxName="checkedB"
      checkboxChange={e => handleChange(e)}
      checkboxChecked={check.checkedB}
    />
  );
};

export const withText = () => {
  const [check, setCheck] = useImmer({ checkedB: true });
  const handleChange = event => {
    setCheck(draftState => {
      draftState[event.target.name] = event.target.checked;
    });
  };

  return (
    <CheckboxBase
      checkboxName="checkedB"
      checkboxChange={e => handleChange(e)}
      checkboxChecked={check.checkedB}
      text="询问客服"
    />
  );
};

export const onlyCheckbox = () => {
  const [check, setCheck] = useImmer({ checkedB: true });
  const handleChange = event => {
    setCheck(draftState => {
      draftState[event.target.name] = event.target.checked;
    });
  };

  return (
    <CheckboxBase
      checkboxName="checkedB"
      checkboxChange={e => handleChange(e)}
      checkboxChecked={check.checkedB}
    />
  );
};
