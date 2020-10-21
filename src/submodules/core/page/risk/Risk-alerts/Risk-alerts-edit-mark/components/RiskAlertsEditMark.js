import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from 'react';
import { useParams, useHistory, Prompt } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { RISK_ALERTS as API_RISK_ALERTS } from 'Constants/api/api';
import Pagination from 'Layout/Pagination2';
import usePagination from 'Hooks/usePagination';
import { useInterceptor, useDispatchEvent } from 'Hooks/useInterceptor';
import useAlertDialog from 'Hooks/useAlertDialog';
import usePrompt from 'Hooks/usePrompt';

import Table from 'Layout/Table2';
import ButtonRound from 'BaseComponent/ButtonRound';
import RadioBase from 'BaseComponent/RadioBase';
import SpanStatus from 'BaseComponent/SpanStatus';
import CheckboxBase from 'BaseComponent/CheckboxBase';
import ButtonBase from 'BaseComponent/ButtonBase';

import {
  getAlertNameListAction,
  getPlayerAlertsAction,
  savePlayerAlertDataAction,
  getPlayerAlertsDetailAction,
  getPlayerAlertsLogAction,
  savePlayerRestricDetailAction,
} from 'Redux/axios/action';
import styles from './RiskAlertsEditMark.module.scss';
import FooterButton from './FooterButton';
import useAxiosSelector2 from 'Hooks/useAxiosSelector2';

const ruleStatusList = ['全部', '待审核', '批准', '拒绝'];
const radioList = [
  {
    code: '1',
    name: '审核',
  },
  {
    code: '2',
    name: '待定',
  },
];
const RiskAlertsEditMark = ({ currentSubTab }) => {
  //hooks
  const { ...control } = usePagination();
  const { page, perPage } = control;
  const prompt = usePrompt();
  const alert = useAlertDialog();
  const history = useHistory();
  const dispatch = useDispatch();
  let { merchantID, playerID } = useParams();
  playerID = playerID ? playerID : history.location.state.playerID;
  const pathname = `/merchants/${merchantID}/risk-alerts/edit/mark/${playerID}`;

  const playerAlerts = useAxiosSelector2(API_RISK_ALERTS.GET_PLAYER_ALERTS) || {
    totalCount: 0,
    data: [],
  };
  const alertNameList =
    useAxiosSelector2(API_RISK_ALERTS.GET_ALERT_NAME_LIST) || [];

  //UI State-警報註記
  const [currentRuleStatus, setCurrentRuleStatus] = useState('全部');
  const [statusRadio, setStatusRadio] = useState(1);
  const [checkboxAll, setCheckboxAll] = useImmer(false);
  const [checkboxAlert, setCheckboxAlert] = useImmer([]);
  const [ruleType, setRuleType] = useState('即時');

  useInterceptor(async (action, prev, next) => {
    if (!shouldRefresh()) {
      switch (action) {
        case 'SET_PAGE':
          await alert('是否放弃当前修改？');
          break;
        case 'SET_PAGE':
        case 'SET_PER_PAGE':
          await alert('是否放弃当前修改？');
          break;
        case 'PUSH': //換頁
        case 'SET_RULETYPE':
        case `SET_BUTTON_${ruleStatusList[0]}`:
        case `SET_BUTTON_${ruleStatusList[1]}`:
        case `SET_BUTTON_${ruleStatusList[2]}`:
        case `SET_BUTTON_${ruleStatusList[3]}`:
          await alert('是否放弃当前修改？');
          break;
        default:
          break;
      }
      if (action.includes('SET_TAB_')) {
        for (let el of alertNameList) {
          if (action === `SET_TAB_${el}`) {
            await alert('是否放弃当前修改？');
          }
        }
        if (action === `SET_TAB_玩家限制`) await alert('是否放弃当前修改？');
        if (action === `SET_TAB_基本信息`) await alert('是否放弃当前修改？');
      }
    }
  });

  const shouldRefresh = () => {
    for (let i of checkboxAlert) {
      if (i === true) return false;
    }
    return true;
  };

  useEffect(() => {
    if (history.location.pathname !== pathname) {
      history.push({ pathname }, { playerID });
    }
  }, []);
  // 警報註記 checkbox
  useEffect(() => {
    if (checkboxAlert.length > 0)
      setCheckboxAlert(draftState => {
        draftState.forEach((el, idx) => {
          const dataStatus = playerAlerts.data[idx].status;
          //若無disable則與全選相同
          if (!checkboxDisabled(dataStatus, statusRadio))
            draftState[idx] = checkboxAll;
        });
      });
  }, [checkboxAll]);

  useEffect(() => {
    if (playerAlerts.data.length > 0) {
      setCheckboxAlert(() => new Array(playerAlerts.data.length).fill(false));
      setCheckboxAll(() => false);
    }
  }, [playerAlerts]);

  useEffect(() => {
    //警報註記 最開始由API9-1 取得TabList

    console.log('最開始由API9-1 取得TabList');
    dispatch(
      getAlertNameListAction({
        merchantGroup: '',
        merchant: merchantID,
        playerID: playerID,
        ruleType: ruleType,
      })
    );
  }, [ruleType]);
  useEffect(() => {
    if (alertNameList.length > 0) {
      const param = {
        merchantGroup: '',
        merchant: merchantID,
        playerID: playerID,
        ruleType: ruleType,
        ruleName: alertNameList[currentSubTab],
        ruleStatus: currentRuleStatus,
        currentPage: page,
        quantityPerPage: perPage,
      };
      dispatch(getPlayerAlertsAction(param));
    }
  }, [perPage, page, currentSubTab, currentRuleStatus, alertNameList]);

  return (
    <>
      <Prompt when={!shouldRefresh()} {...prompt} />
      <Filter
        statusRadio={statusRadio}
        setStatusRadio={setStatusRadio}
        setCurrentRuleStatus={setCurrentRuleStatus}
        ruleType={ruleType}
        setRuleType={setRuleType}
      />
      <div className={styles.table}>
        <Table
          stickyHeader
          // multiSelect
          columns={tableColumns({
            ruleType,
            statusRadio,
            checkboxAlert,
            checkboxAll,
            setCheckboxAlert,
            setCheckboxAll,
          })}
          data={playerAlerts.data}
          // onSelectedChange={handleSelectedChange}
          onRowClick={row => {
            console.log(row);
          }}
        />
      </div>
      <div className={styles.footer_page}>
        <Pagination totalCount={playerAlerts.totalCount} {...control} />
      </div>
      <FooterButton
        onSave={() => {
          const param = {
            merchantGroup: '',
            merchant: merchantID,
            playerID: playerID,
            ruleType: ruleType,
            ruleName: alertNameList[currentSubTab],
            ruleStatus: currentRuleStatus,
          };
          const dispatchType = savePlayerAlertDataAction;
          alert('确认保存警报条件？', '保存后将于下期结算生效。').then(() => {
            dispatch(dispatchType(param));
          });
        }}
        onBack={() => {
          history.push({
            pathname: `/merchants/${merchantID}/risk-alerts/immediate`,
          });
        }}
      />
    </>
  );
};
export default RiskAlertsEditMark;

