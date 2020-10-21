import React from 'react';
import SpanStatus from 'BaseComponent/SpanStatus';

export default {
  title: 'INP-EBO | 基本組件/SpanStatus',
};

/**
 *
 * @param {string} styleType 顯示的樣式，預設為『style-1』
 *                       style-1- color: $successColor
 *                       style-2- color: $warningColor
 *                       style-3- color: $dangerColor
 *                       style-4- color: $secondaryColor2
 *                       style-5- color: $primaryColor
 *                       style-6- color: $infoColor
 * @param {string} value 顯示的文字
 * @param {string} type 顯示的樣式
 *
 */

export const styletype1Style1 = () => (
  <SpanStatus value={'批准'} styleType={'style-1'} />
);

export const styletype1style2 = () => (
  <SpanStatus value={'待审核'} styleType={'style-2'} />
);

export const styletype1style3 = () => (
  <SpanStatus value={'拒绝'} styleType={'style-3'} />
);

export const styletype1style4 = () => (
  <SpanStatus value={'未开奖'} styleType={'style-4'} />
);

export const styletype1style5 = () => (
  <SpanStatus value={'已下发'} styleType={'style-5'} />
);

export const styletype1style6 = () => (
  <SpanStatus value={'待下发'} styleType={'style-6'} />
);

export const styletype2Style1 = () => (
  <SpanStatus value={'批准'} styleType={'style-1'} type={'styleType-2'} />
);

export const styletype2style2 = () => (
  <SpanStatus value={'待审核'} styleType={'style-2'} type={'styleType-2'} />
);

export const styletype2style3 = () => (
  <SpanStatus value={'拒绝'} styleType={'style-3'} type={'styleType-2'} />
);

export const styletype2style4 = () => (
  <SpanStatus value={'未开奖'} styleType={'style-4'} type={'styleType-2'} />
);

export const styletype2style5 = () => (
  <SpanStatus value={'已下发'} styleType={'style-5'} type={'styleType-2'} />
);

export const styletype2style6 = () => (
  <SpanStatus value={'待下发'} styleType={'style-6'} type={'styleType-2'} />
);
