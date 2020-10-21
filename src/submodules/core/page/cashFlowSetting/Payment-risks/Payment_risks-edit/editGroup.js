import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTargetGroupPaymentRisk,
  editTargetGroupPaymentRisk,
} from 'Redux/axios/action';
import { PAYMENT_RISK as API } from 'Constants/api/api';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Helper from 'Helper';
import arrayMove from 'array-move';
import EditCondition from 'Layout/EditCondition2';
import InputDetailData from 'BaseComponent/InputDetailData';
import SelectDetailData from 'BaseComponent/SelectDetailData';
import ButtonRound from 'BaseComponent/ButtonRound';
import ButtonBase from 'BaseComponent/ButtonBase';
import styles from './index.module.scss';
const EditGroup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { merchantID } = useParams();
  // 輸入框參數
  const [param, setParam] = useImmer({
    // <對應的集團代號>
    merchantGroup: '',
    // <對應的商家代號>
    merchant: merchantID,
    // <輸入的類別名稱>
    categoryName: '',
    // <選取的更新頻率>
    updateFrequency: '',
    // <設定的群組順序與條件>
    data: [{ id: 0, index: 1 }],
    oriData: [],
    key: 1,
  });

  const [loading, setLoading] = useState(true);

  const selectGroup = [
    { text: '每日', value: '每日' },
    { text: '近3日', value: '近3日' },
    { text: '近7日', value: '近7日' },
    { text: '近15日', value: '近15日' },
    { text: '近30日', value: '近30日' },
  ];

  const { setKey: getListSetKey } = API.GET_TARGET_GROUP({});
  const apiListData = useSelector(
    state => state.axios.key?.[getListSetKey.page]?.[getListSetKey.function]
  );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex === newIndex || oldIndex === null || newIndex === null) return;
    handleChange(arrayMove(param.data, oldIndex, newIndex), 'data');
    handleChangeIndex(oldIndex, newIndex);
  };

  // 新增一筆新群組
  const addData = () => {
    const temp = [...param.data];
    temp.push({
      group: '',
      key: param.key + 1,
      index: param.data.length + 1,
      conditions: [
        {
          field: 1,
          absoluteTime: false,
          dateFrom: null,
          dateTo: null,
          days: null, //absoluteTime: false 才會有值
          amount: null, // 依 fieldID 決定有沒有值
        },
      ],
      mode: true,
    });
    handleChange(temp, 'data');
    handleChange(param.key + 1, 'key');
  };

  // 設定輸入框參數
  const handleChange = (value, name) => {
    if (param[name] !== value)
      setParam(draftState => {
        draftState[name] = value;
      });
  };

  // 拖曳事件 交換排名
  const handleChangeIndex = (oldIndex, newIndex) => {
    setParam(draftState => {
      const tempIndex = draftState.data[oldIndex].index;
      draftState.data[oldIndex].index = draftState.data[newIndex].index;
      draftState.data[newIndex].index = tempIndex;
    });
  };

  useEffect(() => {
    const fetch_group_data = () => {
      dispatch(getTargetGroupPaymentRisk(param));
    };
    // 取得目標群組條件設定資料
    fetch_group_data();
  }, [dispatch, merchantID]);

  useEffect(() => {
    const processData = () => {
      setLoading(true);
      const { data, categoryName, updateFrequency } = apiListData;
      handleChange(
        data.slice().sort((a, b) => a.index - b.index),
        'data'
      );
      handleChange(
        data.slice().sort((a, b) => a.index - b.index),
        'oriData'
      );
      handleChange(data.length, 'key');
      handleChange(categoryName, 'categoryName');
      handleChange(updateFrequency, 'updateFrequency');
      setLoading(false);
    };
    if (apiListData) processData();
  }, [apiListData]);

  return !loading ? (
    <div className={styles.fullContent}>
      <div className={styles.rowWrap2}>
        <div className={styles.row}>
          <div className={styles.title}>群组名称</div>
          <InputDetailData
            title=""
            placeholder="请输入群组名称"
            defaultValue={param.categoryName}
            size="xl"
            cusChange={v => handleChange(v, 'categoryName')}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.title}>更新频率</div>
          <SelectDetailData
            title=""
            defaultValue={param.updateFrequency}
            defaultText={param.updateFrequency}
            size="lgg"
            list={selectGroup}
            cusHandleChange={v => handleChange(v, 'updateFrequency')}
          />
        </div>
      </div>
      <div className={styles.body2}>
        <SortableList
          param={param.data}
          oriParam={param.oriData}
          setParam={setParam}
          onSortEnd={onSortEnd}
          shouldCancelStart={e =>
            e.target.className.indexOf('EditCondition2_drag') === -1
              ? true
              : false
          }
        />
        <div className={styles.wrapper}>
          <i className={`las la-star-of-david ${styles.icon} ${styles.star}`} />
          <InputDetailData title="" defaultValue="" />
          <i
            className={`las la-exclamation-circle ${styles.icon} ${styles.exclamation}`}
          ></i>
          <span className={styles.warningText}>
            不属于以上条件的玩家将分类于此
          </span>
        </div>
      </div>
      <div className={styles.footer}>
        <ButtonBase
          list={[
            {
              value: '保存',
              onClick: () => dispatch(editTargetGroupPaymentRisk(param)),
              disabled: Helper.data.objectCompare(
                {
                  categoryName: param.categoryName,
                  updateFrequency: param.updateFrequency,
                  data: param.data,
                },
                {
                  ...apiListData,
                  data: param.oriData,
                },
                'key'
              ),
            },
          ]}
          size={'lg'}
          styleType={'style-3'}
        />
        <ButtonBase
          list={[
            {
              value: '返回列表',
              onClick: () =>
                history.push({
                  pathname: window.location.pathname.split('/edit')[0],
                }),
            },
          ]}
          size={'lg'}
          styleType={'style-7'}
        />
      </div>
      <div
        className={`${styles.buttonAdd} ${
          param.data.length >= 20 ? styles.hidden : null
        }`}
      >
        <ButtonRound
          buttonText="新增"
          buttonIcon={<i className={'las la-plus'} />}
          styleType="style-2"
          cusClick={() => addData()}
        />
      </div>
    </div>
  ) : null;
};
const SortableList = SortableContainer(({ param, oriParam, setParam }) => {
  return (
    <div>
      {param.map((item, idx) => (
        <SortableItem
          key={item.key}
          index={idx}
          item={item}
          param={param}
          setParam={setParam}
          idx={idx}
          len={param.length}
          isHighlight={
            !Helper.data.objectCompare(param[idx], oriParam[idx], 'key')
          }
        />
      ))}
    </div>
  );
});