//function-警報註記
const Filter = ({
  statusRadio,
  setStatusRadio,
  setCurrentRuleStatus,
  ruleType,
  setRuleType,
}) => {
  const dispatchEvent = useDispatchEvent();
  return (
    <>
      <div className={styles.filterWrap}>
        <div className={styles.filter}>
          <div>
            <ButtonBase
              list={ruleStatusList.map(el => ({
                value: el,
              }))}
              size={'md'}
              styleType={'style-4'}
              defaultIndex={0}
              getCurrentBtn={(index, value) => {
                setCurrentRuleStatus(value);
              }}
            />
          </div>
          <div>
            <RadioBase
              title="批量改为"
              list={radioList}
              defaultValue={statusRadio}
              cusHandleChange={e => setStatusRadio(parseInt(e))}
              flex_direction="row"
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonRound}>
        <ButtonRound
          buttonText={ruleType === '即時' ? '每日' : '即時'}
          buttonIcon={<i className="las la-clock" />}
          styleType="style-2"
          cusClick={() => {
            dispatchEvent(() => {
              setRuleType(ruleType === '即時' ? '每日' : '即時');
            }, 'SET_RULETYPE');
          }}
        />
      </div>
    </>
  );
};

const tableColumns = ({
  ruleType,
  statusRadio,
  checkboxAlert,
  checkboxAll,
  setCheckboxAll,
  setCheckboxAlert,
}) => {
  return [
    {
      Header: (
        <CheckboxBase
          onClick={e => {
            setCheckboxAll(() => e.target.checked);
          }}
          checked={checkboxAll}
        />
      ),
      accessor: 'checkbox',
      width: 20,
      sticky: 'right',
      Cell: ({ row }) => (
        //需要輸入disabled 因此custom
        <CheckboxBase
          disabled={checkboxDisabled(row.original.status, statusRadio)}
          checked={
            checkboxDisabled(row.original.status, statusRadio)
              ? false
              : checkboxAlert[row.index]
          }
          onClick={e => {
            setCheckboxAlert(draftState => {
              draftState[row.index] = e.target.checked;
            });
          }}
        />
      ),
    },
    {
      Header: '触发时间',
      accessor: 'triggerTime',
      width: 196,
      sticky: 'center',
    },
    {
      Header: '更新时间',
      accessor: 'updateTime',
      width: 196,
      sticky: 'left',
    },
    {
      Header: '目前状态',
      width: 185,
      sticky: 'left',
      Cell: ({ row: { original } }) => (
        <SpanStatus
          value={original.status}
          styleType={spanStyle(original.status)}
        />
      ),
    },
    {
      Header: ruleType + '警报触发条件',
      accessor: 'alert',
      width: 338,
      sticky: 'left',
    },
  ];
};

const spanStyle = status => {
  switch (status) {
    case '审核':
      return 'style-1';
    case '待定':
      return 'style-2';
    case '触发':
      return 'style-3';
    default:
      return null;
  }
};

const checkboxDisabled = (status, statusRadio) => {
  if (statusRadio === 1 && status === radioList[0].name) return true;
  else if (statusRadio === 2 && status === radioList[1].name) return true;
  else return false;
};
