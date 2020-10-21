import React, { useEffect, useContext } from 'react';
import { useImmer } from 'use-immer';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import Helper from 'Helper';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTotalAssetsAmountAction,
  editAmountAdjustmentAction,
} from 'Redux/axios/action';
import { PLAYER_LISTS as API } from 'Constants/api/api';
import ButtonBase from 'BaseComponent/ButtonBase';
import InputDetailData from 'BaseComponent/InputDetailData';
import styles from './AmountAdjustment.module.scss';

import { StateContext } from '../';

const AmountAdjustment = () => {
  const { updateState } = useContext(StateContext);
  const dispatch = useDispatch();
  let { merchantID, playerID } = useParams();
  const [config, setConfig] = useImmer({
    value: [
      {
        id: 0,
        title: '总资产',
        currentAmount: null,
        refreshAmount: '－',
        connect: '=',
        sign: '+',
        value: '0',
      },
      {
        id: 1,
        title: '锁定金额',
        currentAmount: null,
        refreshAmount: '－',
        connect: '+',
        sign: '+',
        value: '0',
      },
      { id: 2, title: '可提现额', currentAmount: null, refreshAmount: '－' },
    ],
    noted: '',
  });

  const { setKey: getTotalAssetsAmountKey } = API.GET_TOTAL_ASSETS_AMOUNT({});
  const apiTotalAssetsAmountData = useSelector(
    state =>
      state.axios.key?.[getTotalAssetsAmountKey.page]?.[
        getTotalAssetsAmountKey.function
      ]
  );

  useEffect(() => {
    dispatch(
      getTotalAssetsAmountAction({
        merchantGroup: '',
        merchant: merchantID,
        playerID,
      })
    );
    updateState(state => {
      state.buttonControl.save = handleSave;
    });
  }, [dispatch, playerID, merchantID]);

  useEffect(() => {
    const processData = () => {
      setConfig(draftState => {
        draftState.value[0].currentAmount = apiTotalAssetsAmountData[0];
        draftState.value[1].currentAmount = apiTotalAssetsAmountData[1];
        draftState.value[2].currentAmount =
          apiTotalAssetsAmountData[0] - apiTotalAssetsAmountData[1];
      });
    };
    if (apiTotalAssetsAmountData) processData();
  }, [setConfig, apiTotalAssetsAmountData]);

  useEffect(() => {
    const isChange =
      config.value[0].value !== '0' || config.value[1].value !== '0';

    updateState(state => {
      state.isDirty = isChange || config.noted.length > 0;
      state.buttonControl.isChange = isChange;
      state.buttonControl.save = handleSave;
    });
  }, [config]);

  const handleSave = () => {
    const resultTemp = _.filter(config.value, o => o.value !== '0' && o.value);

    if (resultTemp.length > 0) {
      const result = resultTemp.map(o => {
        const { id, value, sign } = o;
        return { id, value, sign };
      });
      dispatch(
        editAmountAdjustmentAction({
          merchantGroup: '',
          merchant: merchantID,
          playerID,
          value: result,
          noted: config.noted,
        })
      );
    }
  };

  const handleInputChange = (value, idx, sign) => {
    if (_.isNaN(+Helper.number.clearNum(value))) return;
    const nConfig = config.value[idx];
    const nConfig1 = idx === 0 ? config.value[1] : config.value[0];
    const nConfig2 = idx === 0 ? config.value[2] : config.value[0];

    if (idx === 0) {
      // 总资产
      const result = Helper.number.calc({
        num: nConfig.currentAmount,
        pairs: [
          [sign ? sign : nConfig.sign, value],
          [nConfig1.sign, nConfig1.value],
        ],
        likeComma: false,
        afterPoint: 0,
        nanValue: '－',
      });

      const result2 = Helper.number.calc({
        num: nConfig2.currentAmount,
        pairs: [[sign ? sign : nConfig.sign, value]],
        likeComma: false,
        afterPoint: 0,
        nanValue: '－',
      });

      setConfig(draftState => {
        draftState.value[idx].refreshAmount = result;
        draftState.value[2].refreshAmount = result2;
        draftState.value[idx].value = Helper.number.format({
          num: value,
          afterPoint: 0,
          likeComma: false,
          nanValue: '0',
        });
      });
    } else {
      // 锁定金额
      const result = Helper.number.calc({
        num: nConfig.currentAmount,
        pairs: [[sign ? sign : nConfig.sign, value]],
        likeComma: false,
        afterPoint: 0,
        nanValue: '－',
      });

      const result2 = Helper.number.calc({
        num: nConfig2.currentAmount,
        pairs: [
          [sign ? sign : nConfig.sign, value],
          [nConfig1.sign, nConfig1.value],
        ],
        likeComma: false,
        afterPoint: 0,
        nanValue: '－',
      });

      setConfig(draftState => {
        draftState.value[idx].refreshAmount = result;
        draftState.value[0].refreshAmount = result2;
        draftState.value[idx].value = Helper.number.format({
          num: value,
          likeComma: false,
          afterPoint: 0,
        });
      });
    }
  };
  const handleSignChange = (value, idx) => {
    setConfig(draftState => {
      draftState.value[idx].sign = value;
    });

    if (Helper.number.format(config.value[idx].value, 0) !== '0')
      handleInputChange(config.value[idx].value, idx, value);
  };
  const handleNotedChange = value => {
    setConfig(draftState => {
      draftState['noted'] = value;
    });
  };

  return (
    <>
      <div className={styles.boxWrap}>
        {config.value?.map((item, idx) => (
          <div key={item.id}>
            <div className={styles.box}>
              <div className={styles.title}>{item.title}</div>
              {idx === 0 ? (
                <>
                  <div className={styles.sign}>当前金额</div>
                  <div className={styles.sign}>更新金额</div>
                </>
              ) : null}
              <div className={styles.amount} key={item.currentAmount}>
                {Helper.number.format({
                  num: item.currentAmount,
                  nanValue: '－',
                })}
              </div>
              <div className={styles.amount2}>
                {!Helper.number.isNaN(item.refreshAmount)
                  ? Helper.number.format(item.refreshAmount)
                  : item.refreshAmount}
              </div>
              {idx !== 2 ? (
                <div className={styles.controlGroup}>
                  <ButtonBase
                    list={[
                      {
                        value: '增加',
                        onClick: () => handleSignChange('+', idx),
                      },
                      {
                        value: '扣除',
                        onClick: () => handleSignChange('-', idx),
                      },
                    ]}
                    size={'sm'}
                    styleType={'style-9'}
                    defaultIndex={item.sign === '+' ? 0 : 1}
                  />
                  <InputDetailData
                    size="ssm"
                    textAlign="right"
                    type="text"
                    cusChange={v => handleInputChange(v, idx)}
                    title=""
                    placeholder=""
                    value={Helper.number.format({
                      num: config.value[idx].value,
                      likeComma: false,
                    })}
                  />
                </div>
              ) : null}
            </div>
            {item.connect ? (
              <span className={styles.connect}>{item.connect}</span>
            ) : null}
          </div>
        ))}
      </div>
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

export default AmountAdjustment;
