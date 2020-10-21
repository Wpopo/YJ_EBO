import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import Helper from 'Helper';
import { format } from 'date-fns';
import styles from './PlayerRecord.module.scss';
import _ from 'lodash';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getDepositList,
  getTotalDepositAction,
  getWithdrawalsList,
  getTotalWithdrawalsAction,
  getCapitalFlowListAction,
  getTotalBettingRecordAction,
  getInBoxList,
  getSendMailList,
  getAnnouncementList,
  getLogListInfo,
} from 'Redux/axios/action';
import {
  DEPOSIT_LIST as DEPOSIT_API,
  WITHDRAWALS_LIST as WITHDRAWALS_API,
  PLAYER_LISTS as PLAYER_API,
  COMMUNICATION as COMMUNICATION_API,
} from 'Constants/api/api';

// Hooks
import usePopupFilter from 'Hooks/usePopupFilter';
import useAxiosSelectorHook from 'Hooks/useAxiosSelector';

//material-UI
import SelectDetailData from 'BaseComponent/SelectDetailData';
import SpanStatus from 'BaseComponent/SpanStatus';
import Tabs from 'Layout/Tabs';
import Table from 'Layout/Table2';
import Pagination from 'Layout/Pagination';
import DatePicker from 'BaseComponent/DatePicker2';
import ButtonBase from 'BaseComponent/ButtonBase';
import ButtonOperation from 'BaseComponent/ButtonOperation';
import PopupFilter from 'Layout/PopupFilter';
import InputSearch from 'BaseComponent/InputSearch';

const tabList = {
  0: {
    title: '最新入款',
    children: null,
  },
  1: { title: '最新出款', children: null },
  2: { title: '资金流水', children: null },
  3: { title: '投注记录', children: null },
  4: { title: '通讯记录', children: null },
  5: { title: '操作记录', children: null },
};

const statusOption = [
  { value: '1', label: '成功' },
  { value: '2', label: '失败' },
];

const operationPageOptions = [
  { value: '登录', label: '登录' },
  { value: '入款', label: '入款' },
  { value: '出款', label: '出款' },
  { value: '订单', label: '订单' },
  { value: '玩家详情', label: '玩家详情' },
  { value: '编辑玩家', label: '编辑玩家' },
];

const actionOptions = [
  { value: '登录', label: '登录' },
  { value: '充值', label: '充值' },
  { value: '代客提款', label: '代客提款' },
  { value: '代客充值', label: '代客充值' },
  { value: '升为代理', label: '升为代理' },
  { value: '禁止登录', label: '禁止登录' },
];

const { setKey: getDepositListSetKey } = DEPOSIT_API.GET_LIST({});
const { setKey: getWithdrawalsListSetKey } = WITHDRAWALS_API.GET_LIST({});
const { setKey: getCapitalFlowSetKey } = PLAYER_API.GET_CAPITAL_FLOW_LIST({});
const { setKey: getTotalDepositKey } = PLAYER_API.GET_TOTAL_DEPOSIT({});
const {
  setKey: getTotalBettingRecordKey,
} = PLAYER_API.GET_TOTAL_BETTING_RECORD({});
const { setKey: getTotalWithdrawalsKey } = PLAYER_API.GET_TOTAL_WITHDRAWALS({});
const { setKey: getInboxListKey } = COMMUNICATION_API.GET_INBOX_LIST({});
const { setKey: getSendMailListKey } = COMMUNICATION_API.GET_SEND_MAIL_LIST({});
const {
  setKey: getAnnouncementListKey,
} = COMMUNICATION_API.GET_ANNOUNCEMENT_LIST({});

