import React from 'react';
import MessagePopup from 'Layout/MessagePopup';
import Pagination from 'Layout/Pagination2';
import { Provider } from 'react-redux';

import store from 'Redux/store';

import usePagination from 'Hooks/usePagination';
import { useInterceptor, useDispatchEvent } from 'Hooks/useInterceptor';
import { useAlertDialog } from 'Hooks/useAlertDialog';

export default {
  title: 'INP-EBO | 統一版型組件/Pagination2',
  decorators: [
    StoryFn => {
      return (
        <Provider store={store}>
          <MessagePopup />
          <StoryFn />
        </Provider>
      );
    },
  ],
};

/**
 *
 * @param {number} totalCount 資料的總筆數
 * @param {number} page 目前的頁數
 * @param {function} onPageChange 改變頁數的事件
 * @param {number} perPage 每頁筆數
 * @param {function} onPerPageChange 改變每頁筆數事件
 * */
export const Pagination2Demo = () => {
  const dispatchEvent = useDispatchEvent();
  const alert = useAlertDialog();

  const { setPage, setPerPage, ...control } = usePagination();

  const { page, perPage } = control;

  useInterceptor(async (action, prev, next) => {
    console.log('action', action, prev, next);
    await alert(action, `${prev} -> ${next}`);
  });

  const wrapper = handler => ({ target: { value } }) => handler(value);

  const handleSayHi = () => {
    dispatchEvent(() => console.log('Hi'), 'SAY_HI');
  };

  return (
    <>
      <button onClick={handleSayHi}>Say Hi!!</button>
      <div>
        切換到第
        <select value={page} onChange={wrapper(setPage)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
        頁
      </div>
      <div>
        rowsPerPage
        <select value={perPage} onChange={wrapper(setPerPage)}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        頁
      </div>
      <Pagination totalCount={123} {...control} />
    </>
  );
};