const SortableItem = SortableElement(
  ({ item, setParam, idx, len, isHighlight = false }) => {
    const [key, setKey] = useState(0);

    const buttonGroup = [{ value: '相对' }, { value: '绝对' }];

    const buttonGroup1 = [{ value: '相对' }];

    const buttonGroup2 = [{ value: '是' }, { value: '否' }];

    const buttonGroup3 = [
      {
        value: '和',
        onClick: () => {
          setParam(draftState => {
            draftState.data[idx].mode = true;
          });
          setKey(key + 1);
        },
      },
      {
        value: '或',
        onClick: () => {
          setParam(draftState => {
            draftState.data[idx].mode = false;
          });
          setKey(key + 1);
        },
      },
    ];

    const rowGroup = value => {
      switch (value) {
        case 1:
        case 2:
        case 3:
          return [
            {
              component: 'buttonBase',
              id: 'buttonBase1',
              size: 'sm',
              group: buttonGroup,
              defaultValue: '0',
              style: 'style-9',
            },
            item.conditions.find(s => s.field === value)?.absoluteTime
              ? {
                  component: 'inputDetailData',
                  id: 'inputDetailData1',
                  defaultValue: '',
                  size: 'sm',
                  textAlign: 'left',
                  rightIcon: ['las la-calendar-alt', () => null],
                }
              : {
                  component: 'inputDetailData',
                  id: 'inputDetailData1',
                  defaultValue: '',
                  size: 'sm',
                  textAlign: 'right',
                },
            {
              component: 'span',
              id: 'span1',
              style: 'normal',
              text: '天， 滿',
            },
            {
              component: 'inputDetailData',
              id: 'inputDetailData2',
              defaultValue: '',
              size: 'smm',
              textAlign: 'right',
            },
            {
              component: 'span',
              id: 'span1',
              style: 'normal',
              text: '元',
            },
            {
              component: 'buttonBase',
              id: 'buttonBase2',
              size: 'xs',
              group: buttonGroup3,
              defaultValue: item.mode ? 0 : 1,
              style: 'style-5',
            },
          ];
        case 4:
          return [
            {
              component: 'buttonBase',
              id: 'buttonBase1',
              size: 'mdd',
              group: buttonGroup1,
              defaultValue: '0',
              style: 'style-3',
            },
            {
              component: 'space',
              size: 'md',
            },
            {
              component: 'inputDetailData',
              id: 'inputDetailData2',
              defaultValue: '',
              size: 'smm',
              textAlign: 'right',
            },
            {
              component: 'span',
              style: 'normal',
              text: '天',
            },
            {
              component: 'buttonBase',
              id: 'buttonBase2',
              size: 'xs',
              group: buttonGroup3,
              defaultValue: item.mode ? 0 : 1,
              style: 'style-5',
            },
          ];
        case 5:
          return [
            {
              component: 'buttonBase',
              id: 'buttonBase1',
              size: 'sm',
              group: buttonGroup2,
              defaultValue: '0',
              style: 'style-9',
            },
            {
              component: 'space',
              size: 'lg',
            },
            {
              component: 'buttonBase',
              id: 'buttonBase2',
              size: 'xs',
              group: buttonGroup3,
              defaultValue: item.mode ? 0 : 1,
              style: 'style-5',
            },
          ];
        default:
          break;
      }
    };
    const selectGroup2 = [
      {
        text: '存款总额',
        value: 1,
        row: rowGroup(1),
      },
      {
        text: '存款次数',
        value: 2,
        row: rowGroup(2),
      },
      {
        text: '总投注额',
        value: 3,
        row: rowGroup(3),
      },
      {
        text: '注册日期',
        value: 4,
        row: rowGroup(4),
      },
      {
        text: '代理玩家',
        value: 5,
        row: rowGroup(5),
      },
    ];

    const defaultValue = [];

    // 設定預設值
    item.conditions
      ? item.conditions.map(data => {
          let selectIdx = null;
          selectGroup2.find((s, idx) => {
            selectIdx = s.value === data.field ? idx : null;
            return s.value === data.field;
          });

          if (selectIdx !== null) {
            switch (selectIdx) {
              case 0:
              case 1:
              case 2:
                defaultValue.push({
                  selectedValue: data.field,
                  buttonBase1: data.absoluteTime ? 1 : 0,
                  inputDetailData1: data.absoluteTime
                    ? `${data.dateFrom} ~ ${data.dateTo}`
                    : data.days,
                  inputDetailData2: data.amount,
                  buttonBase2: item.mode ? 0 : 1,
                });

                break;
              case 3:
                defaultValue.push({
                  selectedValue: data.field,
                  inputDetailData2: data.days,
                  buttonBase2: item.mode ? 0 : 1,
                });

                break;
              case 4:
                defaultValue.push({
                  selectedValue: data.field,
                  buttonBase1: data.isProxyPlayer ? 0 : 1,
                  buttonBase2: item.mode ? 0 : 1,
                });

                break;
              default:
                break;
            }
          }
        })
      : console.log();

    // Input 輸入框
    const handleInput = param => {
      const result = param.map(item => {
        switch (item.selectedValue) {
          case 1:
          case 2:
          case 3:
            return {
              field: item.selectedValue,
              absoluteTime: `${item.buttonBase1}` === '1' ? true : false,
              dateFrom:
                `${item.buttonBase1}` === '1'
                  ? item.inputDetailData1
                    ? item.inputDetailData1.split('~')[0].trim()
                    : null
                  : null,
              dateTo:
                `${item.buttonBase1}` === '1'
                  ? item.inputDetailData1
                    ? item.inputDetailData1.split('~')[1].trim()
                    : null
                  : null,
              days:
                `${item.buttonBase1}` === '1' ? null : item.inputDetailData1,
              amount: item.inputDetailData2,
            };
          case 4:
            return {
              field: item.selectedValue,
              days: item.inputDetailData2,
            };
          case 5:
            return {
              field: item.selectedValue,
              isProxyPlayer: `${item.buttonBase1}` === '0' ? true : false,
            };
          default:
            return null;
        }
      });
      setParam(draftState => {
        draftState.data[idx].conditions = result;
      });
    };

    // 刪除一筆群組
    const deleteAll = () => {
      setParam(draftState => {
        draftState.data = [
          ...draftState.data.slice(0, idx),
          ...draftState.data.slice(idx + 1),
        ];
        draftState.data.map((item, idx) => {
          item.key = draftState.key + 1;
          item.index = idx + 1;
          draftState.key = draftState.key + 1;
        });
      });
    };

    return (
      <div className={styles.row}>
        <span className={styles.number}>{idx + 1}</span>
        <EditCondition
          key={key}
          tabIndex={0}
          mainInputDefaultValue={item.group}
          mainInputHandleChange={v =>
            setParam(draftState => {
              draftState.data[idx].group = v;
            })
          }
          select={{
            size: 'sm',
            config: selectGroup2,
          }}
          defaultValue={defaultValue}
          getValues={v => handleInput(v)}
          isShowDeleteAll={len >= 2}
          deleteAll={() => deleteAll()}
          isShowDragIcon={true}
          maxAddCount={5}
          minRemoveCount={1}
          highlight={isHighlight}
        />
      </div>
    );
  }
);
export default EditGroup;