const PlayerRecord = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { merchantID, playerID } = useParams();
  const linkRoot = `/merchants/${merchantID}/`;

  const [defaultCurrentTab, setDefaultCurrentTab] = useState(0);
  const [currentTab, setCurrentTab] = useState(defaultCurrentTab);
  const [subType, setSubType] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [config, setConfig] = useImmer({
    param: {
      // 存款單狀態
      status: '全部',
      // 選取的集團代號
      merchantGroup: '',
      // 選取的商家代號
      merchant: merchantID,
      // 輸入的 player 帳號
      playerUserName: playerID,
      // 目前頁數>
      currentPage: '1',
      // 選取的每頁數量
      quantityPerPage: '10',
      // 提交時間排序方式 up/down>
      sortBySubmitDate: 'down',
    },
    tableColumns: [
      {
        Header: '入款单号',
        accessor: 'id',
        width: 200,
      },
      {
        Header: '入款金额',
        align: 'right',
        width: 250,
        Cell: ({ row: { original } }) => Helper.number.format(original.amount),
      },
      {
        Header: '申请时间',
        accessor: 'time',
        width: 250,
      },
      {
        Header: '状态',
        width: 100,
        Cell: ({ row: { original } }) => <SpanStatus value={original.status} />,
      },
    ],
    tableData: [],
    totalAmount: {},
    moreLink: '',
  });

  const { state, register, handleSubmit, reset } = usePopupFilter({
    defaultValue: {
      status: statusOption,
      operationPage: [],
      action: [],
      time: [
        new Date(new Date().setDate(new Date().getDate() - 1)),
        new Date(),
      ],
    },
  });

  //Redux Data
  const useAxiosSelector = useCallback(
    setKey => state => state.axios.key?.[setKey.page]?.[setKey.function],
    []
  );

  const apiDepositTableData = useSelector(
    useAxiosSelector(getDepositListSetKey)
  );

  const apiWithdrawalsTableData = useSelector(
    useAxiosSelector(getWithdrawalsListSetKey)
  );

  const apiCapitalFlowTableData = useSelector(
    useAxiosSelector(getCapitalFlowSetKey)
  );

  const apiTotalDepositData = useSelector(useAxiosSelector(getTotalDepositKey));

  const apiTotalWithdrawalsData = useSelector(
    useAxiosSelector(getTotalWithdrawalsKey)
  );

  const apiTotalBettingRecordData = useSelector(
    useAxiosSelector(getTotalBettingRecordKey)
  );

  const apiInboxList = useSelector(useAxiosSelector(getInboxListKey));
  const apiSendMailList = useSelector(useAxiosSelector(getSendMailListKey));
  const apiAnnouncementList = useSelector(
    useAxiosSelector(getAnnouncementListKey)
  );
  const merchantSelector = useAxiosSelectorHook('商家设置');
  const apiLogList = merchantSelector('getLogListInfo');

  useEffect(() => {
    handleChange([], 'tableData');
    handleChange({ amount: 0, count: 0, net: 0, number: 0 }, 'totalAmount');
    handleChange('', 'moreLink');
    // 預防第一次 載入時 因重複設定config.param 而重複呼叫API
    if (currentTab === defaultCurrentTab) {
      setDefaultCurrentTab(null);
      return;
    }
    if (currentTab === 0) {
      // 最新入款
      handleChange(
        {
          // 存款單狀態
          status: '全部',
          // 選取的集團代號
          merchantGroup: '',
          // 選取的商家代號
          merchant: merchantID,
          // 輸入的 player 帳號
          playerUserName: playerID,
          // 目前頁數>
          currentPage: '1',
          // 選取的每頁數量
          quantityPerPage: '10',
          // 提交時間排序方式 up/down>
          sortBySubmitDate: 'down',
        },
        'param'
      );
      handleChange(
        [
          {
            Header: '入款单号',
            accessor: 'id',
            width: 200,
          },
          {
            Header: '入款金额',
            align: 'right',
            width: 250,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.amount),
          },
          {
            Header: '申请时间',
            accessor: 'time',
            width: 250,
          },
          {
            Header: '状态',
            width: 100,
            Cell: ({ row: { original } }) => (
              <SpanStatus value={original.status} />
            ),
          },
        ],
        'tableColumns'
      );
    } else if (currentTab === 1) {
      // 最新出款
      handleChange(
        {
          // 存款單狀態
          status: '全部',
          // 選取的集團代號
          merchantGroup: '',
          // 選取的商家代號
          merchant: merchantID,
          // 輸入的 player 帳號
          playerUserName: playerID,
          // 目前頁數>
          currentPage: '1',
          // 選取的每頁數量
          quantityPerPage: '10',
          // 提交時間排序方式 up/down>
          sortBySubmitDate: 'down',
        },
        'param'
      );
      handleChange(
        [
          {
            Header: '出款单号',
            accessor: 'id',
            width: 200,
          },
          {
            Header: '入款金额',
            align: 'right',
            width: 250,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.amount),
          },
          {
            Header: '申请时间',
            accessor: 'time',
            width: 250,
          },
          {
            Header: '状态',
            width: 100,
            Cell: ({ row: { original } }) => (
              <SpanStatus value={original.status} />
            ),
          },
        ],
        'tableColumns'
      );
    } else if (currentTab === 2) {
      // 资金流水
      handleChange(
        {
          // 存款單狀態
          status: '全部',
          // 選取的集團代號
          merchantGroup: '',
          // 選取的商家代號
          merchant: merchantID,
          // 輸入的 player 帳號
          playerUserName: playerID,
          // 日期選擇
          datePicker: '',
          // 目前頁數>
          currentPage: '1',
          // 選取的每頁數量
          quantityPerPage: '10',
        },
        'param'
      );
      handleChange(
        [
          {
            Header: '时间',
            accessor: 'time',
            width: 100,
          },
          {
            Header: '交易编号',
            accessor: 'id',
            width: 150,
          },
          {
            Header: '摘要',
            accessor: 'noted',
            width: 230,
          },
          {
            Header: '资产变动',
            width: 150,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.assetsChange),
          },
          {
            Header: '锁定变动',
            width: 150,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.lockedChange),
          },
          {
            Header: '总资产',
            width: 150,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.assets),
          },
          {
            Header: '锁定金额',
            width: 150,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.lockedAmount),
          },
          {
            Header: '可提金额',
            width: 150,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.enableAmount),
          },
        ],
        'tableColumns'
      );
    } else if (currentTab === 3) {
      // 投注记录
      handleChange(
        {
          // 存款單狀態
          status: '全部',
          // 選取的集團代號
          merchantGroup: '',
          // 選取的商家代號
          merchant: merchantID,
          // 輸入的 player 帳號
          playerUserName: playerID,
          // 目前頁數>
          currentPage: '1',
          // 選取的每頁數量
          quantityPerPage: '10',
          // 提交時間排序方式 up/down>
          sortBySubmitDate: 'down',
        },
        'param'
      );
      handleChange(
        [
          {
            Header: '订单编号',
            accessor: 'id',
            width: 150,
          },
          {
            Header: '期号',
            accessor: 'number',
            width: 120,
          },
          {
            Header: '投注时间',
            accessor: 'time',
            width: 150,
          },
          {
            Header: '游戏名称',
            accessor: 'gameName',
            width: 120,
          },
          {
            Header: '投注金额',
            width: 150,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.amount),
          },
          {
            Header: '派彩金额',
            width: 150,
            Cell: ({ row: { original } }) =>
              Helper.number.format(original.lotteryAmount),
          },
          {
            Header: '状态',
            width: 100,
            Cell: ({ row: { original } }) => (
              <SpanStatus value={original.status} />
            ),
          },
        ],
        'tableColumns'
      );
    } else if (currentTab === 4) {
      // 通讯记录
      handleChange(
        {
          // 存款單狀態
          status: '全部',
          // 選取的集團代號
          merchantGroup: '',
          // 選取的商家代號
          merchant: merchantID,
          // 輸入的 player 帳號
          playerID,
          // 目前頁數>
          currentPage: '1',
          // 選取的每頁數量
          quantityPerPage: '30',
          // 提交時間排序方式 up/down>
          sortBySubmitDate: 'down',
        },
        'param'
      );
      if (subType === 0 || subType === 1) {
        // 收件箱
        // 已发送
        handleChange(
          [
            {
              Header: '发件人',
              accessor: 'name',
              width: 150,
            },
            {
              Header: '标题',
              accessor: 'title',
              width: 400,
            },
            {
              Header: subType === 0 ? '收件时间' : '发送时间',
              accessor: 'time',
              width: 200,
            },
            {
              Header: '操作',
              width: 80,
              Cell: () => (
                <ButtonOperation
                  stylesType="info"
                  text="详情"
                  handleClick={() => console.log('详情')}
                />
              ),
            },
          ],
          'tableColumns'
        );
      } else if (subType === 2) {
        // 公告列表
        handleChange(
          [
            {
              Header: '公告标题',
              accessor: 'title',
              width: 160,
            },
            {
              Header: '公告类型',
              accessor: 'type',
              width: 120,
            },
            {
              Header: '对象群组',
              width: 420,
              Cell: ({ row: { original } }) => {
                const tempArray = original.targetGroup.split('、');
                const result = tempArray.reduce((acc, elem, idx, arr) => {
                  if ((acc + elem).length <= 24) {
                    return `${acc}、${elem}`;
                  } else {
                    return acc;
                  }
                }, '');
                const resultArray = result.split('、');
                resultArray.shift();
                const diff = tempArray.length - resultArray.length;
                let text = resultArray.join('、');
                text += diff > 0 ? ` … （${diff}）` : '';
                return text;
              },
            },
            {
              Header: '最后更新时间',
              accessor: 'time',
              width: 200,
            },
            {
              Header: '状态',
              width: 80,
              Cell: ({ row: { original } }) => (
                <SpanStatus value={original.status} />
              ),
            },
          ],
          'tableColumns'
        );
      }
    } else if (currentTab === 5) {
      // 操作记录
      handleChange(
        {
          // 結果
          status: statusOption.map(i => i.label),
          // 操作頁面
          operationPage: operationPageOptions.map(i => i.label),
          // 動作
          action: actionOptions.map(i => i.label),
          // 操作開始時間
          startTime: '',
          // 操作結束時間
          endTime: '',
          // 操作者
          operator: '全部',
          // 選取的集團代號
          merchantGroup: '',
          // 選取的商家代號
          merchant: merchantID,
          // 輸入的 player 帳號
          playerID,
          // 目前頁數>
          currentPage: '1',
          // 選取的每頁數量
          quantityPerPage: '30',
          // 提交時間排序方式 up/down>
          sortBySubmitDate: 'down',
        },
        'param'
      );
      handleChange(
        [
          {
            Header: '操作时间',
            accessor: 'time',
            width: 200,
          },
          {
            Header: '操作者 / 帐号',
            width: 150,
            Cell: ({ row: { original } }) =>
              `${original.operator} / ${original.account}`,
          },
          {
            Header: '操作页面',
            accessor: 'operationPage',
            width: 120,
          },
          {
            Header: '动作',
            accessor: 'action',
            width: 150,
          },
          {
            Header: '日志内容',
            accessor: 'content',
            width: 250,
          },
          {
            Header: 'IP',
            accessor: 'ip',
            width: 120,
          },
          {
            Header: '结果',
            width: 80,
            Cell: ({ row: { original } }) => (
              <SpanStatus value={original.status} />
            ),
          },
        ],
        'tableColumns'
      );
    }
  }, [currentTab, subType, merchantID, playerID]);

  useEffect(() => {
    if (currentTab === 0) {
      // 最新入款
      dispatch(getDepositList(config.param));
      dispatch(getTotalDepositAction(config.param));
      handleChange(`${linkRoot}deposit-lists`, 'moreLink');
    } else if (currentTab === 1) {
      // 最新出款
      dispatch(getWithdrawalsList(config.param));
      dispatch(getTotalWithdrawalsAction(config.param));
      handleChange(`${linkRoot}withdrawals-lists`, 'moreLink');
    } else if (currentTab === 2) {
      // 资金流水
      dispatch(getCapitalFlowListAction(config.param));
    } else if (currentTab === 3) {
      // 投注记录
      dispatch(getTotalBettingRecordAction(config.param));
    } else if (currentTab === 4) {
      // 通讯记录
      if (subType === 0) {
        // 收件箱
        dispatch(getInBoxList(config.param));
      } else if (subType === 1) {
        // 已发送
        dispatch(getSendMailList(config.param));
      } else if (subType === 2) {
        // 公告列表
        dispatch(getAnnouncementList(config.param));
      }
    } else if (currentTab === 5) {
      // 操作记录
      dispatch(getLogListInfo(config.param));
    }
  }, [dispatch, config.param]);

  useEffect(() => {
    if (currentTab === 0) {
      // 最新入款
      if (apiDepositTableData) handleChange(apiDepositTableData, 'tableData');
      if (apiTotalDepositData) handleChange(apiTotalDepositData, 'totalAmount');
    } else if (currentTab === 1) {
      // 最新出款
      if (apiWithdrawalsTableData)
        handleChange(apiWithdrawalsTableData, 'tableData');
      if (apiTotalWithdrawalsData)
        handleChange(apiTotalWithdrawalsData, 'totalAmount');
    } else if (currentTab === 2) {
      // 资金流水
      if (apiCapitalFlowTableData)
        handleChange(apiCapitalFlowTableData, 'tableData');
    } else if (currentTab === 3) {
      // 投注记录
      if (apiTotalBettingRecordData)
        handleChange(apiTotalBettingRecordData, 'totalAmount');
    } else if (currentTab === 4) {
      // 通讯记录
      if (subType === 0) {
        // 收件箱
        if (apiInboxList) handleChange(apiInboxList, 'tableData');
      } else if (subType === 1) {
        // 已发送
        if (apiSendMailList) handleChange(apiSendMailList, 'tableData');
      } else if (subType === 2) {
        // 公告列表
        if (apiAnnouncementList) handleChange(apiAnnouncementList, 'tableData');
      }
    } else if (currentTab === 5) {
      // 操作记录
      if (apiLogList) handleChange(apiLogList, 'tableData');
    }
  }, [
    apiDepositTableData,
    apiTotalDepositData,
    apiWithdrawalsTableData,
    apiTotalWithdrawalsData,
    apiCapitalFlowTableData,
    apiTotalBettingRecordData,
    apiInboxList,
    apiSendMailList,
    apiAnnouncementList,
    apiLogList,
  ]);

  // 設定搜尋條件並call api重新呼叫
  const handleChange = (value, name) => {
    if (config[name] !== value)
      setConfig(draftState => {
        draftState[name] = value;
      });
  };

  const handleChangeParam = (value, name) => {
    if (config.param[name] !== value)
      setConfig(draftState => {
        draftState.param[name] = value;
      });
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
            case 1:
            case 3:
              // 最新入款
              // 最新出款
              // 投注记录
              return (
                <>
                  <Header
                    type={currentTab}
                    handleChange={handleChange}
                    totalAmount={config.totalAmount}
                  />
                  <div className={styles.content}>
                    <Table
                      columns={config.tableColumns}
                      data={config.tableData ? config.tableData : []}
                    />
                    <div
                      className={styles.more}
                      onClick={() =>
                        history.push({
                          pathname: config.moreLink,
                          state: config.param,
                        })
                      }
                    >
                      更多
                      <i className="las la-angle-right"></i>
                    </div>
                  </div>
                </>
              );
            case 2:
              // 资金流水
              return (
                <>
                  <div className={styles.filter}>
                    <DatePicker
                      handleChange={date =>
                        handleChangeParam(
                          date ? format(date, 'yyyy-MM-dd') : '',
                          'datePicker'
                        )
                      }
                      defaultDate={null}
                    />
                  </div>
                  <div className={styles.content}>
                    <Table
                      columns={config.tableColumns}
                      data={config.tableData ? config.tableData : []}
                    />
                    <div className={styles.footer}>
                      <Pagination totalCount={100} />
                    </div>
                  </div>
                </>
              );
            case 4:
              // 通讯记录
              return (
                <>
                  <div className={`${styles.filter} ${styles.space_between}`}>
                    <div className={styles.title}>
                      {(() => {
                        switch (subType) {
                          case 0:
                            return '收件箱';
                          case 1:
                            return '已发送';
                          case 2:
                            return '公告列表';
                        }
                      })()}
                    </div>
                    <ButtonBase
                      list={[
                        {
                          value: <i className="las la-inbox la-lg" />,
                          onClick: () => setSubType(0),
                        },
                        {
                          value: <i className="las la-paper-plane la-lg" />,
                          onClick: () => setSubType(1),
                        },
                        {
                          value: <i className="las la-bullhorn la-lg" />,
                          onClick: () => setSubType(2),
                        },
                      ]}
                      size={'sm'}
                      styleType={'style-9'}
                      defaultIndex={subType}
                    />
                  </div>
                  <div className={`${styles.content} ${styles.height2}`}>
                    <Table
                      columns={config.tableColumns}
                      data={config.tableData ? config.tableData : []}
                    />
                    <div
                      className={styles.more}
                      onClick={
                        () => console.log('更多')
                        // history.push({
                        //   pathname: config.moreLink,
                        //   state: config.param,
                        // })
                      }
                    >
                      更多
                      <i className="las la-angle-right"></i>
                    </div>
                  </div>
                </>
              );
            case 5:
              // 操作记录
              return (
                <>
                  <div className={`${styles.filter} ${styles.space_between}`}>
                    <div className={styles.left}>
                      <SelectDetailData
                        list={[
                          { text: '全部', value: '全部' },
                          { text: '后台', value: '后台' },
                          { text: '玩家', value: '玩家' },
                        ]}
                        defaultValue={'全部'}
                        defaultText={'全部'}
                        cusHandleChange={v => handleChangeParam(v, 'operator')}
                      />
                      <InputSearch
                        name="playerRecord"
                        defaultPlaceholder="玩家帐号"
                        searchLength={3}
                        onClick={value => handleChangeParam(value, 'playerID')}
                      />
                    </div>
                    <ButtonBase
                      list={[
                        {
                          value: <i className="las la-filter la-lg" />,
                          onClick: e => {
                            setFilterOpen(prev => !prev);
                            setAnchorEl(e.currentTarget);
                          },
                        },
                      ]}
                      size={'sm'}
                      styleType={'style-2'}
                      defaultIndex={0}
                    />
                    <PopupFilter
                      open={filterOpen}
                      anchorEl={anchorEl}
                      onClose={() => {
                        setFilterOpen(false);
                      }}
                    >
                      <PopupFilter.Header onClick={reset} />
                      <PopupFilter.DateRange
                        label={'操作时间'}
                        {...register('time')}
                      />
                      <PopupFilter.Select
                        isMulti
                        label={'操作页面'}
                        options={operationPageOptions}
                        {...register('operationPage')}
                      />
                      <PopupFilter.Select
                        isMulti
                        label={'动作'}
                        options={actionOptions}
                        {...register('action')}
                      />
                      <PopupFilter.Checkboxes
                        label={'结果'}
                        options={statusOption}
                        {...register('status')}
                      />
                      <PopupFilter.Footer
                        onClick={handleSubmit(data => {
                          handleChangeParam(
                            data.status?.map(i => i.label),
                            'status'
                          );
                          handleChangeParam(
                            data.operationPage?.map(i => i.label),
                            'operationPage'
                          );
                          handleChangeParam(
                            data.action?.map(i => i.label),
                            'action'
                          );
                          handleChangeParam(
                            format(data.time[0], 'yyyyMMdd'),
                            'startTime'
                          );
                          handleChangeParam(
                            format(data.time[1], 'yyyyMMdd'),
                            'endTime'
                          );
                          setFilterOpen(prev => !prev);
                        })}
                      />
                    </PopupFilter>
                  </div>
                  <div className={`${styles.content} ${styles.height2}`}>
                    <Table
                      columns={config.tableColumns}
                      data={config.tableData ? config.tableData : []}
                    />
                    <div
                      className={styles.more}
                      onClick={
                        () => console.log('更多')
                        // history.push({
                        //   pathname: config.moreLink,
                        //   state: config.param,
                        // })
                      }
                    >
                      更多
                      <i className="las la-angle-right"></i>
                    </div>
                  </div>
                </>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

const Header = ({ type = 0, totalAmount }) => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        {(() => {
          switch (type) {
            case 0:
            case 1:
              // 最新出款
              // 最新入款
              return (
                <>
                  <div className={styles.mainTitle}>
                    {type === 0 ? '今日总入款' : '今日总出款'}
                  </div>
                  <span className={styles.line} />
                  {totalAmount ? (
                    <>
                      <div className={styles.secondary}>
                        <span className={styles.title}>金額</span>
                        <span
                          className={styles.count}
                          key={totalAmount?.amount}
                        >
                          {Helper.number.format(totalAmount?.amount, 0)}
                          <span className={styles.unit}>.000</span>
                        </span>
                      </div>
                      <span className={styles.line} />
                      <div className={styles.secondary}>
                        <span className={styles.title}>次数</span>
                        <span className={styles.count} key={totalAmount?.count}>
                          {totalAmount?.count}
                        </span>
                      </div>
                    </>
                  ) : null}
                </>
              );
            case 3:
              // 投注记录
              return (
                <>
                  <SelectDetailData
                    size="md2"
                    list={[{ text: '彩票', value: '彩票' }]}
                    defaultValue={'彩票'}
                    defaultText={'彩票'}
                  />
                  <span className={styles.line} />
                  {totalAmount ? (
                    <>
                      <div className={styles.secondary}>
                        <span className={styles.title}>今日总投注额</span>
                        <span
                          className={styles.count}
                          key={totalAmount?.amount}
                        >
                          {Helper.number.format(totalAmount?.amount, 0)}
                          <span className={styles.unit}>.000</span>
                        </span>
                      </div>
                      <span className={styles.line} />
                      <div className={styles.secondary}>
                        <span className={styles.title}>今日总盈亏</span>
                        <span className={styles.count} key={totalAmount?.net}>
                          {Helper.number.format(totalAmount?.net, 0)}
                          <span className={styles.unit}>.000</span>
                        </span>
                      </div>
                      <span className={styles.line} />
                      <div className={styles.secondary}>
                        <span className={styles.title}>今日打码量</span>
                        <span
                          className={styles.count}
                          key={totalAmount?.number}
                        >
                          {Helper.number.format(totalAmount?.number, 0)}
                          <span className={styles.unit}>.000</span>
                        </span>
                      </div>
                    </>
                  ) : null}
                </>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};
export default PlayerRecord;
