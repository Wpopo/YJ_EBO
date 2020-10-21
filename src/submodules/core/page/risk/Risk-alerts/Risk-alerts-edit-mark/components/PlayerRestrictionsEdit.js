import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory, Prompt } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { PLAYER_RESTRICTIONS as API_PLAYER_RESTRICTIONS } from 'Constants/api/api';
import useAlertDialog from 'Hooks/useAlertDialog';
import useAxiosSelector2 from 'Hooks/useAxiosSelector2';

import Dialog from 'Layout/Dialog';
import SwitchBase from 'BaseComponent/SwitchBase';
import InputGroupFee from 'BaseComponent/InputGroupFee';
import CheckboxBase from 'BaseComponent/CheckboxBase';
import {
  savePlayerAlertDataAction,
  getPlayerAlertsDetailAction,
  getPlayerAlertsLogAction,
  savePlayerRestricDetailAction,
} from 'Redux/axios/action';
import FooterButton from './FooterButton';

import styles from './PlayerRestrictionsEdit.module.scss';

const PlayerRestrictionsEdit = () => {
  //hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlertDialog();

  let { merchantID, playerID } = useParams();
  playerID = playerID ? playerID : history.location.state.playerID;
  const pathname = `/merchants/${merchantID}/player-restrictions/edit/${playerID}`;

  //redux
  const playerAlertsDetail = useAxiosSelector2(
    API_PLAYER_RESTRICTIONS.GET_PLAYER_ALERTS_DETAIL
  );
  const OwnProductDetail = useAxiosSelector2(
    API_PLAYER_RESTRICTIONS.GET_PLAYER_ALERTS_PRODUCT
  );
  const playerLog = useAxiosSelector2(
    API_PLAYER_RESTRICTIONS.GET_PLAYER_ALERTS_LOG
  );
  //UI State-玩家限制
  const [currentProduct, setCurrentProduct] = useState('iNumLottery');
  const [playerRestrictStatus, setPlayerRestrictStatus] = useState('');

  //UI State - Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogButtonList, setDialogButtonList] = useImmer([]);
  const [dialogContent, setDialogContent] = useImmer({
    title: '',
    content: '',
  });

  //local state-玩家限制
  const [playerCheckBox, setPlayerCheckbox] = useImmer({
    可疑玩家: false,
    禁止登录: false,
    禁止优惠: false,
    禁止充值: false,
    禁止提款: false,
  });

  const [ownProduct, setOwnProduct] = useImmer({
    iNumLottery: {},
    redPocket: {},
  });
  const [tmpOwnProduct, setTmpOwnProduct] = useImmer(null);
  const [extProduct, setExtProduct] = useImmer({});
  const [openLog, setOpenLog] = useState(false);

  //functions-玩家限制
  const productAPopup = (product, productKey) => {
    let count = 0;
    Object.keys(product).forEach(key => {
      if (product[key]) count++;
    });
    const selectAll = count === Object.keys(product).length;
    const handleSelectAll = checked => {
      setTmpOwnProduct(draftState => {
        Object.keys(draftState[productKey]).forEach(key => {
          draftState[productKey][key] = checked;
        });
      });
    };
    return (
      <div className={styles.productPopup}>
        <div className={styles.itemWrap}>
          <div className={styles.productPopupItem}>
            <CheckboxBase
              checkboxName="全選"
              checkboxChange={e => {
                handleSelectAll(e.target.checked);
              }}
              checkboxChecked={selectAll}
              text="全選"
            />
          </div>
          {Object.keys(product).map((key, idx) => {
            return (
              <div className={styles.productPopupItem} key={key + idx}>
                <CheckboxBase
                  checkboxName={key}
                  checkboxChange={e => {
                    const checked = e.target.checked;
                    setTmpOwnProduct(draftState => {
                      draftState[productKey][key] = checked;
                    });
                  }}
                  checkboxChecked={tmpOwnProduct[productKey][key]}
                  text={key}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (history.location.pathname !== pathname) {
      history.push({ pathname }, { playerID });
    }
  }, []);

  useEffect(() => {
    //偵測到投注限制被更動/複製
    if (currentProduct && tmpOwnProduct) {
      if (tmpOwnProduct[currentProduct]) {
        setDialogContent(prevState => {
          prevState.content = productAPopup(
            tmpOwnProduct[currentProduct],
            currentProduct
          );
        });
        //取得最新的tmpOwnProduct值
        setDialogButtonList(() => [
          {
            value: '确认',
            onClick: () => {
              setOwnProduct(() => JSON.parse(JSON.stringify(tmpOwnProduct)));
              setOpenDialog(false);
            },
          },
        ]);
      }
    }
  }, [tmpOwnProduct, currentProduct]);
  useEffect(() => {
    //玩家限制 API10-1, API10-3
    const param = {
      merchantGroup: '',
      merchant: merchantID,
      playerID: playerID,
    };
    dispatch(getPlayerAlertsDetailAction(param));
  }, []);

  useEffect(() => {
    //玩家限制 API10-1更新 UI
    playerAlertsDetail &&
      setPlayerCheckbox(() => playerAlertsDetail.restrictions);
    playerAlertsDetail && setExtProduct(() => playerAlertsDetail.extProduct);
  }, [playerAlertsDetail]);

  useEffect(() => {
    //玩家限制 API10-3更新 UI
    OwnProductDetail &&
      setOwnProduct(draftState => {
        draftState[OwnProductDetail.productID] = OwnProductDetail.detail;
      });
  }, [OwnProductDetail]);

  useEffect(() => {
    playerAlertsDetail &&
      ownProduct.iNumLottery &&
      ownProduct.redPocket &&
      playerStatusCheck(
        playerAlertsDetail,
        ownProduct,
        setPlayerRestrictStatus
      );
  }, [OwnProductDetail, playerAlertsDetail]);

  useEffect(() => {
    if (playerLog && openLog) {
      alert('风控状态历程', playerLog);
    }
  }, [playerLog]);

  return (
    <>
      <div className={styles.root}>
        <PlayerRestriction
          playerRestrictStatus={playerRestrictStatus}
          merchantID={merchantID}
          playerID={playerID}
          setOpenLog={setOpenLog}
          playerCheckBox={playerCheckBox}
          setPlayerCheckbox={setPlayerCheckbox}
        />
        <BetRestriction
          ownProduct={ownProduct}
          setOwnProduct={setOwnProduct}
          setTmpOwnProduct={setTmpOwnProduct}
          setCurrentProduct={setCurrentProduct}
          setDialogContent={setDialogContent}
          setOpenDialog={setOpenDialog}
          extProduct={extProduct}
          setExtProduct={setExtProduct}
        />
        <FooterButton
          onSave={() => {
            const param = {
              merchantGroup: '',
              merchant: merchantID,
              playerID: playerID,
              suspicious: playerCheckBox['可疑玩家'],
              login: playerCheckBox['禁止登录'],
              campaign: playerCheckBox['禁止优惠'],
              deposit: playerCheckBox['禁止充值'],
              withdraws: playerCheckBox['禁止提款'],
              iNumLottery: handleOwnProduct(ownProduct['iNumLottery']),
              redPocket: handleOwnProduct(ownProduct['redPocket']),
              ag: extProduct['AG真人'],
              vr: extProduct['VR真人'],
              mg: extProduct['电子游艺'],
              imSport: extProduct['IM体育'],
              agshaba: extProduct['沙巴体育'],
              imChess: extProduct['IM棋牌'],
              lyChess: extProduct['乐游棋牌'],
              iNumLotteryDetail: ownProduct['iNumLottery'],
              redPocketDetail: ownProduct['redPocket'],
            };
            alert('确认保存警报条件？', '保存后将于下期结算生效。').then(() => {
              dispatch(savePlayerAlertDataAction(param));
            });
          }}
          onBack={() => {
            history.push({
              pathname: `/merchants/${merchantID}/player-restrictions`,
            });
          }}
        />
        <Dialog
          title={dialogContent.title}
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          buttonList={dialogButtonList}
        >
          {dialogContent.content}
        </Dialog>
      </div>
    </>
  );
};
export default PlayerRestrictionsEdit;

const PlayerRestriction = ({
  playerRestrictStatus,
  merchantID,
  playerID,
  setOpenLog,
  playerCheckBox,
  setPlayerCheckbox,
}) => {
  const dispatch = useDispatch();
  const handlePlayerCheckBoxChange = (v, key) => {
    setPlayerCheckbox(draftState => {
      draftState[key] = v;
    });
  };
  return (
    <>
      <div className={styles.title}>玩家限制</div>
      <div className={styles.flexWrap}>
        <div className={styles.restrict_item}>
          <InputGroupFee
            key={playerRestrictStatus}
            title="状态"
            defaultValue={playerRestrictStatus}
            inputDisable={true}
            hasButton
            buttonContent={<i className={`las la-history la-lg`} />}
            cusClick={e => {
              const param = {
                merchantGroup: '',
                merchant: merchantID,
                playerID: playerID,
              };
              setOpenLog(true);
              dispatch(getPlayerAlertsLogAction(param));
            }}
          />
        </div>
        {Object.keys(playerCheckBox).map(key => {
          return (
            <div className={styles.restrict_item} key={key}>
              <SwitchBase
                title={key}
                switchName={key}
                checked={playerCheckBox[key]}
                switchChange={e =>
                  handlePlayerCheckBoxChange(e.target.checked, key)
                }
                hasIcon={false}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const BetRestriction = ({
  setOwnProduct,
  ownProduct,
  setTmpOwnProduct,
  setCurrentProduct,
  setDialogContent,
  setOpenDialog,
  extProduct,
  setExtProduct,
}) => {
  const handleOwnProductChangeAll = (key, checked) => {
    setOwnProduct(draftState => {
      Object.keys(draftState[key]).forEach(
        key2 => (draftState[key][key2] = checked)
      );
    });
  };
  const OwnProductText = product => {
    let active = 0;
    Object.keys(product).forEach(key => {
      if (product[key]) active++;
    });
    return active + '/' + Object.keys(product).length + '款游戏';
  };
  const handleExtProductChange = (v, key) => {
    setExtProduct(draftState => {
      draftState[key] = v;
    });
  };

  return (
    <div className={styles.player_restriction}>
      <div className={styles.title}>投注限制</div>
      <div className={styles.flexWrap}>
        <div className={styles.restrict_item}>
          <SwitchBase
            title="爱码彩票"
            switchName="爱码彩票"
            checked={handleOwnProduct(ownProduct.iNumLottery)}
            switchChange={e => {
              handleOwnProductChangeAll('iNumLottery', e.target.checked);
            }}
            text={OwnProductText(ownProduct.iNumLottery)}
            hasIcon={true}
            iconClicked={() => {
              //copy product state to tmp state
              setTmpOwnProduct(draftState => {
                return JSON.parse(JSON.stringify(ownProduct));
              });
              setCurrentProduct('iNumLottery');
              setDialogContent(prevState => {
                prevState.title = '爱码彩票';
              });
              setOpenDialog(true);
            }}
          />
        </div>
        <div className={styles.restrict_item}>
          <SwitchBase
            title="红包游戏"
            switchName="红包游戏"
            checked={handleOwnProduct(ownProduct.redPocket)}
            switchChange={e => {
              handleOwnProductChangeAll('redPocket', e.target.checked);
            }}
            text={OwnProductText(ownProduct.redPocket)}
            hasIcon={true}
            iconClicked={() => {
              //copy product state to tmp state
              setTmpOwnProduct(draftState => {
                return JSON.parse(JSON.stringify(ownProduct));
              });
              setCurrentProduct('redPocket');
              setDialogContent(prevState => {
                prevState.title = '红包游戏';
              });
              setOpenDialog(true);
            }}
          />
        </div>
        {extProduct &&
          Object.keys(extProduct).map((key, idx) => {
            return (
              <div className={styles.restrict_item} key={key + idx}>
                <SwitchBase
                  title={key}
                  switchName={key}
                  checked={extProduct[key]}
                  switchChange={e =>
                    handleExtProductChange(e.target.checked, key)
                  }
                  hasIcon={false}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const handleOwnProduct = product => {
  let count = 0;
  Object.keys(product).forEach(key => {
    if (product[key]) count++;
  });
  if (count === 0) return false;
  if (count > 0) return true;
};

const playerStatusCheck = (
  playerAlertsDetail,
  ownProduct,
  setPlayerRestrictStatus
) => {
  //判斷玩家限制狀態
  let setRestrict = false;
  let setSuspicious = false;
  let checked = false;
  if (playerAlertsDetail.extProduct && playerAlertsDetail.restrictions) {
    checked = true;
    Object.keys(playerAlertsDetail.restrictions).forEach(key => {
      if (key !== '可疑玩家')
        if (playerAlertsDetail.restrictions[key]) {
          setRestrict = true;
        }
    });
    if (!setRestrict) {
      Object.keys(playerAlertsDetail.extProduct).forEach(product => {
        if (playerAlertsDetail.extProduct[product]) {
          setRestrict = true;
        }
      });
    }
    if (ownProduct && !setRestrict) {
      Object.keys(ownProduct.iNumLottery).forEach(product => {
        if (ownProduct.iNumLottery[product]) {
          setRestrict = true;
        }
      });
      if (!setRestrict) {
        Object.keys(ownProduct.redPocket).forEach(product => {
          if (ownProduct.redPocket[product]) {
            setRestrict = true;
          }
        });
      }
    }
  }
  if (playerAlertsDetail.restrictions && !setRestrict) {
    if (playerAlertsDetail.restrictions['可疑玩家']) setSuspicious = true;
  }
  if (setRestrict) setPlayerRestrictStatus('限制');
  else if (setSuspicious) setPlayerRestrictStatus('可疑');
  else if (checked) setPlayerRestrictStatus('正常');
};
