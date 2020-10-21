import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import styles from './PlayerProfile.module.scss';
import stylevariables from 'Styled/styles.scss';
import { format, add, set } from 'date-fns';
import Helper from 'Helper';
import SwipeableViews from 'react-swipeable-views';
import { useImmer } from 'use-immer';

import Tabs from 'Layout/Tabs';
import Dialog from 'Layout/Dialog';
import Table from 'Layout/Table2';
import CKEditor from 'Layout/CKEditor';

import ButtonOperation from 'BaseComponent/ButtonOperation';
import SpanStatus from 'BaseComponent/SpanStatus';
import ButtonRound from 'BaseComponent/ButtonRound';
import TimeLine from 'BaseComponent/TimeLine2';
import LogUnit from 'BaseComponent/LogUnit';
import ToolTip, { DefaultTextDom } from 'BaseComponent/ToolTip';
import InputDetailData from 'BaseComponent/InputDetailData';
import RadioBase from 'BaseComponent/RadioBase';
import SelectDetailData from 'BaseComponent/SelectDetailData';
import SelectMulti from 'BaseComponent/SelectMulti';

import useInterval from 'Hooks/useInterval';
import useAlertDialog from 'Hooks/useAlertDialog';
import useAxiosSelector2 from 'Hooks/useAxiosSelector2';
import BankCard from './BankCard';
import parse from 'date-fns/parse';
import intervalToDuration from 'date-fns/intervalToDuration';
import wallet2SVG from './wallet2SVG';

import {
  getPlayerProfileAction,
  getPlayerDepositAction,
  getWalletListAction,
  getWalletValueAction,
  getBankCardListAction,
  getTimeLineListAction,
  deleteBankCardAction,
  getGameReportAction,
  getPromoListAction,
  editPromoListAction,
  getDownLineListAction,
  sendMessageAction,
  editUnbindAction,
  editPlayerUnlockAction,
  upgradeLevelOneAction,
  editAccessLimitAction,
  getTopLineOddsRangeAction,
  addNewPlayerAction,
} from 'Redux/axios/action';
import { PLAYER_LISTS as PLAYER_API } from 'Constants/api/api';
import profile from './assets/profile.png';
import birthdayCake from './assets/birthday-cake.svg';

const tabList2 = {
  0: { title: '配额信息', children: null },
  1: { title: '登录日志', children: null },
};

const tableColumnsPromo = (dispatch, playerID) => [
  {
    Header: '优惠类别',
    accessor: 'type',
    align: 'center',
    width: 56 + 48 * 2,
  },
  {
    Header: '优惠名称',
    accessor: 'name',
    align: 'left',
    width: 56 + 48,
  },
  {
    Header: '条件',
    width: 76,
    Cell: ({ row: { original } }) => (
      <ToolTip textDom={original.condition}>
        <i className="las la-exclamation-circle la-lg" />
      </ToolTip>
    ),
  },
  {
    Header: '操作',
    width: 76,
    Cell: ({ row: { original } }) => (
      <ButtonOperation
        text="申请"
        stylesType="primary"
        handleClick={() => {
          dispatch(
            editPromoListAction({
              playerID,
              type: 'system',
              promoType: original.type,
              name: original.name,
              operation: 'apply',
            })
          );
          // console.log(original.name);
        }}
      />
    ),
  },
];
const tableColumnsPromo2 = (dispatch, playerID) => [
  {
    Header: '优惠类别',
    accessor: 'type',
    align: 'center',
    width: 56 + 32 * 2,
  },
  {
    Header: '优惠名称',
    accessor: 'name',
    align: 'left',
    width: 56 + 32,
  },
  {
    Header: '条件',
    width: 28 + 32,
    Cell: ({ row: { original } }) => (
      <ToolTip textDom={original.condition}>
        <i className="las la-exclamation-circle la-lg" />
      </ToolTip>
    ),
  },
  {
    Header: '操作',
    width: 44 + 104,
    Cell: ({ row: { original } }) => (
      <div className={styles.spanStatus}>
        <div
          className={styles.status}
          onClick={e => {
            e.stopPropagation();
            dispatch(
              editPromoListAction({
                playerID,
                type: 'affiliate',
                promoType: original.type,
                name: original.name,
                operation: 'agree',
              })
            );
          }}
        >
          <SpanStatus value={'同意'} styleType={'style-1'} />
        </div>
        <div
          className={styles.status}
          onClick={e => {
            e.stopPropagation();
            dispatch(
              editPromoListAction({
                type: 'affiliate',
                promoType: original.type,
                name: original.name,
                operation: 'reject',
              })
            );
          }}
        >
          <SpanStatus value="拒绝" />
        </div>
      </div>
    ),
  },
];
//
const merchantGroup = 'merchantGroup';

