import React from 'react';
import ButtonBase from 'BaseComponent/ButtonBase';

import { Provider } from 'react-redux';

import store from 'Redux/store';

export default {
  title: 'INP-EBO | 基本組件/ButtonBase',
  decorators: [
    StoryFn => {
      return (
        <Provider store={store}>
          <StoryFn />
        </Provider>
      );
    },
  ],
};

/**
 *
 * @param {string} list 顯示Button模組，若傳入多個則顯示Button群組模式，若傳入一個則顯示單一Button的模式，格式：[{ value: 'xxx', onClick: () => ... }],{...},
 * @param {string} defaultIndex for Button Group使用，預設選擇的按鈕
 * @param {string} size 按鈕顯示大小，預設md (xxl,xl,lg,md,sm,xs)
 * @param {string} styleType 顯示的樣式，預設為『style-1』
 * @param {function} getCurrentBtn 取得目前的選項值
 *
 */

export const group_4_style_4_size_md = () => (
  <ButtonBase
    list={[
      { value: '全部', onClick: () => console.log('全部') },
      { value: '待审核', onClick: () => console.log('待审核') },
      { value: '批准', onClick: () => console.log('批准') },
      { value: '拒绝', onClick: () => console.log('拒绝') },
    ]}
    size={'md'}
    styleType={'style-4'}
  />
);
export const group_3_style_9_size_sm_icon = () => (
  <ButtonBase
    list={[
      {
        value: <i className="las la-pen-nib la-lg" />,
        onClick: () => console.log('la-pen'),
      },
      {
        value: <i className="las la-plus la-lg" />,
        onClick: () => console.log('la-pen'),
      },
      {
        value: <i className="las la-filter la-lg" />,
        onClick: () => console.log('la-pen'),
      },
    ]}
    size={'sm'}
    styleType={'style-9'}
  />
);

export const group_2_style_5_size_sm = () => (
  <ButtonBase
    list={[
      { value: '相对', onClick: () => console.log('相对') },
      { value: '绝对', onClick: () => console.log('绝对') },
    ]}
    defaultIndex={1}
    size={'sm'}
    styleType={'style-5'}
  />
);

export const group_2_style_5_size_xxs = () => (
  <ButtonBase
    list={[
      { value: '和', onClick: () => console.log('和') },
      { value: '或', onClick: () => console.log('或') },
    ]}
    defaultIndex={0}
    size={'xxs'}
    styleType={'style-5'}
  />
);

export const style_1_size_md = () => (
  <ButtonBase
    list={[{ value: '保存', onClick: () => console.log('保存') }]}
    styleType={'style-1'}
  />
);

export const style_1_size_xl = () => (
  <ButtonBase
    list={[{ value: '批准', onClick: () => console.log('批准') }]}
    size={'xl'}
    styleType={'style-1'}
  />
);

export const style_1_size_lg = () => (
  <ButtonBase
    list={[{ value: '取消', onClick: () => console.log('取消') }]}
    size={'lg'}
    styleType={'style-1'}
  />
);

export const style_3_size_lg = () => (
  <ButtonBase
    list={[{ value: '新增', onClick: () => console.log('新增') }]}
    size={'lg'}
    styleType={'style-3'}
  />
);

export const style_2_size_md = () => (
  <ButtonBase
    list={[{ value: '筛选', onClick: () => console.log('筛选') }]}
    size={'md'}
    styleType={'style-2'}
  />
);
