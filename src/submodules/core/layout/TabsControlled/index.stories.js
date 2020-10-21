import React, { useState } from 'react';
import TabsControlled from 'Layout/TabsControlled';

export default {
  title: 'INP-EBO | 統一版型組件/TabsControlled',
};

/**
 * @param {Object} tabList :{
 *        @param {Object} idx Index :{
 *                @param {String} title 標題
 *                @param {Element} children Body Component
 *        }
 * }
 * @param {number} tabIdx 由外部控制的tab index
 * @param {String} stylesType 顯示的樣式，預設顯示『style-1』
 * @param {function} handleChange tab改變執行的function
 */

const tabList2 = {
  0: { title: 'H5支付', children: <div>123</div> },
  1: { title: 'APP支付', children: <div>456</div> },
};

export const Style_2 = () => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <TabsControlled
      tabIdx={tabIdx}
      handleChange={idx => {
        setTabIdx(idx);
      }}
      tabList={tabList2}
      stylesType={'style-2'}
    />
  );
};

export const Style_1 = () => {
  const [tabIdx, setTabIdx] = useState(0);
  const [subtabIdx, setsubTabIdx] = useState(0);

  const tabList = {
    0: {
      title: '微信支付',
      children: (
        <TabsControlled
          tabList={tabList2}
          stylesType={'style-2'}
          tabIdx={subtabIdx}
          handleChange={idx => {
            setsubTabIdx(idx);
          }}
        />
      ),
    },
    1: { title: '支付宝支付', children: <div>456</div> },
    2: { title: '银联支付', children: <div>789</div> },
    3: { title: '快捷支付', children: <div>012</div> },
    4: { title: '网银支付', children: <div>345</div> },
    5: { title: '银行入款', children: <div>678</div> },
  };

  return (
    <>
      <button
        onClick={() => {
          if (tabIdx < 5) setTabIdx(idx => idx + 1);
          else {
            setTabIdx(0);
          }
        }}
      >
        TabIdx++
      </button>
      <button
        onClick={() => {
          if (subtabIdx === 0) setsubTabIdx(1);
          else {
            console.log(subtabIdx);
            setsubTabIdx(0);
          }
        }}
      >
        subTabIdx++
      </button>
      <TabsControlled
        tabIdx={tabIdx}
        handleChange={idx => {
          setTabIdx(idx);
        }}
        tabList={tabList}
        stylesType={'style-1'}
      />
    </>
  );
};
