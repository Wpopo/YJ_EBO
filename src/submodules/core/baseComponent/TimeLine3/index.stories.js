import React from 'react';
import TimeLine from 'BaseComponent/TimeLine3';
import { add, format, startOfToday } from 'date-fns';

import _ from 'lodash';

export default {
  title: 'INP-EBO | 基本組件/TimeLine3',
};

/**
 *
 * @param {string} list 顯示的時間軸清單，
 * @param {number} showFirst 一開始顯示的數量
 * @param {number} showMoreNum 按下載入更多 一次顯示的數量
 * @param {function} propsToPass 欲傳給UnitChildren(顯示單元)的props
 */

export const timeLine = () => {
  const data = _.map(_.times(40), (v, i) => ({
    datetime: add(startOfToday(), { hours: v * 12 }),
  }));
  const renderItem = ({ item, index }) => (
    <div
      style={{
        height: 89,
        width: 304,
        backgroundColor: '#6da8e529',
        borderRadius: 4,
        margin: '4px 0',
        borderLeft: '4px solid #6da8e5',
      }}
    >
      {format(item.datetime, 'yyyy-MM-dd HH:mm:ss')}
    </div>
  );
  return <TimeLine data={data} renderItem={renderItem}></TimeLine>;
};
