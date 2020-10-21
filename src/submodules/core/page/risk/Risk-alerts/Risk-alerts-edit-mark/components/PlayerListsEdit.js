import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useHistory, Prompt } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { useInterceptor, useDispatchEvent } from 'Hooks/useInterceptor';
import useAlertDialog from 'Hooks/useAlertDialog';
import usePrompt from 'Hooks/usePrompt';
import useAxiosSelector2 from 'Hooks/useAxiosSelector2';

import InputDetailData from 'BaseComponent/InputDetailData';
import DatePicker from 'BaseComponent/DatePicker';
import InputGroupFee from 'BaseComponent/InputGroupFee';
import FooterButton from './FooterButton';

import useGetOddsRange from 'Page/player/Player-lists/useGetOddsRange';
import {
  getPlayerProfileAction,
  editPlayerBasicAction,
} from 'Redux/axios/action';
import { PLAYER_LISTS as API } from 'Constants/api/api';
import styles from './PlayerListsEdit.module.scss';

const merchantGroup = 'merchantGroup';

const defaultValues = {
  birthday: '',
  realName: '',
  playerID: '',
  phoneNumber: '',
  email: '',
  qqID: '',
  wechatID: '',
  topLineInput: '',
  odds: '',
  added: null,
  assetPw: '',
  loginPw: '',
};

