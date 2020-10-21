import React, { useState } from 'react';
import PaginationControlled from 'Layout/PaginationControlled';

export default {
  title: 'INP-EBO | 統一版型組件/PaginationControlled',
};

/**
 *
 * @param {number} totalCount 資料的總筆數
 * @param {number} currentPage 目前的頁數
 * @param {function} handleChangePage 改變頁數的事件
 * @param {number} rowsPerPage 每頁筆數
 * @param {function} handleRowsPerPageChange 改變每頁筆數事件
 * */
export const PaginationControlledDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <>
      <div>
        切換到第
        <select
          value={currentPage}
          onChange={e => {
            setCurrentPage(parseInt(e.target.value));
          }}
        >
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
        <select
          value={rowsPerPage}
          onChange={e => {
            setRowsPerPage(parseInt(e.target.value));
          }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        頁
      </div>
      <PaginationControlled
        totalCount={100}
        currentPage={currentPage}
        handleChangePage={v => {
          setCurrentPage(parseInt(v));
        }}
        rowsPerPage={rowsPerPage}
        handlerowsPerPageChange={v => {
          setRowsPerPage(parseInt(v));
        }}
      />
    </>
  );
};
