import React from 'react';
import ToolTip from 'BaseComponent/ToolTip';
import { makeStyles } from '@material-ui/core/styles';

export default {
  title: 'INP-EBO | 基本組件/ToolTip',
};

/**
 *
 * @param {string} list 顯示Button模組，若傳入多個則顯示Button群組模式，若傳入一個則顯示單一Button的模式，格式：[{ value: 'xxx', onClick: () => ... }],{...},
 * @param {string} defaultIndex for Button Group使用，預設選擇的按鈕
 * @param {string} size 按鈕顯示大小，預設md (xxl,xl,lg,md,sm,xs)
 * @param {string} styleType 顯示的樣式，預設為『style-1』
 *
 */
const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    '& .row': {
      display: 'flex',
      alignItems: 'center',
      '& .icon': {
        width: '8px',
        height: '8px',
        borderRadius: '2px',
        backgroundColor: '#d26a5c',
        display: 'block',
        marginRight: '8px',
      },
    },
  },
}));

export const tooltip = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      <ToolTip
        textDom={
          <div className={classes.root}>
            <div className="row">
              <i className="icon" />
              <span>可疑玩家</span>
            </div>
            <div className="row">
              <i className="icon" />
              <span>禁止登录</span>
            </div>
          </div>
        }
        children={<i className="las la-exclamation-triangle" />}
      />
    </div>
  );
};