const PlayerListsEdit = () => {
  let { merchantID, playerID } = useParams();
  //hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const prompt = usePrompt();
  const alert = useAlertDialog();
  const methods = useForm({
    defaultValues: defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const {
    formState,
    handleSubmit,
    getValues,
    trigger,
    setValue,
    reset,
    watch,
    errors,
  } = methods;

  const watchAdded = watch('added');
  playerID = playerID ? playerID : history.location.state.playerID;
  const pathname = `/merchants/${merchantID}/player-lists/${playerID}/edit`;
  const playerListsPath = `/merchants/${merchantID}/player-lists`;

  const {
    oddsRange,
    oddsMessage,
    checkTopLineExist,
    topLineCheckbox,
    setTopLineCheckbox,
    confirmedTopLine,
  } = useGetOddsRange(
    {
      merchantGroup,
      merchant: merchantID,
    },
    () => {
      trigger('odds');
    }
  );

  const basicInfoData = useAxiosSelector2(API.GET_PLAYER_PROFILE);
  useInterceptor(async (action, prev, next) => {
    if (formState.isDirty) {
      switch (action) {
        case `SET_TAB_玩家限制`:
        case `SET_TAB_警报注记`:
        case 'PUSH': //換頁
          await alert('是否放弃当前修改？');
          break;
        default:
          break;
      }
    }
  });

  useEffect(() => {
    dispatch(getPlayerProfileAction({ merchantGroup, merchantID, playerID }));
  }, []);

  useEffect(() => {
    if (basicInfoData) {
      reset({
        ...getValues(),
        ...basicInfoData,
        birthday: new Date(basicInfoData.birthday),
        topLineInput: basicInfoData.topLine,
      });
    }
  }, [basicInfoData]);

  useEffect(() => {
    if (history.location.pathname !== pathname) {
      history.push({ pathname }, { playerID });
    }
  }, []);

  const emailRightIcon = () => {
    if (watchAdded?.email) {
      return [`las la-check-circle la-lg ${styles.checkIcon}`, v => null];
    } else return [];
  };
  const onSubmit = () => {
    dispatch(
      editPlayerBasicAction({
        ...getValues(),
        ...getValues('topLine'),
        topLine: topLineCheckbox ? confirmedTopLine : basicInfoData.topLine,
      })
    );
  };

  const validateType = key =>
    errors?.[key] ? 'invalid' : formState.dirtyFields[key] ? 'valid' : null;

  const disableSubmit = () => {
    if (!formState.isValid) return true;
    else if (topLineCheckbox && oddsMessage !== 'topLineOdds') return true;
    else return false;
  };

  return (
    <div className={styles.root}>
      <Prompt when={formState.isDirty} {...prompt} />
      <FormProvider {...methods}>
        <div className={styles.title}>基本信息</div>
        <div className={styles.flexWrap}>
          <div className={styles.item}>
            <Controller
              name="realName"
              render={({ value, onChange, ...props }) => {
                return (
                  <InputDetailData
                    title="真实姓名"
                    size="xl"
                    disabled
                    value={value}
                  />
                );
              }}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="playerID"
              rules={{ required: true }}
              render={({ value, onChange, ...props }) => (
                <InputDetailData
                  title="昵称"
                  size="xl"
                  value={value}
                  cusChange={onChange}
                  validation={validateType('playerID')}
                />
              )}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="birthday"
              rules={{ required: true }}
              render={({ value, onChange, ...props }) => {
                return (
                  <DatePicker
                    label="生日"
                    handleChange={onChange}
                    value={value}
                    validation={validateType('birthday')}
                  />
                );
              }}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="phoneNumber"
              rules={{ required: true }}
              render={({ value, onChange, ...props }) => (
                <InputDetailData
                  title="手机号"
                  size="xl"
                  value={value}
                  cusChange={onChange}
                  validation={validateType('phoneNumber')}
                />
              )}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="email"
              render={({ value, onChange, ...props }) => {
                return (
                  <InputDetailData
                    title="邮箱"
                    size="xl"
                    value={value}
                    disabled
                    rightIcon={emailRightIcon()}
                  />
                );
              }}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="qqID"
              rules={{ required: true }}
              render={({ value, onChange, ...props }) => (
                <InputDetailData
                  title="QQ ID"
                  size="xl"
                  value={value}
                  cusChange={onChange}
                  validation={validateType('qqID')}
                />
              )}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="wechatID"
              rules={{ required: true }}
              render={({ value, onChange, ...props }) => (
                <InputDetailData
                  title="微信 ID"
                  size="xl"
                  value={value}
                  cusChange={onChange}
                  validation={validateType('wechatID')}
                />
              )}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="topLineInput"
              render={({ value, onChange, ...props }) => (
                <InputGroupFee
                  title="上级帐号"
                  placeholder="请输入上级帐号"
                  checkboxChecked={topLineCheckbox}
                  checkboxChange={e => {
                    setTopLineCheckbox(e.target.checked);
                    if (!e.target.checked) {
                      setValue('topLineInput', basicInfoData.topLine);
                    }
                  }}
                  value={value}
                  hasCheckbox
                  cusChange={onChange}
                  hasButton
                  buttonContent="检查帐号"
                  cusClick={() => {
                    checkTopLineExist(getValues('topLineInput'));
                  }}
                  size="xl"
                />
              )}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="odds"
              type="number"
              rules={{ required: true }}
              rules={{
                validate: value => {
                  return (
                    !isNaN(value) &&
                    parseFloat(value) >= oddsRange[0] &&
                    parseFloat(value) <= oddsRange[1]
                  );
                },
              }}
              render={({ value, onChange, ...props }) => (
                <InputDetailData
                  title="奖金组"
                  size="xl"
                  placeholder={
                    '请输入介于' +
                    oddsRange[0] +
                    '至' +
                    oddsRange[1] +
                    '的奖金组'
                  }
                  value={value}
                  cusChange={onChange}
                  validation={validateType('odds')}
                  {...props}
                />
              )}
            />
          </div>
        </div>
        <div className={styles.title}>密码设置</div>
        {/* //TODO 商家设置 需要邮箱（邮箱未验证） -> input/btn皆 disable*/}
        {/* //商家设置 需要邮箱（邮箱已验证） -> input disable btn enable*/}
        {/* //商家设置 后台手动（不论邮箱是否输入及验证） -> btn disable, input enable, 用儲存 */}
        <div className={styles.flexWrap}>
          <div className={styles.item}>
            <Controller
              name="assetPw"
              render={({ value, onChange, ...props }) => (
                <InputGroupFee
                  title="资金密码"
                  placeholder="・・・・・・・"
                  cusChange={onChange}
                  hasButton
                  buttonContent="发送密码"
                  cusClick={e => console.log('Clicked: ', e)}
                  size="xxl"
                  type="password"
                />
              )}
            />
          </div>
          <div className={styles.item}>
            <Controller
              name="loginPw"
              render={({ value, onChange, ...props }) => (
                <InputGroupFee
                  title="登录密码"
                  placeholder="・・・・・・・"
                  cusChange={onChange}
                  hasButton
                  buttonContent="发送密码"
                  cusClick={e => console.log('Clicked: ', e)}
                  size="xxl"
                  type="password"
                />
              )}
            />
          </div>
        </div>
      </FormProvider>

      <FooterButton
        saveDisabled={disableSubmit()}
        onSave={handleSubmit(onSubmit)}
        onBack={() => {
          history.push({ pathname: playerListsPath });
        }}
      />
    </div>
  );
};
export default PlayerListsEdit;
