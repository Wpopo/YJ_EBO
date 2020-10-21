import React, { Fragment, useState } from 'react';
import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';
import { openDrawer } from 'Redux/uiMBO/uiDrawer/action';
import SpanStatus from 'BaseComponent/SpanStatus';
import TimeLine from 'BaseComponent/TimeLine';
import InputDetailData from 'BaseComponent/InputDetailData';
import TextareaBase from 'BaseComponent/TextareaBase';
import ButtonBase from 'BaseComponent/ButtonBase';
import Filter from 'Layout/Filter';
import Pagination from 'Layout/Pagination';
import Tabs from 'Layout/Tabs';
import Table from 'Layout/Table';
import Drawer from 'Layout/Drawer';
import LeftMenu from 'Layout/LeftMenu';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '10px',
  },
}));

const Demo = () => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  // Tab Config
  const tabList2 = {
    0: { title: 'H5支付', children: <div>123</div> },
    1: { title: 'APP支付', children: <div>456</div> },
  };
  const tabList = {
    0: {
      title: '微信支付',
      children: <Tabs tabList={tabList2} stylesType={'style-2'}></Tabs>,
    },
    1: { title: '支付宝支付', children: <div>456</div> },
    2: { title: '银联支付', children: <div>789</div> },
    3: { title: '快捷支付', children: <div>012</div> },
    4: { title: '网银支付', children: <div>345</div> },
    5: { title: '银行入款', children: <div>678</div> },
  };

  const tableList = {
    header: [
      { title: '显示名称', textAlign: 'left' },
      { title: '收款银行', textAlign: 'center' },
      { title: '商户名称', textAlign: 'center' },
      { title: '已达限额', textAlign: 'right' },
      { title: '状态', textAlign: 'left' },
      { title: '操作', textAlign: 'left' },
    ],
    bodyConfig: [
      { textAlign: 'left', width: 150 },
      { textAlign: 'center', width: 100 },
      { textAlign: 'center', width: 100 },
      { textAlign: 'right', width: 200 },
      { textAlign: 'left', width: 100 },
      { textAlign: 'left', width: 100 },
    ],
    body: [
      {
        onClick: () => {
          console.log('onClick-1');
          dispatch(openDrawer());
        },
        data: [
          '农银上海支行',
          '农业银行',
          '富乐支付',
          '4,800',
          <SpanStatus value={'启用'} styleType={'style-1'} />,
          <Fragment>
            <span
              onClick={e => {
                e.stopPropagation();
                console.log('编辑');
              }}
            >
              编辑
            </span>
            <span
              onClick={e => {
                e.stopPropagation();
                console.log('暂停');
              }}
            >
              暂停
            </span>
          </Fragment>,
        ],
      },
      {
        onClick: () => console.log('onClick-2'),
        data: [
          '交银青岛支行',
          '交通银行',
          '富乐支付',
          '999,999,999,999.000',
          <SpanStatus value={'启用'} styleType={'style-1'} />,
          <Fragment>
            <span
              onClick={e => {
                e.stopPropagation();
                console.log('编辑');
              }}
            >
              编辑
            </span>
            <span
              onClick={e => {
                e.stopPropagation();
                console.log('暂停');
              }}
            >
              暂停
            </span>
          </Fragment>,
        ],
      },
      {
        onClick: () => console.log('onClick-3'),
        data: [
          '兴银长春支行',
          '兴业银行',
          '富乐支付',
          '999,999,999,999.000',
          <SpanStatus value={'启用'} styleType={'style-1'} />,
          <Fragment>
            <span
              onClick={e => {
                e.stopPropagation();
                console.log('编辑');
              }}
            >
              编辑
            </span>
            <span
              onClick={e => {
                e.stopPropagation();
                console.log('暂停');
              }}
            >
              暂停
            </span>
          </Fragment>,
        ],
      },
      {
        onClick: () => console.log('onClick-4'),
        data: [
          '广银义岛支行',
          '广发银行',
          '富乐支付',
          '999,999,999,999.000',
          <SpanStatus value={'启用'} styleType={'style-1'} />,
          <Fragment>
            <span
              onClick={e => {
                e.stopPropagation();
                console.log('编辑');
              }}
            >
              编辑
            </span>
            <span
              onClick={e => {
                e.stopPropagation();
                console.log('暂停');
              }}
            >
              暂停
            </span>
          </Fragment>,
        ],
      },
    ],
  };

  const classes = useStyles();

  return (
    <div className={`App ${classes.root}`}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(preCount => preCount + 1)}>
        Click me
      </button>
      <br />
      <LeftMenu merchantName="大时代" />
      <br />
      <Filter
        buttonGroupRight={{
          list: [
            { value: '全部', onClick: () => console.log('全部') },
            { value: '待审核', onClick: () => console.log('待审核') },
            { value: '批准', onClick: () => console.log('批准') },
            { value: '拒绝', onClick: () => console.log('拒绝') },
          ],
          size: 'md',
          styleType: 'style-4',
        }}
        buttonGroupLeft={{
          list: [{ value: '筛选', onClick: () => console.log('筛选') }],
          size: 'md',
          styleType: 'style-2',
        }}
      />
      <br />
      <Tabs tabList={tabList} stylesType={'style-1'}></Tabs>
      <br />
      <Table isCheckbox isSelectedRow tableList={tableList} />
      <br />
      <Drawer
        title="W200602111210947"
        status={<SpanStatus value={'待审核'} styleType={'style-2'} />}
        content={[
          {
            data: [
              [
                <TimeLine
                  size={'sm'}
                  list={[
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
                  ]}
                />,
              ],
            ],
          },
          {
            title: '微信支付',
            data: [
              {
                subTitle: 'H5支付',
                subData: [
                  ['申请时间', '2020-01-01 10:10:10'],
                  ['玩家帐号', 'Ada'],
                  ['审核时间', '－'],
                  ['审核人员', '－'],
                  ['下发时间', '－'],
                  ['下发人员', '－'],
                ],
              },
              {
                subTitle: 'APP支付',
                subData: [['富乐微信 / 1%', '富乐支付']],
              },
            ],
          },
          {
            data: [
              ['请款人', 'user001'],
              ['出款金额', '999,999,999,999.000'],
              ['出款银行', '建设银行'],
              ['出款帐号', '1234567890'],
              ['出款人', '野比大雄'],
            ],
          },
          {
            data: [
              [
                '手续费',
                <InputDetailData
                  size="md"
                  title=""
                  placeholder=""
                  textAlign="right"
                />,
              ],
              ['实际入款', '999,999,999,999.000'],
              ['备注', <TextareaBase />],
            ],
          },
        ]}
        buttonGroup={[
          [
            <ButtonBase
              list={[{ value: '保存', onClick: () => console.log('保存') }]}
              size={'xxl'}
              styleType={'style-1'}
            />,
          ],
          [
            <ButtonBase
              list={[{ value: '批准', onClick: () => console.log('批准') }]}
              size={'xl'}
              styleType={'style-1'}
            />,
            <ButtonBase
              list={[{ value: '拒绝', onClick: () => console.log('拒绝') }]}
              size={'xl'}
              styleType={'style-1'}
            />,
          ],
        ]}
      />
      <br />
      <Pagination totalCount={100} />
      <br />
      <TimeLine
        list={[
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
        ]}
      />
    </div>
  );
};

export default Demo;
