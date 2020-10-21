import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  openMessage,
  setMessageTitle,
} from 'Redux/uiMBO/uiMessagePopup/action';
import { setContent } from 'Redux/messagePopup/action';
import Helper from 'Helper';
import ButtonBase from 'BaseComponent/ButtonBase';

const Demo = ({ styleDemo = 'style-1' }) => {
  const dispatch = useDispatch();
  // 開啟彈跳視窗
  const openMessageFn = () => dispatch(openMessage());
  // 設定彈跳視窗的標題
  const setMessageTitleFn = title => dispatch(setMessageTitle(title));
  // 設定Content Config
  const setContentFn = config => dispatch(setContent(config));

  const timelineConfig = [
    {
      right: '备注日期',
      left: { title: '用户帐号', content: '备注内容' },
    },
    {
      right: '2020-01-01 12:12:12',
      left: {
        title: 'user001',
        content:
          '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
      },
    },
    {
      right: '2020-01-01 12:12:12',
      left: {
        title: 'user001',
        content:
          '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
      },
    },
    {
      right: '2020-01-01 12:12:12',
      left: {
        title: 'user001',
        content:
          '备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容备注内容',
      },
    },
  ];
  const selectGroup1 = [
    { text: '单期中奖金额', value: 1 },
    { text: '单期投注金额', value: 2 },
    { text: '单期注单次数', value: 3 },
    { text: '当日总盈亏', value: 4 },
  ];

  const tableColumns = useMemo(
    () => [
      {
        Header: '操作日期',
        accessor: 'time',
        width: 120,
      },
      {
        Header: '操作前',
        align: 'right',
        width: 120,
        Cell: ({ row: { original } }) =>
          Helper.number.format({ num: original.before, nanValue: '－' }),
      },
      {
        Header: '操作后',
        align: 'right',
        width: 125,
        Cell: ({ row: { original } }) =>
          typeof original.after === 'object'
            ? original.after
            : Helper.number.format({
                num: original.after,
                nanValue: '－',
              }),
      },
      {
        Header: '操作者',
        accessor: 'user',
        width: 85,
      },
    ],
    []
  );
  const tableDatas = [
    {
      time: '2020-01-01 12:12:12',
      before: '999',
      after: '111',
      user: 'user001',
    },
    {
      time: '2020-01-01 12:12:12',
      before: '1123',
      after: '999',
      user: 'user001',
    },
    {
      time: '2020-01-01 12:12:12',
      before: '111111',
      after: '1123',
      user: 'user001',
    },
    {
      time: '2020-01-01 12:12:12',
      before: '222222',
      after: '111111',
      user: 'user001',
    },
    {
      time: '2020-01-01 12:12:12',
      before: '333333',
      after: '222222',
      user: 'user001',
    },
    {
      time: '2020-01-01 12:12:12',
      before: '444444',
      after: '333333',
      user: 'user001',
    },
    {
      time: '2020-01-01 12:12:12',
      before: '555555',
      after: '444444',
      user: 'user001',
    },
    {
      time: '2020-01-01 12:12:12',
      before: '666666',
      after: '555555',
      user: 'user001',
    },
    {
      time: '2020-01-01 12:12:12',
      before: '999999',
      after: '666666',
      user: 'user001',
    },
  ];

  return (
    <div>
      {(() => {
        switch (styleDemo) {
          case 'style-1':
            return (
              <ButtonBase
                size="xl"
                list={[
                  {
                    value: 'openMessage',
                    onClick: () => {
                      openMessageFn();
                      setMessageTitleFn('确认删除警报条件？');
                      setContentFn([
                        [
                          'span',
                          '确认删除 危险赢家 警报条件？一旦删除将无法复原。',
                        ],
                      ]);
                    },
                  },
                ]}
              />
            );

          case 'style-2':
            return (
              <ButtonBase
                size="xl"
                list={[
                  {
                    value: 'openMessage',
                    onClick: () => {
                      openMessageFn();
                      setMessageTitleFn('手动触发');
                    },
                  },
                ]}
              />
            );
          case 'style-3':
            return (
              <ButtonBase
                size="xl"
                list={[
                  {
                    value: 'openMessage',
                    onClick: () => {
                      openMessageFn();
                      setMessageTitleFn('备注历程');
                      setContentFn([['timeLine', timelineConfig]]);
                    },
                  },
                ]}
              />
            );

          case 'style-4':
            return (
              <ButtonBase
                size="xl"
                list={[
                  {
                    value: 'openMessage',
                    onClick: () => {
                      openMessageFn();
                      setMessageTitleFn('快捷带入');
                      setContentFn([['select', 'xl', selectGroup1]]);
                    },
                  },
                ]}
              />
            );

          case 'style-5':
            return (
              <ButtonBase
                size="xl"
                list={[
                  {
                    value: 'openMessage',
                    onClick: () => {
                      openMessageFn();
                      setMessageTitleFn('已达限额历程');
                      setContentFn([['table', tableColumns, tableDatas]]);
                    },
                  },
                ]}
              />
            );

          default:
            return null;
        }
      })()}
    </div>
  );
};

export default Demo;
