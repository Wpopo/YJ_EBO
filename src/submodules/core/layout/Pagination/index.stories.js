import React from 'react';
import Pagination from 'Layout/Pagination';

export default {
  title: 'INP-EBO | 統一版型組件/Pagination',
};

/**
 *
 * @param {number} totalCount 資料的總筆數
 * @param {function} cusChangePage 變更頁數時的事件
 * @param {function} handleChangePagePromise 變更頁數時先執行之Promise function
 */

export const pagination = () => <Pagination totalCount={100} />;
