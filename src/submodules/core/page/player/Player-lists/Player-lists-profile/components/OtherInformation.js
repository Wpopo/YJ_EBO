import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  add,
  format,
  isValid,
  differenceInDays,
} from 'date-fns';
import styles from './OtherInformation.module.scss';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getPlayerChartDataAction,
  getPlayerChartDataAction2,
  getTotalDownLineCountAction,
  getGameTypeAction,
} from 'Redux/axios/action';
import { PLAYER_LISTS as API } from 'Constants/api/api';

//material-UI
import { DateRangePicker } from '@material-ui/pickers';
import InputDetailData from 'BaseComponent/InputDetailData';
import SelectDetailData from 'BaseComponent/SelectDetailData';
import ButtonBase from 'BaseComponent/ButtonBase';
import { LineChart, BarChart } from 'BaseComponent/ChartBase';
import Tabs from 'Layout/Tabs';

import useLineChart from 'Hooks/useLineChart';

const tabList = {
  0: {
    title: '平台表现',
    children: null,
  },
  1: { title: '产品表现', children: null },
  2: { title: '代理关系', children: null },
};

const select = [
  { text: '个人', value: '个人' },
  { text: '团队', value: '团队' },
];
const select1 = [
  { text: '个人彩票', value: '个人彩票' },
  { text: '团队彩票', value: '团队彩票' },
];

const chartKeyData = ['投注金额', '有效投注额'];

// 要顯示在圖中的數據
const labelLine = [
  { id: '出款总额', key: 'totalWithdrawals' },
  { id: '入款总额', key: 'totalDeposit' },
  { id: '实际盈亏', key: 'profit' },
  { id: '团队赚水', key: 'teamEarns' },
];

const today = startOfDay(Date.now());
const range = {
  昨日: [add(today, { days: -1 }), add(today, { seconds: -1 }), 'hour'],
  今日: [today, endOfDay(today), 'hour'],
  近七日: [add(today, { days: -7 }), endOfDay(today), 'day'],
  本月: [startOfMonth(today), endOfMonth(today), 'day'],
};