const PlayerProfile = () => {
  let { merchantID, playerID } = useParams();
  const history = useHistory();
  playerID = playerID ? playerID : history.location.state.playerID;

  const dispatch = useDispatch();
  const alert = useAlertDialog();
  //UI state
  const [currSubTab, setCurrSubTab] = useState(0);
  const [walletValue, setWalletValue] = useImmer([]);
  const [swipeIdx, setSwipeIdx] = useState(0);
  const [unlockLoginOpen, setUnlockLoginOpen] = useState(false);
  const [promotionPopupOpen, setPromotionPopupOpen] = useState(false);
  const [messagePopOpen, setMessagePopOpen] = useState(false);
  const [unbindPopupOpen, setUnbindPopupOpen] = useState(false);
  const [addDownLinePopupOpen, setAddDownLinePopupOpen] = useState(false);
  const [currTabPromo, setCurrTabPromo] = useState(0);
  const [duration, setDuration] = useState(null);

  //Redux Data
  const basicInfoData = useAxiosSelector2(PLAYER_API.GET_PLAYER_PROFILE) || {};
  const depositData = useAxiosSelector2(PLAYER_API.GET_PLAYER_DEPOSIT) || {
    available: 0,
    locked: 0,
  };
  const gameReport = useAxiosSelector2(PLAYER_API.GET_GAME_REPORT) || [];
  const walletList = useAxiosSelector2(PLAYER_API.GET_WALLET_LIST) || [];
  const bankCardList = useAxiosSelector2(PLAYER_API.GET_BANK_CARD_LIST) || [];
  const timeLineList = useAxiosSelector2(PLAYER_API.GET_TIME_LINE_LIST) || [];
  const walletValueRedux = useAxiosSelector2(PLAYER_API.GET_WALLET_VALUE);
  const promoList = useAxiosSelector2(PLAYER_API.GET_PROMO_LIST) || [];

  const gameReportTotal = () => {
    if (gameReport.length === 0) return 0;
    else {
      let totalBet = 0;
      let totalProfitLoss = 0;
      gameReport.forEach(game => {
        totalBet += parseFloat(game.betAmount);
        totalProfitLoss += parseFloat(game.profitLoss);
      });
      return { totalBet, totalProfitLoss };
    }
  };
  useInterval(() => {
    if (basicInfoData.unlockTime) {
      const duration = intervalToDuration({
        end: basicInfoData.unlockTime,
        start: new Date(),
      });
      const durationStr =
        duration.hours + ':' + duration.minutes + ':' + duration.seconds;
      setDuration(durationStr);
    }
  }, 1000);

  const levels = basicInfoData.levels || {};
  //三個一組並標明群組名稱
  //discountLevel[0]已在第一group有 =>扣除
  const group3WithTag =
    groupBy3(
      tagArr(levels?.discountLevel?.slice(1) || [], '优惠群組').concat(
        tagArr(levels?.communicateLevel || [], '通訊群組')
      )
    ) || [];
  useEffect(() => {
    dispatch(getPlayerProfileAction({ test: 'getPlayerProfileAction' }));
    dispatch(getPlayerDepositAction({ test: 'getPlayerDepositAction' }));
    dispatch(getGameReportAction({ test: 'getGameReportAction' }));
    dispatch(getWalletListAction({ test: 'getWalletListAction' }));
    dispatch(getBankCardListAction({ test: 'getBankCardListAction' }));
  }, []);

  useEffect(() => {
    if (walletList.length > 0) {
      let result = {};
      for (let el of walletList) {
        result[el.id] = null;
      }
      setWalletValue(() => result);
    }
  }, [walletList]);

  useEffect(() => {
    if (currSubTab === 1 && timeLineList.length === 0) {
      dispatch(getTimeLineListAction({ test: 'getTimeLineListAction' }));
    }
  }, [currSubTab]);

  useEffect(() => {
    if (walletValueRedux) {
      setWalletValue(draftState => {
        draftState[walletValueRedux.id] = walletValueRedux.value;
      });
    }
  }, [walletValueRedux]);

  useEffect(() => {
    if (promotionPopupOpen) {
      const type =
        currTabPromo === 0 ? 'system' : currTabPromo === 1 ? 'affiliate' : null;
      dispatch(getPromoListAction({ type, playerID }));
    }
  }, [currTabPromo, promotionPopupOpen]);

  if (Object.keys(basicInfoData).length > 0)
    return (
      <div className={styles.root}>
        <div className={styles.profilePanel}>
          <div className={styles.profilePanelLeft}>
            <div className={styles.headProfile}>
              <div
                className={`${styles.onlineStatus} ${
                  basicInfoData.onlineStatus ? styles.online : ''
                }`}
              >
                <img src={profile} className={styles.headIcon} alt="profile" />
                <ShowBirthdayCake birthday={basicInfoData.birthday} />
              </div>
              <div>
                <div className={styles.playerID}>Ada</div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>权限</div>
                  <div className={styles.infoText}>{basicInfoData.access}</div>
                </div>
                <div className={styles.info}>
                  <div className={styles.infoTitle}>推荐代码</div>
                  <div className={styles.infoText}>
                    {basicInfoData.recommendCode}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.deposit}>
              <div className={styles.depositRow}>
                <div className={styles.depositTitle}>
                  <div className={styles.titleText}>总资产</div>
                  <ToolTip textDom="总资产＝锁定金额＋可提现额">
                    <i className="las la-question-circle la-lg" />
                  </ToolTip>
                </div>
                <div className={styles.depositText}>
                  {Helper.number.format(
                    depositData.available + depositData.locked
                  )}
                </div>
              </div>
              <ToolTip
                textDom={
                  <DefaultTextDom
                    list={[
                      {
                        text:
                          '锁定金额 ' +
                          Helper.number.format(depositData.locked),
                        color: stylevariables.primaryColor,
                      },
                      {
                        text:
                          '可提现额 ' +
                          Helper.number.format(depositData.available),
                        color: stylevariables.secondaryColor,
                      },
                    ]}
                  />
                }
              >
                <div className={styles.progressBar}>
                  <div
                    className={styles.lockedBar}
                    style={{
                      width: calcPercent(
                        depositData.locked,
                        depositData.available + depositData.locked
                      ),
                    }}
                  />
                  <div
                    className={styles.availableBar}
                    style={{
                      width: calcPercent(
                        depositData.available,
                        depositData.available + depositData.locked
                      ),
                    }}
                  />
                </div>
              </ToolTip>
            </div>
            <div className={styles.levelsWrap}>
              {swipeIdx >= 1 && (
                <div
                  className={styles.leftArrow}
                  onClick={() => {
                    setSwipeIdx(prev => prev - 1);
                  }}
                >
                  <i className="las la-caret-left" />
                </div>
              )}
              {basicInfoData.levels && (
                <SwipeableViews index={swipeIdx}>
                  <div className={styles.levelGroup}>
                    <LevelItem level={levels.paymentLevel} type="支付层级" />
                    <LevelItem
                      level={'层级' + levels.playerLevel}
                      type="玩家层级"
                    />
                    <LevelItem
                      level={levels.discountLevel[0]}
                      type="优惠群组"
                    />
                  </div>
                  {group3WithTag.map((group, idx) => (
                    <div className={styles.levelGroup} key={idx}>
                      {group.map((item, idx2) => (
                        <LevelItem
                          key={idx2}
                          level={item.value}
                          type={item.name}
                        />
                      ))}
                    </div>
                  ))}
                </SwipeableViews>
              )}
              {swipeIdx < group3WithTag.length && (
                <div className={styles.rightArrow}>
                  <i
                    className="las la-caret-right"
                    onClick={() => {
                      setSwipeIdx(prev => prev + 1);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.profilePanelRight}>
            <div className={styles.row}>
              <div className={styles.left}>奖金组</div>
              <div className={styles.right}>{basicInfoData.odds}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.left}>上级帐号</div>
              <div className={styles.right}>
                {basicInfoData.topLine} / {basicInfoData.topLineCode}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.left}>最后登录IP</div>
              <div className={styles.right}>{basicInfoData.lastLoginIP}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.left}>最后登录域名</div>
              <div className={styles.right}>{basicInfoData.domain}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.left}>注册IP</div>
              <div className={styles.right}>{basicInfoData.registerIP}</div>
            </div>
            <div>
              <div className={styles.row2}>
                <StatusIcon
                  icon={<i className="las la-mobile" />}
                  added={basicInfoData?.added?.mobile}
                  name="手机号"
                />
                <StatusIcon
                  icon={<i className="las la-envelope" />}
                  added={basicInfoData?.added?.email}
                  name="邮箱登录"
                />
                <StatusIcon
                  icon={<i className="lab la-qq" />}
                  added={basicInfoData?.added?.qq}
                  name="QQ登录"
                />
                <StatusIcon
                  icon={<i className="lab la-weixin" />}
                  added={basicInfoData?.added?.wechat}
                  name="微信登录"
                />
              </div>
              <div className={styles.row2}>
                <StatusIcon
                  icon={<i className="las la-fingerprint" />}
                  added={
                    basicInfoData?.added?.fingerPrint ||
                    basicInfoData?.added?.faceID
                  }
                  name={
                    basicInfoData?.added?.fingerPrint
                      ? '指纹辨识'
                      : basicInfoData?.added?.faceID
                      ? 'faceID'
                      : '指纹辨识'
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.basicInfo}>
          <div className={styles.top}>
            <div className={styles.title}>基本信息</div>
            <div className={styles.icons}>
              <div className={styles.icon}>
                <ToolTip textDom="解除登录方式绑定">
                  <ButtonRound
                    buttonText=""
                    buttonIcon={<i className="las la-sign-out-alt" />}
                    styleType="style-3"
                    cusClick={name => {
                      setUnbindPopupOpen(true);
                    }}
                    size="sm"
                  />
                </ToolTip>
              </div>
              <div className={styles.icon}>
                <ToolTip textDom="解锁帐号登录">
                  <ButtonRound
                    buttonText=""
                    buttonIcon={<i className="las la-unlock" />}
                    styleType="style-3"
                    cusClick={name => {
                      setUnlockLoginOpen(true);
                    }}
                    size="sm"
                  />
                </ToolTip>
              </div>
              <div className={styles.icon}>
                <ToolTip textDom="升级为层级一">
                  <ButtonRound
                    buttonText=""
                    buttonIcon={<i className="las la-upload" />}
                    styleType="style-3"
                    cusClick={() => {
                      alert(
                        '确认升为层级一？',
                        `确认将玩家 ${playerID} 升级为层级一？`
                        //TODO confirmText
                      ).then(() =>
                        dispatch(
                          upgradeLevelOneAction({
                            merchantGroup: merchantGroup,
                            merchant: merchantID,
                            playerIDs: [playerID],
                          })
                        )
                      );
                    }}
                    size="sm"
                  />
                </ToolTip>
              </div>
              <div className={styles.icon}>
                <ToolTip textDom="升级为代理">
                  <ButtonRound
                    buttonText=""
                    buttonIcon={<i className="las la-rocket" />}
                    styleType="style-3"
                    cusClick={() => {
                      alert(
                        '确认升级代理权限？',
                        `确认将玩家 ${playerID} 升级为代理权限？`
                        //TODO confirmText 升级
                      ).then(() =>
                        dispatch(
                          editAccessLimitAction({
                            merchantGroup,
                            merchant: merchantID,
                            playerIDs: [playerID],
                            accessLimit: 'affiliate',
                          })
                        )
                      );
                    }}
                    size="sm"
                  />
                </ToolTip>
              </div>
              <div className={styles.icon}>
                <ToolTip textDom="新增下级">
                  <ButtonRound
                    buttonText=""
                    buttonIcon={<i className={'las la-user-plus '} />}
                    styleType="style-3"
                    cusClick={() => {
                      setAddDownLinePopupOpen(true);
                    }}
                    size="sm"
                  />
                </ToolTip>
              </div>
              <div className={styles.icon}>
                <ToolTip textDom="发送站内信">
                  <ButtonRound
                    buttonText=""
                    buttonIcon={<i className={'las la-comments '} />}
                    styleType="style-3"
                    cusClick={name => {
                      setMessagePopOpen(true);
                    }}
                    size="sm"
                  />
                </ToolTip>
              </div>
              <div className={styles.icon}>
                <ToolTip textDom="发送优惠">
                  <ButtonRound
                    buttonText=""
                    buttonIcon={<i className={'las la-gifts '} />}
                    styleType="style-3"
                    cusClick={() => {
                      setPromotionPopupOpen(true);
                    }}
                    size="sm"
                  />
                </ToolTip>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.row}>
              <BasicInfoItem title="真实姓名" text={basicInfoData.realName} />
              <BasicInfoItem title="昵称" text={basicInfoData.playerID} />
              <BasicInfoItem title="生日" text={basicInfoData.birthday} />
              <BasicInfoItem
                title="手机号"
                text={basicInfoData.phoneNumber}
                added={basicInfoData?.added?.mobile}
              />
            </div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <BasicInfoItem
                title="邮箱"
                text={basicInfoData.email}
                added={basicInfoData?.added?.email}
              />
              <BasicInfoItem
                title="QQ ID"
                text={basicInfoData.qqID}
                added={basicInfoData?.added?.qq}
              />
              <BasicInfoItem
                title="微信 ID"
                text={basicInfoData.wechatID}
                added={basicInfoData?.added?.wechat}
              />
            </div>
            <div className={styles.divider} />
            <div className={styles.row}>
              <BasicInfoItem
                title="锁定状态"
                text={basicInfoData.holdStatus}
                duration={duration}
                size="lg"
              />
              <BasicInfoItem
                title="充值状态"
                text={basicInfoData.depositStatus}
                size="lg"
              />
              <BasicInfoItem
                title="风控状态"
                text={basicInfoData.riskStatus}
                size="lg"
              />
            </div>
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div>
            <Tabs
              tabList={tabList2}
              stylesType={'style-2'}
              getTab={idx => {
                setCurrSubTab(idx);
              }}
            />
          </div>
          <div className={styles.subTabContent}>
            {currSubTab === 1 && timeLineList.length > 0 && (
              <div className={styles.timeline}>
                <TimeLine
                  list={timeLineList}
                  showFirst={4}
                  showMoreNum={5}
                  propsToPass={unit => ({
                    log: {
                      IP: unit.data.ip,
                      域名: unit.data.domain,
                      装置: unit.data.device,
                    },
                    time: format(unit.time, 'HH:mm:ss'),
                    styleType:
                      unit.data.type === 'login' ? 'style-1' : 'style-2',
                    status: unit.data.status,
                    icon: unit.data.inactive
                      ? {
                          icon: <i className="las la-exclamation-circle" />,
                          tooltip: '不活跃，自动登出',
                        }
                      : null,
                  })}
                  height="487px"
                >
                  <TimeLine.Unit>
                    <LogUnit />
                  </TimeLine.Unit>
                </TimeLine>
              </div>
            )}
            {currSubTab === 0 && (
              <div className={styles.walletInfo}>
                <div className={styles.top}>
                  <WalletInfoIcon
                    icon={<i className="las la-dice" />}
                    text={'今日总投注'}
                    val={gameReportTotal().totalBet}
                  />
                  <WalletInfoIcon
                    icon={<i className="las la-chart-bar" />}
                    text={'今日总盈亏'}
                    val={gameReportTotal().totalProfitLoss}
                  />
                </div>
                <div>
                  <WalletInfoPill text="钱包信息" />
                  <div className={styles.walletInfoBoxWrap}>
                    {walletList.map((wallet, idx) => (
                      <WalletInfoBox
                        key={idx}
                        icon={wallet2SVG[wallet.id]}
                        text={wallet.text}
                        val={walletValue[wallet.id]}
                        onClick={() => {
                          dispatch(getWalletValueAction({ id: wallet.id }));
                        }}
                      />
                    ))}
                  </div>
                  <WalletInfoPill text="银行卡" />
                  {bankCardList.map((card, idx) => (
                    <div className={styles.bankCard} key={idx}>
                      <BankCard
                        key={idx}
                        cardName={card.cardName}
                        cardNum={card.cardNum}
                        bankName={card.bankName}
                        bankAdd={card.bankAdd}
                        realName={card.realName}
                        onDelete={() => {
                          dispatch(
                            deleteBankCardAction({ cardNum: card.cardNum })
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <UnbindPopup open={unbindPopupOpen} setOpen={setUnbindPopupOpen} />
        <AddDownLinePopup
          open={addDownLinePopupOpen}
          setOpen={setAddDownLinePopupOpen}
          merchantID={merchantID}
          playerID={playerID}
        />
        <PromotionPopup
          open={promotionPopupOpen}
          setOpen={setPromotionPopupOpen}
          promoList={promoList}
        >
          <div className={styles.giftPopup}>
            <Tabs
              tabList={{
                0: { title: '系统优惠', children: null },
                1: { title: '代理优惠', children: null },
              }}
              stylesType={'style-2'}
              getTab={idx => {
                setCurrTabPromo(idx);
              }}
            />
            {currTabPromo === 0 && (
              <Table
                columns={tableColumnsPromo(dispatch, playerID)}
                data={promoList}
                onRowClick={row => {
                  console.log(row);
                }}
              />
            )}
            {currTabPromo === 1 && (
              <Table
                columns={tableColumnsPromo2(dispatch, playerID)}
                data={promoList}
                onRowClick={row => {
                  console.log(row);
                }}
              />
            )}
          </div>
        </PromotionPopup>
        <UnlockLoginPopup
          open={unlockLoginOpen}
          setOpen={setUnlockLoginOpen}
          duration={duration}
          playerID={playerID}
          merchantID={merchantID}
        />
        <MessagePop
          playerID={playerID}
          topLine={basicInfoData.topLine}
          open={messagePopOpen}
          setOpen={setMessagePopOpen}
        />
      </div>
    );
  else return <></>;
};
export default PlayerProfile;

const BasicInfoItem = ({
  title = '',
  text = '',
  duration = '',
  size = '',
  added = false,
}) => (
  <div className={`${styles.item} ${styles[size]}`}>
    <div className={styles.title}>{title}</div>
    <div className={styles.text}>
      <div>{text}</div>
      {added && (
        <ToolTip textDom="已验证">
          <i className={`las la-check-circle ${styles.checkCircle}`} />
        </ToolTip>
      )}
      {duration && (
        <div className={styles.subText}>
          (<div className={styles.time}> {duration}</div>后自动解锁)
        </div>
      )}
    </div>
  </div>
);

const StatusIcon = ({ icon, name, added = false }) => (
  <div className={`${styles.statusIcon} ${added ? styles.added : ''}`}>
    <ToolTip textDom={(added ? '已绑定' : '未绑定') + name}>
      <div className={`${styles.iconRound} ${added ? styles.added : ''}`}>
        {icon}
      </div>
    </ToolTip>
    {added ? '已绑定' : '未绑定'}
  </div>
);

const calcPercent = (part, total) => {
  //依照比例動態宣告寬度
  if (part === 0 && total === 0) return 0;
  const totalWidth = 271 - 6;
  //width - margin-right
  return (part / total) * totalWidth;
};

const LevelItem = ({ level, type }) => (
  <div className={styles.levelItem}>
    <div className={styles.levelItemLevel}>{level}</div>
    <div className={styles.levelItemType}>{type}</div>
  </div>
);

const WalletInfoIcon = ({ icon, text, val }) => (
  <div className={styles.walletInfoIcon}>
    <div className={styles.roundIconLg}>{icon}</div>
    <div className={styles.text}>{text}</div>
    <div className={styles.val}>{Helper.number.format(val)}</div>
  </div>
);

const WalletInfoPill = ({ text }) => (
  <div className={styles.walletInfoPill}>{text}</div>
);

const WalletInfoBox = ({ icon, text, val, onClick }) => (
  <div className={styles.walletInfoBox}>
    <div className={styles.text}>
      <span className={styles.icon}>
        <i className={icon} />
      </span>
      {text}
      <span className={styles.redoIcon} onClick={onClick}>
        <i className="las la-redo-alt" />
      </span>
    </div>
    <div className={styles.val}>{val ? Helper.number.format(val) : '-'}</div>
  </div>
);

const UnbindPopup = ({ open, setOpen }) => {
  const dialogOpen = useMemo(() => open, [open]);
  const setDialogOpen = useMemo(() => setOpen, []);
  const dispatch = useDispatch();
  const [values, setValues] = useState([]);
  const tableColumns = useMemo(
    () => [
      {
        Header: '登录方式',
        accessor: 'login',
        width: 120,
      },
    ],
    []
  );
  const data = [
    { login: '手机号', refKey: 'mobile' },
    { login: '邮箱', refKey: 'email' },
    { login: 'QQ', refKey: 'qq' },
    { login: '微信', refKey: 'wechat' },
  ];

  return (
    <Dialog
      title="确认要解除绑定的登录方式"
      open={dialogOpen}
      handleClose={() => setDialogOpen(false)}
      buttonList={[
        {
          value: '解绑',
          onClick: () => {
            dispatch(editUnbindAction(values.map(el => el.refKey)));
            setDialogOpen(false);
          },
          disabled: values.length === 0,
        },
        {
          value: '取消',
          onClick: () => {
            setDialogOpen(false);
          },
          disabled: false,
        },
      ]}
    >
      <Table
        multiSelect
        columns={tableColumns}
        data={data}
        onRowClick={row => {
          console.log(row);
        }}
        onSelectedChange={selected => {
          setValues(selected);
        }}
      />
    </Dialog>
  );
};

const UnlockLoginPopup = ({
  open,
  setOpen,
  duration,
  playerID,
  merchantID,
}) => {
  const dispatch = useDispatch();
  const dialogOpen = useMemo(() => open, [open]);
  const setDialogOpen = useMemo(() => setOpen, []);
  return (
    <Dialog
      title="确认解锁帐号登录？"
      open={dialogOpen}
      handleClose={() => setDialogOpen(false)}
      buttonList={[
        {
          value: '解锁',
          onClick: () => {
            dispatch(
              editPlayerUnlockAction({
                merchantGroup,
                merchant: merchantID,
                playerIDs: [playerID],
                locked: false,
              })
            );
            setOpen(false);
          },
          disabled: false,
        },
        {
          value: '取消',
          onClick: () => {
            console.log('取消');
            setOpen(false);
          },
          disabled: false,
        },
      ]}
    >
      <div className={styles.unlockLoginPopup}>
        <span className={styles.labelFont}>自动解锁倒数时间</span>
        <span>{duration}</span>
      </div>
    </Dialog>
  );
};

const AddDownLinePopup = ({ open, setOpen, merchantID, playerID }) => {
  const dispatch = useDispatch();
  const dialogOpen = useMemo(() => open, [open]);
  const setDialogOpen = useMemo(() => setOpen, []);
  const oddsRangeRedux = useAxiosSelector2(PLAYER_API.GET_TOPLINE_ODDS_RANGE)
    ?.oddsRange;

  const oddsRange = useMemo(() => oddsRangeRedux || [], [oddsRangeRedux]);
  const [pwType, setPwType] = useState(true);
  const [newID, setNewID] = useState(null);
  const [odds, setOdds] = useState(null);
  const [password, setPassword] = useState(null);
  const [accessLimit, setAccessLimit] = useState('affiliate');
  const [submitEnable, setSubmitEnable] = useState(false);

  const clear = () => {
    setPwType(true);
    setNewID(null);
    setOdds(null);
    setPassword(null);
    setAccessLimit('affiliate');
  };
  const handleSubmit = () => {
    const params = {
      merchantGroup,
      merchant: merchantID,
      playerID: newID,
      topLine: playerID,
      playerOdds: odds,
      password,
      accessLimit,
    };
    dispatch(addNewPlayerAction(params));
  };

  useEffect(() => {
    if (open) {
      clear();
      dispatch(
        getTopLineOddsRangeAction({
          merchantGroup,
          merchant: merchantID,
          topLine: playerID,
        })
      );
    }
  }, [open]);

  useEffect(() => {
    const validate = () => {
      if (
        newID &&
        odds &&
        password &&
        odds > oddsRange[0] &&
        odds < oddsRange[1]
      ) {
        setSubmitEnable(true);
      } else {
        setSubmitEnable(false);
      }
    };
    validate();
  }, [newID, odds, password]);

  return (
    <Dialog
      title="新增下级"
      open={dialogOpen}
      handleClose={() => setDialogOpen(false)}
      buttonList={[
        {
          value: '新增',
          onClick: () => {
            handleSubmit();
            setOpen(false);
          },
          disabled: !submitEnable,
        },
        {
          value: '取消',
          onClick: () => {
            console.log('取消');
            setOpen(false);
          },
          disabled: false,
        },
      ]}
    >
      <div className={styles.AddDownLineInput}>
        <InputDetailData
          name="playerIDInput"
          size="xxl"
          textAlign="left"
          placeholder="请输入玩家帐号"
          title=""
          cusChange={v => {
            setNewID(v);
          }}
        />
      </div>
      <div className={styles.AddDownLineInput}>
        <InputDetailData
          size="xxl"
          textAlign="left"
          placeholder={
            '请输入介于' + oddsRange[0] + '至' + oddsRange[1] + '的奖金组'
          }
          title=""
          type="number"
          cusChange={v => setOdds(v)}
        />
      </div>
      <div className={styles.AddDownLineInput}>
        <InputDetailData
          size="xxl"
          textAlign="left"
          placeholder={'请输入登录密码'}
          title=""
          rightIcon={[
            'las la-eye',
            () => {
              setPwType(prev => !prev);
            },
          ]}
          type={pwType ? 'password' : 'text'}
          cusChange={v => setPassword(v)}
        />
      </div>
      <RadioBase
        title="权限"
        list={[
          { code: 'affiliate', name: '代理' },
          { code: 'player', name: '玩家' },
        ]}
        defaultValue={accessLimit}
        cusHandleChange={v => {
          setAccessLimit(v);
        }}
      />
    </Dialog>
  );
};

const MessagePop = ({ playerID, topLine, open, setOpen }) => {
  const [title, setTitle] = useState('选择发送站内信类型');
  const [sender, setSender] = useState(null);
  const [receiver, setReceiver] = useState([]);
  const [receiverType, setReceiverType] = useState(null);
  const [topic, setTopic] = useState(null);
  const [submitEnable, setSubmitEnable] = useState(false);
  const editorRef = useRef(null);
  const reset = () => {
    setTitle('选择发送站内信类型');
    setSender(null);
    setReceiver([]);
    setReceiverType(null);
    setTopic(null);
  };
  const dispatch = useDispatch();

  const downLineList = useAxiosSelector2(PLAYER_API.GET_DOWN_LINE_LIST) || [];

  const optionsTopLine = [{ title: topLine, firstLetter: topLine[0] }];
  const optionsDownLine = downLineList.map((el, idx) => ({
    title: el,
    firstLetter: /[0-9]/.test(el[0]) ? '0-9' : el[0].toUpperCase(),
  }));

  const handleSubmit = () => {
    let editorFile;
    let err;
    try {
      editorFile = editorRef.current.handleSendFile();
    } catch (e) {
      err = e;
    }

    dispatch(
      sendMessageAction({
        receiver,
        sender,
        topic,
        editor: editorFile,
      })
    );
  };

  const selectProps = receiverType => {
    if (receiverType === 1)
      return {
        options: optionsTopLine,
        value: [{ title: topLine, firstLetter: topLine[0] }],
        disabled: true,
      };
    else if (receiverType === 2)
      return {
        options: optionsDownLine,
        sortFn: (a, b) => -b.firstLetter.localeCompare(a.firstLetter),
        groupByKey: 'firstLetter',
        handleChange: v => {
          setReceiver(v);
        },
      };
    else
      return {
        disabled: true,
      };
  };

  useEffect(() => {
    if (open === true) {
      reset();
    }
  }, [open]);

  useEffect(() => {
    if (sender && receiver.length > 0 && topic) {
      setSubmitEnable(true);
    } else {
      setSubmitEnable(false);
    }
  }, [sender, receiver, topic]);

  const SelectReceivers = useMemo(
    () => (
      <SelectMulti
        {...selectProps(receiverType)}
        placeholder="收件人"
        disableCloseOnSelect
      />
    ),
    [receiverType]
  );

  return (
    <Dialog
      title={title}
      open={open}
      handleClose={() => setOpen(false)}
      buttonList={[
        {
          value: '发送',
          onClick: () => {
            handleSubmit();
            setOpen(false);
          },
          disabled: !submitEnable,
        },
        {
          value: '取消',
          onClick: () => {
            setOpen(false);
          },
          disabled: false,
        },
      ]}
    >
      <div className={styles.message}>
        {!sender && (
          <>
            <div
              className={styles.btn}
              onClick={() => {
                setSender('system');
                setReceiver([playerID]);
                setTitle('发送站内信給' + playerID);
              }}
            >
              发送给玩家
            </div>
            <div
              className={styles.btn}
              onClick={() => {
                setSender('player');
                setTitle('协助' + playerID + '发送站内信');
                dispatch(getDownLineListAction({ playerID }));
              }}
            >
              协助玩家发送
            </div>
          </>
        )}
        {sender === 'system' && (
          <div>
            <div className={styles.row}>
              <div>发件人</div>
              <div>系统</div>
            </div>
            <div className={styles.row}>
              <InputDetailData
                size="xxl"
                textAlign="left"
                placeholder="请输入主题"
                title=""
                cusChange={v => {
                  setTopic(v);
                }}
              />
            </div>
            <CKEditor ref={editorRef} />
          </div>
        )}
        {sender === 'player' && (
          <div>
            <div className={styles.row}>
              <div>发件人</div>
              <div>{playerID}</div>
            </div>
            <div className={styles.row}>
              <SelectDetailData
                placeholder="请选择收件对象"
                size="xl"
                list={[
                  { text: '直属上级', value: 1 },
                  { text: '直属下级', value: 2 },
                ]}
                cusHandleChange={v => {
                  setReceiverType(v);
                  if (v === 1) {
                    setReceiver([topLine]);
                  } else {
                    setReceiver([]);
                  }
                }}
              />
            </div>
            <div className={styles.row} key={receiverType}>
              {SelectReceivers}
            </div>
            <div className={styles.row}>
              <InputDetailData
                size="xxl"
                textAlign="left"
                placeholder="请输入主题"
                title=""
                cusChange={v => {
                  setTopic(v);
                }}
              />
            </div>
            <CKEditor ref={editorRef} />
          </div>
        )}
      </div>
    </Dialog>
  );
};

const PromotionPopup = ({ open, setOpen, children }) => {
  const dialogOpen = useMemo(() => open, [open]);
  const setDialogOpen = useMemo(() => setOpen, []);
  return (
    <Dialog
      title="发送优惠"
      open={dialogOpen}
      handleClose={() => setDialogOpen(false)}
      buttonList={[]}
    >
      {children}
    </Dialog>
  );
};

const tagArr = (arr, name) => {
  return arr.map(el => ({ name, value: el }));
};
const groupBy3 = arr => {
  let groups = [];
  let group = [];
  for (let [idx, el] of arr.entries()) {
    group.push(el);
    if (group.length === 3 || idx === arr.length - 1) {
      groups.push(group);
      group = [];
    }
  }
  return groups;
};

const ShowBirthdayCake = ({ birthday }) => {
  if (!birthday) return <></>;
  const birthdayDate = parse(birthday, 'yyyyMMdd', new Date());
  if (birthdayDate.getMonth() === new Date().getMonth())
    return (
      <img
        src={birthdayCake}
        className={styles.birthdayCake}
        alt="birthdayCake"
      />
    );
  else return <></>;
};
