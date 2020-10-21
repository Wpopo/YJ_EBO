import React, { useState } from 'react';
import Dialog from 'Layout/Dialog';

export default {
  title: 'INP-EBO | 統一版型組件/Dialog',
};

/**
 * @param {String} title 標題
 * @param {Component} children  內容
 * @param {boolean} open 外部傳進開關控制，預設false
 * @param {function} handleClose 關閉function
 * @param {Array} buttonList 預設[]
 * [
    { value: '右邊button', onClick: () => console.log('右邊'), disabled: false },
    { value: '左邊button', onClick: () => console.log('左邊'), disabled: false },
  ]
 */
export const Dialog_with_two_button = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button
        onClick={() => {
          setOpen(prevState => {
            const newState = !prevState;
            return newState;
          });
        }}
      >
        Open/Close
      </button>
      <Dialog
        title="標題"
        open={open}
        handleClose={handleClose}
        buttonList={[
          {
            value: '確認',
            onClick: () => console.log('確認'),
            disabled: false,
          },
          {
            value: '取消',
            onClick: handleClose,
            disabled: false,
          },
        ]}
      >
        {<p>內容</p>}
      </Dialog>
    </>
  );
};

export const Dialog_with_one_button = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button
        onClick={() => {
          setOpen(prevState => {
            const newState = !prevState;
            return newState;
          });
        }}
      >
        Open/Close
      </button>
      <Dialog
        title="標題"
        content="content"
        open={open}
        handleClose={handleClose}
        buttonList={[
          {
            value: '確認',
            onClick: () => console.log('確認'),
            disabled: false,
          },
        ]}
      >
        {<p>內容</p>}
      </Dialog>
    </>
  );
};
