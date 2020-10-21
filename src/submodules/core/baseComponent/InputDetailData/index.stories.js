import React, { useState, useEffect } from 'react';
import InputDetailData from 'BaseComponent/InputDetailData';

export default {
  title: 'INP-EBO | 基本組件/InputDetailData',
};

/**
 *
 * @param {string} title 顯示標題，預設顯示『显示名称』
 * @param {string} placeholder  顯示提示字，預設顯示『请输入显示名称』
 * @param {string} textAlign 字型靠左or靠右，預設顯示『靠左』
 * @param {string} size 輸入框顯示大小，預設sm (lg,md,sm,xs,xxs
 * @param {string} defaultValue 預設輸入框的值，預設為空值
 * @param {Object} rightIcon 右邊Icon Config，格式：['icon class', onClick]
 * @param {string} cusClass 客製化className
 * @param {boolean} disabled 是否可輸入，預設true
 * @param {function} cusChange 輸入框改變事件
 * @param {function} cusEnter 輸入框Enter事件
 */

export const SizeLg = () => {
  const [defaultV, setDefault] = useState(null);
  useEffect(() => {
    setTimeout(setDefault('default Value'), 1000);
  }, []);
  if (defaultV)
    return (
      <>
        <p>default Value Loaded After 1sec</p>
        <InputDetailData
          size="lg"
          textAlign="left"
          cusChange={() => console.log('cusChange')}
          disabled={false}
          defaultValue={defaultV}
        />
      </>
    );
  else return null;
};

export const SizeMdTextAlignRight = () => (
  <InputDetailData
    size="md"
    textAlign="right"
    cusEnter={() => alert('InputDetailData, cusEnter')}
  />
);

export const SizeSm = () => <InputDetailData size="sm" />;

export const SizeXs = () => (
  <InputDetailData size="xs" placeholder="无限" textAlign="right" title="" />
);

export const SizeXxs = () => (
  <InputDetailData size="xxs" placeholder="请输入" title="" />
);

export const CusClassModelInput = () => (
  <InputDetailData cusClass="modelInput" title="" />
);

export const InputWithRightIcon = () => {
  return (
    <InputDetailData
      title="商户号"
      placeholder="请输入商户号"
      rightIcon={['las la-list', v => console.log(v)]}
      size="xl"
    />
  );
};

export const InputDisabled = () => (
  <InputDetailData
    size="md"
    textAlign="right"
    cusEnter={() => alert('InputDetailData, cusEnter')}
    disabled={true}
  />
);
