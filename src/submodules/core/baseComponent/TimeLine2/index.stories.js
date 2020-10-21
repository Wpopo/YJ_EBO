import React from 'react';
import TimeLine from 'BaseComponent/TimeLine2';
import { sub, format } from 'date-fns';
import LogUnit from 'BaseComponent/LogUnit';

export default {
  title: 'INP-EBO | 基本組件/TimeLine2',
};

/**
 *
 * @param {string} list 顯示的時間軸清單，
 * @param {number} showFirst 一開始顯示的數量
 * @param {number} showMoreNum 按下載入更多 一次顯示的數量
 * @param {function} propsToPass 欲傳給UnitChildren(顯示單元)的props
 */

export const timeLine = () => {
  const list = Array(50)
    .fill(null)
    .map((el, idx) => ({
      data: {
        IP: '255.255.255.255',
        domain: 'vipzunlong1.com',
        device: idx % 2 === 0 ? 'iOS' : 'Android',
        status:
          idx % 3 === 0
            ? { text: '成功', style: 'success' }
            : { text: '失敗', style: 'danger' },
        inactive: idx % 4 === 0 ? true : false,
      },
      time: sub(new Date(), {
        years: Math.round(idx / 10),
        days: Math.round(idx / 4),
        minutes: idx,
      }),
    }));
  return (
    <TimeLine
      list={list}
      showFirst={4}
      showMoreNum={5}
      propsToPass={unit => ({
        log: {
          IP: unit.data.IP,
          域名: unit.data.domain,
          装置: unit.data.device,
        },
        time: format(unit.time, 'HH:mm:ss'),
        styleType: unit.data.status.style === 'success' ? 'style-1' : 'style-2',
        status: unit.data.status,
        icon: unit.data.inactive
          ? {
              icon: <i className="las la-exclamation-circle" />,
              tooltip: '不活跃，自动登出',
            }
          : null,
      })}
    >
      <TimeLine.Unit>
        <LogUnit />
      </TimeLine.Unit>
    </TimeLine>
  );
};
