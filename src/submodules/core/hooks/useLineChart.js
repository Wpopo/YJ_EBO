import { useImmerReducer } from 'use-immer';

import { defaultLineParams } from 'BaseComponent/ChartBase';

const useLineChart = () => {
  const initState = {
    lineData: [],
    lineParams: defaultLineParams,
    tooltipX: 'HH:mm',
  };
  const reducer = (draft, { type, payload }) => {
    switch (type) {
      case 'SET_LINE_DATA':
        draft.lineData = payload;
        return;
      case 'SET_X_FORMAT':
        draft.lineParams.xScale.format = payload.xFormat;
        draft.lineParams.xScale.precision = payload.precision;
        draft.lineParams.axisBottom.format = payload.xFormat;
        draft.tooltipX = payload.tooltipX;
        return;
    }
  };
  const [lineState, dispatch] = useImmerReducer(reducer, initState);

  /**
   * 將後端回傳資料，轉換取得 LineChart data
   * @param {Array} data 後端回傳資料
   * @param {Array} labelLine 要顯示在圖中的數據
   * @param {String} interval 統計資料的時間頻率
   */
  const setLineState = (data, labelLine, interval = 'hour') => {
    const payload = labelLine.map(item1 => {
      const object = { id: item1.id, data: null };
      object.data = data.map(item2 => ({
        x: item2.date,
        y: item2[item1.key] || 0,
      }));
      return object;
    });
    dispatch({ type: 'SET_LINE_DATA', payload });
    _setXFormat(interval);
  };

  const _setXFormat = interval => {
    const payload = {
      xFormat: '%H:%M',
      precision: 'minute',
      tooltipX: 'HH:mm',
    };
    if (interval === 'day') {
      payload.xFormat = '%Y-%m-%d';
      payload.precision = interval;
      payload.tooltipX = 'yyyy-MM-dd';
    }
    dispatch({ type: 'SET_X_FORMAT', payload });
  };

  return {
    lineState,
    setLineState,
  };
};

export default useLineChart;
