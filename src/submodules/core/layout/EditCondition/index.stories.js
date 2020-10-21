import React from 'react';
import EditCondition from 'Layout/EditCondition';

export default {
  title: 'INP-EBO | 統一版型組件/EditCondition',
};

/**
 * @param {String|Options} mainInputPlaceholder 顯示提示字，預設不顯示
 * @param {String|Options} mainInputHandleChange 輸入框改變事件
 * @param {Array|Options} firstSelect 次下拉式選單，格式：['size', 'list', 'handleChange']
 * @param {Array} select 主下拉式選單，格式：['size', 'list', 'handleChange']
 * @param {Array} selectConfig 下拉式選單對應的設定檔，陣列的index對應到下拉式選單的list的index，格式：
 *        [
 *          ['buttonBase', 'size', 'list', 'defaultIndex', 'styleType']
 *          ['inputDetailData', 'size', 'textAlign', 'handleChange', 'defaultValue', 'RightIcon Config']
 *          ['span', 'unit', 'connect', 'operation', '最後一筆是否要顯示connect和operation，預設不給值=false']
 *        ]
 * @param {Array|Options} defaultValue 預設傳入值，data陣列的index對應到selectConfig的物件，格式：
 *        [select index, select value, {data: [...]}]
 * @param {Boolean} isShowDeleteAll 是否顯示此刪除整筆卡片資料之按鈕，預設為『false』
 * @param {Function} deleteAll 刪除整筆卡片資料的動作
 * @param {Boolean} isShowDragIcon 是否顯示拖曳按鈕，預設為『false』
 * @param {Integer} maxAddCount 當條件數量 < 數值，即出現後方新增按鈕
 * @param {Integer} minRemoveCount 當條件數量 > 數值，即出現前方刪除按鈕
 * @param {Array|Options} status 是否顯示狀態Radio，格式：['RadioBase', 'title', 'list', 'defaultValue', 'handleChange']
 */

const selectGroup1 = [
  { text: '单期中奖金额', value: 1 },
  { text: '单期投注金额', value: 2 },
  { text: '单期注单次数', value: 3 },
  { text: '当日总盈亏', value: 4 },
];

const buttonGroup1 = [
  { value: '大于', onClick: () => console.log('大于') },
  { value: '小于', onClick: () => console.log('小于') },
];

export const instant_alert = () => (
  <EditCondition
    mainInputPlaceholder="危险赢家"
    mainInputHandleChange={v => console.log(v)}
    select={['mdd', selectGroup1, v => console.log(v)]}
    selectConfig={[
      [
        ['buttonBase', 'sm', buttonGroup1, 1, 'style-5'],
        ['inputDetailData', 'sm', 'right', v => console.log(v)],
        ['span', '元', '， ', '和'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup1, 1, 'style-5'],
        ['inputDetailData', 'sm', 'right', v => console.log(v)],
        ['span', '元', '， ', '和'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup1, 1, 'style-5'],
        ['inputDetailData', 'sm', 'right', v => console.log(v)],
        ['span', '次', '， ', '和'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup1, 1, 'style-5'],
        ['inputDetailData', 'sm', 'right', v => console.log(v)],
        ['span', '元', '， ', '和'],
      ],
    ]}
    isShowDeleteAll={true}
    deleteAll={() => console.log('deleteAll')}
    maxAddCount={4}
    minRemoveCount={1}
    status={[
      'RadioBase',
      '状态',
      [
        { code: '1', name: '启用' },
        { code: '2', name: '暂停' },
      ],
      1,
      v => console.log(v),
    ]}
  />
);

const selectGroup2 = [
  { text: '每日', value: 1 },
  { text: '近3日', value: 2 },
  { text: '近7日', value: 3 },
  { text: '近15日', value: 4 },
  { text: '近30日', value: 5 },
];

const selectGroup3 = [
  { text: '中奖金额', value: 1 },
  { text: '投注金额', value: 2 },
  { text: '注单次数', value: 3 },
  { text: '总盈亏', value: 4 },
  { text: '盈利率', value: 5 },
  { text: '提款率', value: 6 },
];

export const daily_alert = () => (
  <EditCondition
    firstSelect={['sm', selectGroup2, v => console.log(v)]}
    select={['mdd', selectGroup3]}
    selectConfig={[
      [
        ['buttonBase', 'sm', buttonGroup1, 0, 'style-5'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '元', '， ', '和'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup1, 0, 'style-5'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '元', '， ', '和'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup1, 0, 'style-5'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '次', '， ', '和'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup1, 0, 'style-5'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '元', '， ', '和'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup1, 0, 'style-5'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '元', '， ', '和'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup1, 0, 'style-5'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '元', '， ', '和'],
      ],
    ]}
    isShowDeleteAll={true}
    deleteAll={() => console.log('deleteAll')}
    maxAddCount={6}
    minRemoveCount={1}
    status={[
      'RadioBase',
      '状态',
      [
        { code: '1', name: '启用' },
        { code: '2', name: '暂停' },
      ],
      1,
      v => console.log(v),
    ]}
  />
);

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

export const group_condition = () => (
  <EditCondition
    select={['mdd', selectGroup4]}
    selectConfig={[
      [
        ['buttonBase', 'sm', buttonGroup2, 0, 'style-9'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '天', '， ', '滿', true],
        ['inputDetailData', 'xs', 'right'],
        ['span', '元'],
        ['buttonBase', 'xs', buttonGroup5, 0, 'style-5'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup2, 0, 'style-9'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '天', '， ', '滿', true],
        ['inputDetailData', 'xs', 'right'],
        ['span', '次'],
        ['buttonBase', 'xs', buttonGroup5, 0, 'style-5'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup2, 0, 'style-9'],
        ['inputDetailData', 'sm', 'right'],
        ['span', '天', '， ', '滿', true],
        ['inputDetailData', 'xs', 'right'],
        ['span', '元'],
        ['buttonBase', 'xs', buttonGroup5, 0, 'style-5'],
      ],
      [
        ['buttonBase', 'mdd', buttonGroup3, 0, 'style-3'],
        ['space', 'md'],
        ['inputDetailData', 'xs', 'right'],
        ['span', '天'],
        ['buttonBase', 'xs', buttonGroup5, 0, 'style-5'],
      ],
      [
        ['buttonBase', 'sm', buttonGroup4, 0, 'style-9'],
        ['space', 'lg'],
        ['buttonBase', 'xs', buttonGroup5, 0, 'style-5'],
      ],
    ]}
    defaultValue={[
      [0, 1, { data: [0, 30, null, '1,000,000', null, 0] }],
      [1, 2, { data: [0, 30, null, '1,000,000', null, 0] }],
      [2, 3, { data: [1, 30, null, '1,000,000', null, 0] }],
      [3, 4, { data: [0, null, 30, null, 0] }],
      [4, 5, { data: [0, null, 0] }],
    ]}
    deleteAll={() => console.log('deleteAll')}
    isShowDragIcon={true}
    maxAddCount={5}
    minRemoveCount={1}
  />
);
