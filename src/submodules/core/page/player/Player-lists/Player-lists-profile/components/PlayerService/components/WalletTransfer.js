import React, { useEffect, useContext, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import Helper from 'Helper';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWalletListAction,
  getWalletValueAction,
  getTotalAssetsAmountAction,
  editWalletTransferAction,
} from 'Redux/axios/action';
import { PLAYER_LISTS as API } from 'Constants/api/api';
import InputDetailData from 'BaseComponent/InputDetailData';
import styles from './WalletTransfer.module.scss';
import wallet2SVG from '../../wallet2SVG';
import { StateContext } from '../';

const { setKey: getWalletListSetKey } = API.GET_WALLET_LIST({});
const { setKey: getWalletValueSetKey } = API.GET_WALLET_VALUE({});
const { setKey: getTotalAssetsAmountKey } = API.GET_TOTAL_ASSETS_AMOUNT({});

const WalletTransfer = () => {
  const { updateState } = useContext(StateContext);
  const dispatch = useDispatch();
  let { merchantID, playerID } = useParams();
  const [config, setConfig] = useImmer({
    type: 'out',
    activeId: 0,
    data: [],
    wallet: { money: 0 },
    changeMoney: '',
    noted: '',
  });

  //Redux Data
  const useAxiosSelector = useCallback(
    setKey => state => state.axios.key?.[setKey.page]?.[setKey.function],
    []
  );

  const apiSubWalletsAmountData = useSelector(
    useAxiosSelector(getWalletValueSetKey)
  );

  const apiSubWalletsListData = useSelector(
    useAxiosSelector(getWalletListSetKey)
  );

  const apiTotalAssetsAmountData = useSelector(
    useAxiosSelector(getTotalAssetsAmountKey)
  );

  useEffect(() => {
    dispatch(
      getWalletListAction(
        getWalletListAction({
          merchantGroup: '',
          merchant: merchantID,
          playerID,
        })
      )
    );

    getTotalAssetsAmount();
    updateState(state => {
      state.buttonControl.save = handleSave;
    });
  }, []);
  useEffect(() => {
    const isChange = config.changeMoney > 0;

    updateState(state => {
      state.isDirty = isChange || config.noted.length > 0;
      state.buttonControl.isChange = isChange;
      state.buttonControl.save = handleSave;
    });
  }, [config]);

  useEffect(() => {
    const processData = () => {
      setConfig(draftState => {
        draftState.data = apiSubWalletsListData;
        draftState.activeId = apiSubWalletsListData[0].id;
      });
      getSubWalletAmount(apiSubWalletsListData[0].id);
    };
    if (apiSubWalletsListData && apiSubWalletsListData.length > 0)
      processData();
  }, [setConfig, apiSubWalletsListData]);

  useEffect(() => {
    const processData = () => {
      const idx = _.findIndex(config.data, {
        id: apiSubWalletsAmountData.id,
      });

      if (idx >= 0) {
        setConfig(draftState => {
          draftState['data'][idx]['money'] = apiSubWalletsAmountData.value;
        });
      }
    };
    if (apiSubWalletsAmountData) processData();
  }, [apiSubWalletsAmountData, setConfig]);

  useEffect(() => {
    const processData = () => {
      setConfig(draftState => {
        draftState.wallet.money = apiTotalAssetsAmountData[0];
      });
    };
    if (apiTotalAssetsAmountData) processData();
  }, [setConfig, apiTotalAssetsAmountData]);

  const getSubWalletAmount = idx => {
    dispatch(
      getWalletValueAction({
        merchantGroup: '',
        merchant: merchantID,
        playerID,
        id: idx ? idx : config.activeId,
      })
    );
  };

  const getTotalAssetsAmount = () => {
    dispatch(
      getTotalAssetsAmountAction({
        merchantGroup: '',
        merchant: merchantID,
        playerID,
      })
    );
  };

  const handleSave = () => {
    const { activeId, changeMoney, type, noted } = config;
    dispatch(
      editWalletTransferAction({
        merchantGroup: '',
        merchant: merchantID,
        playerID,
        type,
        walletID: activeId,
        value: changeMoney,
        noted,
      })
    );
  };

  const handleNotedChange = value => {
    setConfig(draftState => {
      draftState['noted'] = value;
    });
  };

  const handleChangeType = () => {
    setConfig(draftState => {
      draftState['type'] = draftState['type'] === 'out' ? 'in' : 'out';
      draftState['changeMoney'] = '';
    });
  };

  const handleMoneyChange = (value, setValue) => {
    let updateValue = value ? value : 0;
    let compareValue = 0;
    if (config.type === 'out') {
      compareValue = Helper.number.calc({
        num: _.filter(config.data, o => o.id === config.activeId)[0]?.money,
        pairs: [['-', updateValue]],
      });
    } else {
      compareValue = Helper.number.calc({
        num: config.wallet.money,
        pairs: [['-', updateValue]],
      });
    }

    if (parseInt(compareValue) <= 0) {
      updateValue =
        config.type === 'out'
          ? _.filter(config.data, o => o.id === config.activeId)[0]?.money
          : config.wallet.money;
      setValue(updateValue);
    }
    setConfig(draftState => {
      draftState['changeMoney'] = parseInt(updateValue);
    });
  };

  const changeActive = idx => {
    if (idx === config.activeId) return;
    setConfig(draftState => {
      draftState['activeId'] = idx;
      draftState['changeMoney'] = '';
    });
    getSubWalletAmount(idx);
  };

  return (
    <>
      <div className={styles.top}>
        {/* 子錢包 */}
        <div className={styles.boxWrap}>
          {config.data.map(item => (
            <div
              className={`${styles.box} ${item.id === config.activeId &&
                styles.active}`}
              key={item.id}
              onClick={() => changeActive(item.id)}
            >
              <div className={styles.titleWrap}>
                <i className={`${wallet2SVG[item.id]} ${styles.icon}`} />
                <span className={styles.title}>{item.text}</span>
                <i
                  className={`${styles.redo} las la-redo-alt`}
                  onClick={e => {
                    e.stopPropagation();
                    getSubWalletAmount(item.id);
                  }}
                />
              </div>
              <div className={styles.money}>
                {Helper.number.format({ num: item.money, nanValue: '－' })}
              </div>
            </div>
          ))}
        </div>
        {/* 轉出 / 轉入 */}
        <div className={styles.changeWrap}>
          <div className={styles.changeIcon} onClick={() => handleChangeType()}>
            <i
              className={`${styles.arrowRight} ${
                config.type === 'out'
                  ? 'las la-arrow-right'
                  : 'las la-arrow-left'
              }`}
            ></i>
            <i
              className={`${styles.arrowLeft} ${
                config.type === 'out'
                  ? 'las la-arrow-left'
                  : 'las la-arrow-right'
              }`}
            ></i>
          </div>
          <span>{config.type === 'out' ? '转出' : '转入'}</span>
        </div>
        {/* 主錢包 */}
        <div className={styles.walletWrap}>
          <div className={styles.titleWrap}>
            <i className={`${wallet2SVG['mainWallet']} ${styles.icon}`} />
            <span className={styles.title}>主钱包</span>
            <i
              className={`${styles.redo} las la-redo-alt`}
              onClick={() => getTotalAssetsAmount()}
            />
          </div>
          <div className={styles.money}>
            {Helper.number.format(config.wallet.money)}
          </div>
        </div>
      </div>
      {/* 中間 顯示轉換金額 */}
      <div className={styles.middle}>
        {/* 子錢包 轉換金額 */}
        <div className={`${styles.childChangeWrap} ${styles.box}`}>
          <span>{`${
            _.filter(config.data, o => o.id === config.activeId)[0]?.text
          }更新金额`}</span>
          <span>
            {Helper.number.calc({
              num: _.filter(config.data, o => o.id === config.activeId)[0]
                ?.money,
              pairs: [
                [
                  config.type === 'out' ? '-' : '+',
                  config.changeMoney ? config.changeMoney : 0,
                ],
              ],
              nanValue: '－',
            })}
          </span>
        </div>
        {/* 輸入框 轉換金額 */}
        <div className={`${styles.inputChangeWrap} ${styles.box}`}>
          <InputDetailData
            key={`${config.type}-${config.activeId}`}
            textAlign="right"
            type="number"
            value={config.changeMoney}
            cusChange={(v, setValue) => handleMoneyChange(v, setValue)}
            title=""
            placeholder="请输入调整金额"
          />
        </div>
        {/* 主錢包 轉換金額 */}
        <div className={`${styles.walletChangeWrap} ${styles.box}`}>
          <span>主钱包更新金额</span>
          <span>
            {Helper.number.calc({
              num: config.wallet.money,
              pairs: [
                [
                  config.type === 'out' ? '+' : '-',
                  config.changeMoney ? config.changeMoney : 0,
                ],
              ],
              nanValue: '－',
            })}
          </span>
        </div>
      </div>
      {/* 备注 */}
      <span className={styles.line} />
      <div className={styles.bottom}>
        <InputDetailData
          textAlign="left"
          type="text"
          cusChange={v => handleNotedChange(v)}
          title="备注"
          placeholder="请输入备注内容"
        />
      </div>
    </>
  );
};

export default WalletTransfer;
