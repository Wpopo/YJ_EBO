import React, { useState } from 'react';
import EditCondition from 'Layout/EditCondition2';
import { Provider } from 'react-redux';
import store from 'Redux/store';

export default {
  title: 'INP-EBO | 統一版型組件/EditCondition2',
};

/**
 * @param {String|Optional} mainInputPlaceholder 顯示提示字，預設不顯示
 * @param {String|Optional} mainInputHandleChange 輸入框改變事件
 * @param {Array|Optional} firstSelect 格式 ex.{ size: 'sm', list: selectGroup2, defaultValue: 1 }
 * @param {Array|Required} select 主下拉式選單，格式：{'size', 'config'}
 * config:[{
              text: '单期中奖金额',
              value: 1,
              row: [{
                    component: 'buttonBase',
                    id: 'buttonBase',
                    size: 'sm',
                    group: buttonGroup1,
                    defaultValue: '0',
                    style: 'style-5',
                  },{...}],
          }]
 *  
 * @param {Array|Required} defaultValue 預設傳入值 必填以顯示第一行 以config設定的id為key值唯一對應 格式[
          { selectedValue: 2, buttonBase: 0, inputDetailData: 'default22' },
          { selectedValue: 3, buttonBase: 1, inputDetailData: 'default33' },{...}
        ]
 * @param {Function|Required} getValues 取得最新的values, 格式同defaultValue
 * @param {Boolean|Optional} isShowDeleteAll 是否顯示此刪除整筆卡片資料之按鈕，預設為『false』
 * @param {Function|Optional} deleteAll 刪除整筆卡片資料的動作
 * @param {Boolean|Optional} isShowDragIcon 是否顯示拖曳按鈕，預設為『false』
 * @param {Integer|Required} maxAddCount 當條件數量 < 數值，即出現後方新增按鈕
 * @param {Integer|Required} minRemoveCount 當條件數量 > 數值，即出現前方刪除按鈕
 * @param {String|Options} status 顯示狀態Radio，數值'1' or '2'
 * @param {Boolean} highlight 是否顯示highlight樣式
 */

const buttonGroup1 = [
  { value: '大于', onClick: () => console.log('大于') },
  { value: '小于', onClick: () => console.log('小于') },
];

const row = value => [
  {
    component: 'buttonBase',
    id: 'buttonBase',
    size: 'sm',
    group: buttonGroup1,
    defaultValue: '0',
    style: 'style-5',
  },
  {
    component: 'inputDetailData',
    id: 'inputDetailData',
    defaultValue: 'default' + value,
    size: 'sm',
    textAlign: 'right',
    style: 'style-5',
    rightIcon: '',
  },
  {
    component: 'span',
    id: 'span1',
    style: 'normal',
    text: '元',
  },
  {
    component: 'span',
    id: 'span1',
    style: 'normal',
    text: '， ',
    hideLastRow: true,
  },
  {
    component: 'span',
    id: 'span2',
    style: 'focus',
    text: '和',
    hideLastRow: true,
  },
];

export const Instant_alert = () => {
  const [result, setResult] = useState([]);
  const [mainInputDefaultValue, setMainInputDefaultValue] = useState(
    '危险赢家'
  );
  return (
    <Provider store={store}>
      <div>
        <EditCondition
          mainInputDefaultValue={mainInputDefaultValue}
          mainInputPlaceholder="危险赢家"
          mainInputHandleChange={v => setMainInputDefaultValue(v)}
          select={{
            size: 'mdd',
            config: [
              {
                text: '单期中奖金额',
                value: 1,
                row: row(1),
              },
              {
                text: '单期投注金额',
                value: 2,
                row: row(2),
              },
              {
                text: '单期注单次数',
                value: 3,
                row: row(3),
              },
              {
                text: '当日总盈亏',
                value: 4,
                row: row(4),
              },
            ],
          }}
          defaultValue={[
            {
              selectedValue: 2,
              buttonBase: 0,
              inputDetailData: 'default22',
            },
            { selectedValue: 3, buttonBase: 1, inputDetailData: 'default33' },
          ]}
          getValues={v => {
            setResult(v);
          }}
          //selectedValue對應到select的選項
          //key值對應到select.config中的id值
          isShowDeleteAll={true}
          deleteAll={() => console.log('deleteAll')}
          maxAddCount={4}
          minRemoveCount={1}
          status={'1'}
          statusChange={v => console.log('statusChange', v)}
        />
        <div>
          mainInputDefaultValue:{mainInputDefaultValue}
          <ul>
            {result.map((row, index) => (
              <>
                <li style={{ color: 'green', listStyleType: 'none' }}>
                  row-{index}
                </li>
                {Object.keys(row).map((key, idx) => (
                  <li key={idx}>
                    {key}:{row[key]}
                  </li>
                ))}
              </>
            ))}
          </ul>
        </div>
      </div>
    </Provider>
  );
};

