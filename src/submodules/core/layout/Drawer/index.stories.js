import React from 'react';
import Drawer from 'Layout/Drawer';
import { useDispatch } from 'react-redux';
import { openDrawer, closeDrawer } from 'Redux/uiMBO/uiDrawer/action';
import ButtonBase from 'BaseComponent/ButtonBase';
import SpanStatus from 'BaseComponent/SpanStatus';
import TimeLine from 'BaseComponent/TimeLine';
import InputDetailData from 'BaseComponent/InputDetailData';
import TextareaBase from 'BaseComponent/TextareaBase';

import store from 'Redux/store';
import { Provider } from 'react-redux';

export default {
  title: 'INP-EBO | 統一版型組件/Drawer',
};

/**
 * @param {String} title 主標題
 * @param {Element} status 狀態標籤
 * @param {Array} content :[ { 資料總內容陣列
 *        @param {String} title 資料標題
 *        @param {Array} data:[ 資料內容陣列
 *                @param {String|Options} subTitle 資料副標題
 *                @param {String|Options} subData 資料陣列
 *        ]
 * }]
 * @param {Array} buttonGroup 底層Button群組陣列，若同一列有兩個Button，則需再多加一層陣列
 */

export const drawer = () => {
  return (
    <Provider store={store}>
      <Buttons />
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
              list={[{ value: '拒绝', onClick: () => console.log('拒绝') }]}
              size={'xl'}
              styleType={'style-1'}
            />,
            <ButtonBase
              list={[{ value: '批准', onClick: () => console.log('批准') }]}
              size={'xl'}
              styleType={'style-1'}
            />,
          ],
        ]}
      />
    </Provider>
  );
};

const Buttons = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(openDrawer());
        }}
      >
        openDrawer
      </button>
      <button
        onClick={() => {
          dispatch(closeDrawer());
        }}
      >
        closeDrawer
      </button>
    </>
  );
};
