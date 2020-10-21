import React from 'react';
import LogUnit from 'BaseComponent/LogUnit';

export default {
  title: 'INP-EBO | 基本組件/LogUnit',
};

/**
 * @param {Object}} log 傳入的Content, 會依照key, value方式呈現 ex.{
      IP: '255.255.255.255',
      域名: 'vipzunlong1.com',
      装置: 'iOS',
    }
 * @param {String} time 右下方顯示的時間
 * @param {String} styleType 欲顯示的背景style
 * @param {Object} status 右上方狀態 預設null   ex.  status={{ text: '成功', style: 'success' }}
 */

export const style1 = () => (
  <LogUnit
    log={{
      IP: '255.255.255.255',
      域名: 'vipzunlong1.com',
      装置: 'iOS',
    }}
    time="22:10:10"
    styleType="style-1"
    status={{ text: '成功', style: 'success' }}
  />
);

export const style2 = () => (
  <LogUnit
    log={{
      IP: '255.255.255.255',
      域名: 'vipzunlong1.com',
      装置: 'Android',
    }}
    icon={{
      icon: <i className="las la-exclamation-circle" />,
      tooltip: '不活跃，自动登出',
    }}
    time="22:10:10"
    styleType="style-2"
    status={{ text: '失敗', style: 'danger' }}
  />
);
