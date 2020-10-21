import React, { useMemo, useState } from 'react';
import store from 'Redux/store';
import { Provider } from 'react-redux';
import Notification, { notify } from 'Layout/Notification';
import _ from 'lodash';

import Table from 'Layout/Table2';
import SpanStatus from 'BaseComponent/SpanStatus';
import ButtonOperation from 'BaseComponent/ButtonOperation';
import SwitchBase from 'BaseComponent/SwitchBase';

import styles from './stories.module.scss';

export default {
  title: 'INP-EBO | 統一版型組件/Table2',
};
/**
 * @param {Object} columns
 * @param {Object} data
 * @param {string} size 表格顯示大小，預設md (md,sm)
 * @param {Boolean} multiSelect
 * @param {Boolean} stickyHeader
 * @param {Function} onRowClick
 * @param {Function} onSelectedChange
 */

const statusStyleMap = {
  正常: 'style-1',
  隐藏: 'style-4',
};

export const table2 = () => {
  const [check, setCheck] = useState(false);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [selectItems, setSelectItems] = useState([]);

  const tableColumns = useMemo(
    () => [
      { Header: '游戏编号', accessor: 'id', width: 128, sticky: 'left' },
      { Header: '游戏名称', accessor: 'v1', width: 140, sticky: 'left' },
      { Header: '系统名称', accessor: 'v2', width: 155 },
      { Header: '彩种', accessor: 'v3', width: 104 },
      { Header: '今日总盈亏', accessor: 'v4', align: 'right', width: 185 },
      {
        Header: '投注玩法',
        accessor: row => _.join(row.v7, ', '),
        width: 200,
      },
      { Header: '开奖次数', accessor: row => `${row.v8} / ${row.v9}` },
      { Header: '投注次数', accessor: 'v10' },
      { Header: '投注金额', accessor: 'v11' },
      {
        Header: '状态',
        Cell: ({ row: { original } }) => (
          <SpanStatus
            value={original.v5}
            styleType={statusStyleMap[original.v5]}
          />
        ),
      },
      {
        Header: '操作',
        width: 250,
        Cell: ({ row }) => (
          <div className={styles.btnGroup}>
            <ButtonOperation
              stylesType="primary"
              text="游戏设置"
              handleClick={() => console.log('游戏设置')}
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleSelectedChange = items => {
    console.log('onSelectedChange :', items);

    setSelectItems(items);
    notify({
      title: 'Selected Change',
      text: JSON.stringify(_.map(items, 'id')),
      autoClose: 2000,
    });
  };

  const handleRowClick = row => {
    console.log('onRowClick :', row);

    notify({ title: 'Row Click', text: JSON.stringify(row) });
  };

  return (
    <Provider store={store}>
      <div className={styles.story}>
        <SwitchBase
          text="多選"
          checked={check}
          switchChange={e => setCheck(!check)}
        />
        <SwitchBase
          text="固定Header"
          checked={stickyHeader}
          switchChange={e => setStickyHeader(!stickyHeader)}
        />
        <div className={styles.btnGroup} style={{ margin: '10px 0' }}>
          {selectItems.map(({ v1 }, i) => (
            <SpanStatus key={i} value={v1} />
          ))}
        </div>
        <Table
          stickyHeader={stickyHeader}
          multiSelect={check}
          columns={tableColumns}
          data={data}
          onSelectedChange={handleSelectedChange}
          onRowClick={handleRowClick}
        />
        <Notification />
      </div>
    </Provider>
  );
};

const data = _.flatten(
  _.times(10).map(() => [
    {
      id: '110001',
      v1: '腾讯分分彩',
      v2: '腾讯分分彩',
      v3: '爱码游戏',
      v4: '999,999,999,999.000',
      v5: '正常',
      v6: '时时彩',
      v7: ['官方玩法', '信用玩法'],
      v8: '15',
      v9: '1440',
      v10: '123,456,789',
      v11: '999,999,999,999.000',
      v12: '999,999,999,999.000',
      v13: '4.02%',
      v14: '123,456,789.000',
      v15: '999,999,999,999.000',
    },
    {
      id: '110003',
      v1: '支付宝彩',
      v2: '支付宝彩',
      v3: '爱码游戏',
      v4: '999,999,999,999.000',
      v5: '隐藏',
      v6: '时时彩',
      v7: ['官方玩法', '信用玩法'],
      v8: '15',
      v9: '1440',
      v10: '123,456,789',
      v11: '999,999,999,999.000',
      v12: '999,999,999,999.000',
      v13: '4.02%',
      v14: '123,456,789.000',
      v15: '999,999,999,999.000',
    },
    {
      id: '110006',
      v1: '集团PK彩60秒',
      v2: '集团PK彩60秒01',
      v3: '集团游戏',
      v4: '999,999,999,999.000',
      v5: '正常',
      v6: '时时彩',
      v7: ['官方玩法', '信用玩法'],
      v8: '15',
      v9: '1440',
      v10: '123,456,789',
      v11: '999,999,999,999.000',
      v12: '999,999,999,999.000',
      v13: '4.02%',
      v14: '123,456,789.000',
      v15: '999,999,999,999.000',
    },
  ])
);
