import React from 'react';
import { useImmer } from 'use-immer';
import SwitchBase from 'BaseComponent/SwitchBase';

export default {
  title: 'INP-EBO | 基本組件/SwitchBase',
};

/**
 *
 * @param {string} title 顯示標題，預設不顯示標題
 * @param {string} text  顯示提示字，預設不顯示文字
 * @param {string} switchName switch名字
 * @param {boolean} checked 傳入switch 開/關, 預設false
 * @param {boolean} hasIcon 是否有右側Icon, 預設false
 * @param {function} iconClicked 右側Icon點擊事件
 * @param {function} switchChange switch改變事件
 *
 */

export const withTitleAndText = () => {
  const [check, setCheck] = useImmer({ checkedA: true });
  const handleChange = event => {
    console.log('change', event.target.checked);
    setCheck(draftState => {
      draftState[event.target.name] = event.target.checked;
    });
  };

  return (
    <SwitchBase
      title="爱码彩票"
      switchName="checkedA"
      checked={check.checkedA}
      switchChange={e => handleChange(e)}
      text="20/100款遊戲"
      hasIcon={true}
      iconClicked={() => {
        console.log('clicked');
      }}
    />
  );
};

export const withTitle = () => {
  const [check, setCheck] = useImmer({ checkedB: false });
  const handleChange = event => {
    console.log('change', event.target.checked);
    setCheck(draftState => {
      draftState[event.target.name] = event.target.checked;
    });
  };

  return (
    <SwitchBase
      title="可疑玩家"
      switchName="checkedB"
      checked={check.checkedB}
      switchChange={e => handleChange(e)}
      hasIcon={true}
      iconClicked={() => {
        console.log('clicked');
      }}
    />
  );
};