export const Daily_alert = () => {
  const [result, setResult] = useState([]);

  return (
    <Provider store={store}>
      <div>
        <EditCondition
          mainInputPlaceholder="危险赢家"
          mainInputHandleChange={v => console.log(v)}
          firstSelect={{ size: 'sm', list: selectGroup2, defaultValue: 1 }}
          select={{
            size: 'mdd',
            config: [
              {
                text: '中奖金额',
                value: 1,
                row: rowDaily(1),
              },
              {
                text: '投注金额',
                value: 2,
                row: rowDaily(2),
              },
              {
                text: '注单次数',
                value: 3,
                row: rowDaily(3),
              },
              {
                text: '总盈亏',
                value: 4,
                row: rowDaily(4),
              },
              {
                text: '盈利率',
                value: 5,
                row: rowDaily(5),
              },
              {
                text: '提款率',
                value: 6,
                row: rowDaily(6),
              },
            ],
          }}
          defaultValue={[
            {
              selectedValue: 2,
              buttonBase: 0,
              inputDetailData: 'default22',
              firstSelect: 2,
            },
            {
              selectedValue: 3,
              buttonBase: 1,
              inputDetailData: 'default33',
              firstSelect: 3,
            },
          ]}
          getValues={v => {
            setResult(v);
          }}
          //selectedValue對應到select的選項
          //key值對應到select.config中的id值
          isShowDeleteAll={true}
          deleteAll={() => console.log('deleteAll')}
          maxAddCount={6}
          minRemoveCount={1}
          status={'2'}
          statusChange={v => console.log(v)}
        />
        <div>
          <ul>
            {result.map((row, index) => (
              <>
                <li style={{ color: 'green', listStyleType: 'none' }}>
                  row-{index}
                </li>
                {Object.keys(row).map((key, idx) => (
                  <li key={idx}>
                    {key}:{row[key]}
                  </li>
                ))}
              </>
            ))}
          </ul>
        </div>
      </div>
    </Provider>
  );
};

const rowDaily = value => [
  {
    component: 'buttonBase',
    id: 'buttonBase',
    size: 'sm',
    group: buttonGroup1,
    defaultValue: '0',
    style: 'style-5',
  },
  {
    component: 'inputDetailData',
    id: 'inputDetailData',
    defaultValue: 'default' + value,
    size: 'sm',
    textAlign: 'right',
    style: 'style-5',
    rightIcon: '',
  },
  {
    component: 'span',
    id: 'span1',
    style: 'normal',
    text: '元',
  },
  {
    component: 'span',
    id: 'span1',
    style: 'normal',
    text: '， ',
    hideLastRow: true,
  },
  {
    component: 'span',
    id: 'span2',
    style: 'focus',
    text: '和',
    hideLastRow: true,
  },
];

const selectGroup2 = [
  { text: '每日', value: 1 },
  { text: '近3日', value: 2 },
  { text: '近7日', value: 3 },
  { text: '近15日', value: 4 },
  { text: '近30日', value: 5 },
];

const selectGroup4 = [
  { text: '存款总额', value: 1 },
  { text: '存款次数', value: 2 },
  { text: '总投注额', value: 3 },
  { text: '注册日期', value: 4 },
  { text: '代理玩家', value: 5 },
];

const buttonGroup2 = [
  { value: '相对', onClick: () => console.log('相对') },
  { value: '绝对', onClick: () => console.log('绝对') },
];

const buttonGroup3 = [{ value: '相对', onClick: () => console.log('相对') }];

const buttonGroup4 = [
  { value: '是', onClick: () => console.log('是') },
  { value: '否', onClick: () => console.log('否') },
];

const buttonGroup5 = [
  { value: '和', onClick: () => console.log('和') },
  { value: '或', onClick: () => console.log('或') },
];

export const Group_condition = () => {
  const [result, setResult] = useState([]);

  return (
    <Provider store={store}>
      <div>
        <EditCondition
          mainInputHandleChange={v => console.log(v)}
          select={{
            size: 'mdd',
            config: [
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
            ],
          }}
          defaultValue={[
            {
              selectedValue: 2,
              buttonBase1: 0,
              inputDetailData1: 'default22',
              firstSelect: 2,
            },
            {
              selectedValue: 3,
              buttonBase1: 1,
              inputDetailData1: 'default33',
              firstSelect: 3,
              buttonBase2: 1,
            },
          ]}
          getValues={v => {
            setResult(v);
          }}
          //selectedValue對應到select的選項
          //key值對應到select.config中的id值
          deleteAll={() => console.log('deleteAll')}
          isShowDragIcon={true}
          maxAddCount={5}
          minRemoveCount={1}
          isShowDeleteAll={true}
        />
        <div>
          <ul>
            {result.map((row, index) => (
              <>
                <li style={{ color: 'green', listStyleType: 'none' }}>
                  row-{index}
                </li>
                {Object.keys(row).map((key, idx) => (
                  <li key={idx}>
                    {key}:{row[key]}
                  </li>
                ))}
              </>
            ))}
          </ul>
        </div>
      </div>
    </Provider>
  );
};

const rowGroup = value => {
  switch (value) {
    case 1:
    case 3:
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
          component: 'inputDetailData',
          id: 'inputDetailData1',
          defaultValue: 'default' + value,
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
          defaultValue: '22' + value,
          size: 'xs',
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
          group: buttonGroup5,
          defaultValue: '0',
          style: 'style-5',
        },
      ];
    case 2:
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
          component: 'inputDetailData',
          id: 'inputDetailData1',
          defaultValue: 'default' + value,
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
          defaultValue: '22' + value,
          size: 'xs',
          textAlign: 'right',
        },
        {
          component: 'span',
          id: 'span1',
          style: 'normal',
          text: '次',
        },
        {
          component: 'buttonBase',
          id: 'buttonBase2',
          size: 'xs',
          group: buttonGroup5,
          defaultValue: '0',
          style: 'style-5',
        },
      ];
    case 4:
      return [
        {
          component: 'buttonBase',
          id: 'buttonBase1',
          size: 'mdd',
          group: buttonGroup3,
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
          defaultValue: '22' + value,
          size: 'xs',
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
          group: buttonGroup5,
          defaultValue: '0',
          style: 'style-5',
        },
      ];
    case 5:
      return [
        {
          component: 'buttonBase',
          id: 'buttonBase1',
          size: 'sm',
          group: buttonGroup4,
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
          group: buttonGroup5,
          defaultValue: '0',
          style: 'style-5',
        },
      ];
    default:
      break;
  }
};