const OtherInformation = () => {
  const dispatch = useDispatch();
  let { merchantID } = useParams();
  const [defaultCurrentTab, setDefaultCurrentTab] = useState(0);
  const [currentTab, setCurrentTab] = useState(defaultCurrentTab);
  const [peopleCount, setPeopleCount] = useState(null);
  const { lineState, setLineState } = useLineChart();
  const [chartData, setChartData] = useState(null);
  const [searchParam, setSearchParam] = useImmer({
    merchantGroup: '',
    merchant: merchantID,
    peopleRange: '个人',
    timeRange: '今日',
    startDate: format(today, 'yyyyMMdd'),
    endDate: format(endOfDay(today), 'yyyyMMdd'),
    dayRange: [today, endOfDay(today)],
    dateFrequency: 'hour',
    gameType: '全部',
  });

  const { setKey: getChartDataKey } = API.GET_PLAYER_CHART_DATA({});
  const apiChartData = useSelector(
    state => state.axios.key?.[getChartDataKey.page]?.[getChartDataKey.function]
  );
  const { setKey: getChartDataKey2 } = API.GET_PLAYER_CHART_DATA2({});
  const apiChartData2 = useSelector(
    state =>
      state.axios.key?.[getChartDataKey2.page]?.[getChartDataKey2.function]
  );

  const { setKey: getPeopleCountKey } = API.GET_TOTAL_DOWN_LINE_COUNT({});
  const apiPeopleCountData = useSelector(
    state =>
      state.axios.key?.[getPeopleCountKey.page]?.[getPeopleCountKey.function]
  );
  const { setKey: getGameTypeKey } = API.GET_GAME_TYPE({});
  const apiGameTypeData = useSelector(
    state => state.axios.key?.[getGameTypeKey.page]?.[getGameTypeKey.function]
  );

  useEffect(() => {
    if (currentTab === 0) {
      setLineState([], labelLine);
      handleChange('个人', 'peopleRange');
      handleChange('今日', 'timeRange');
      handleChange('hour', 'dateFrequency');
    } else if (currentTab === 1) {
      handleChange('个人彩票', 'peopleRange');
      handleChange('今日', 'timeRange');
      handleChange('全部', 'gameType');
    } else {
      handleChange('', 'peopleRange');
    }
  }, [currentTab]);

  useEffect(() => {
    if (searchParam.peopleRange.indexOf('团队') >= 0) {
      dispatch(getTotalDownLineCountAction(searchParam));
    } else {
      setPeopleCount(null);
    }
  }, [dispatch, searchParam.peopleRange]);

  useEffect(() => {
    if (currentTab === 0) {
      // 平台表現
      dispatch(getPlayerChartDataAction(searchParam));
    } else if (currentTab === 1) {
      // 產品表現
      dispatch(getPlayerChartDataAction2(searchParam));
      dispatch(getGameTypeAction(searchParam));
    }
  }, [dispatch, searchParam]);

  useEffect(() => {
    if (currentTab === 0) {
      // 平台表現
      // if (apiChartData) setChartData(apiChartData);
      if (apiChartData) {
        // TODO 假資料才做判斷，與後端對接後需修改
        let lineData = apiChartData[0];
        if (searchParam.dateFrequency === 'day') lineData = apiChartData[1];
        setLineState(lineData, labelLine, searchParam.dateFrequency);
      }
    } else if (currentTab === 1) {
      // 產品表現
      if (apiChartData2) setChartData(apiChartData2);
    }
  }, [apiChartData, apiChartData2]);

  useEffect(() => {
    if (apiPeopleCountData) setPeopleCount(apiPeopleCountData?.count);
  }, [apiPeopleCountData]);

  // 設定搜尋條件並call api重新呼叫
  const handleChange = (value, name) => {
    if (name === 'dayRange') {
      setSearchParam(draftState => {
        draftState['dayRange'] = value;
        draftState['startDate'] = format(value[0], 'yyyyMMdd');
        draftState['endDate'] = format(value[1], 'yyyyMMdd');
        draftState['dateFrequency'] =
          differenceInDays(value[1], value[0]) > 0 ? 'day' : 'hour';
      });
    } else if (searchParam[name] !== value) {
      setSearchParam(draftState => {
        draftState[name] = value;
      });
    }

    if (name === 'timeRange') {
      const dateRange = range[value];
      setSearchParam(draftState => {
        draftState['dayRange'] = dateRange;
        draftState['startDate'] = format(dateRange[0], 'yyyyMMdd');
        draftState['endDate'] = format(dateRange[1], 'yyyyMMdd');
        draftState['dateFrequency'] = dateRange[2];
      });
    }
  };

  return (
    <div className={styles.body}>
      <Tabs
        tabList={tabList}
        stylesType={'style-2'}
        defaultSelectedIdx={currentTab}
        getTab={idx => {
          setCurrentTab(idx);
        }}
      />
      <div className={styles.tabContent} key={currentTab}>
        {(() => {
          switch (currentTab) {
            case 0:
              // 平台表現
              return (
                <>
                  <Header
                    select={select}
                    handleChange={handleChange}
                    peopleCount={peopleCount}
                    dayRange={searchParam.dayRange}
                  />
                  <div className={styles.chart}>
                    <LineChart
                      data={lineState.lineData}
                      params={lineState.lineParams}
                      tooltipX={lineState.tooltipX}
                    />
                  </div>
                </>
              );
            case 1:
              // 产品表现
              return (
                <>
                  <Header
                    select={select1}
                    handleChange={handleChange}
                    peopleCount={peopleCount}
                    dayRange={searchParam.dayRange}
                  />
                  <div className={styles.filter}>
                    <SelectDetailData
                      key={apiGameTypeData?.[0]?.text}
                      size="md2"
                      list={apiGameTypeData?.map(game => ({
                        text: game.text,
                        value: game.text,
                      }))}
                      defaultValue={apiGameTypeData?.[0]?.text}
                      defaultText={apiGameTypeData?.[0]?.text}
                      cusHandleChange={v => handleChange(v, 'gameType')}
                    />
                    <ButtonBase
                      list={[
                        {
                          value: <i className="las la-filter la-lg" />,
                          onClick: () => console.log('篩選'),
                        },
                      ]}
                      size={'sm'}
                      styleType={'style-2'}
                    />
                  </div>
                  <div className={styles.chart2}>
                    <BarChart data={chartData} keys={chartKeyData} />
                  </div>
                </>
              );
            case 2:
              // 代理关系
              return <div>123</div>;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

const Header = ({ handleChange, select, peopleCount = 0, dayRange }) => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <SelectDetailData
          size="md2"
          list={select}
          defaultValue={select?.[0]?.value}
          defaultText={select?.[0]?.text}
          cusHandleChange={v => handleChange(v, 'peopleRange')}
        />
        <span className={styles.line} />
        {peopleCount ? (
          <div className={styles.secondary}>
            <span className={styles.title}>全部下级</span>
            <span className={styles.count}>
              {peopleCount}
              <span className={styles.unit}>人</span>
            </span>
          </div>
        ) : null}
      </div>
      <div className={styles.right}>
        <DateRangePicker
          allowKeyboardControl={false}
          allowSameDateSelection
          inputFormat="yyyy/MM/dd"
          mask="____/__/__"
          label="Advanced keyboard"
          value={dayRange}
          onChange={v => {
            if (v[0] && v[1] && isValid(v[0]) && isValid(v[1]))
              handleChange([v[0], v[1]], 'dayRange');
          }}
          renderInput={renderDateRangeInput}
        />
        <ButtonBase
          list={[
            { value: '昨日', onClick: () => handleChange('昨日', 'timeRange') },
            { value: '今日', onClick: () => handleChange('今日', 'timeRange') },
            {
              value: '近七日',
              onClick: () => handleChange('近七日', 'timeRange'),
            },
            { value: '本月', onClick: () => handleChange('本月', 'timeRange') },
          ]}
          size={'md'}
          styleType={'style-4'}
          defaultIndex={1}
        />
      </div>
    </div>
  );
};

const renderDateRangeInput = (startProps, endProps) => {
  const { value: startDate } = startProps.inputProps;
  const { value: endDate } = endProps.inputProps;
  const onClick = () => startProps.ref.current.focus();
  return (
    <InputDetailData
      inputRef={startProps.ref}
      {...startProps.inputProps}
      title=""
      size="sm"
      placeholder="时间频率"
      value={startDate && endDate && `${startDate} ~ ${endDate}`}
      rightIcon={['las la-calendar-alt', onClick]}
      style={{ fontSize: 14 }}
    />
  );
};
export default OtherInformation;
