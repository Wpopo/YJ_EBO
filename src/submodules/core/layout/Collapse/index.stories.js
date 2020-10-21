import React, { useState } from 'react';
import Collapse from 'Layout/Collapse';
import styles from './indexStories.module.scss';
import SpanTag from 'BaseComponent/SpanTag';
import InputSearch from 'BaseComponent/InputSearch';
import ButtonBase from 'BaseComponent/ButtonBase';
export default {
  title: 'INP-EBO | 統一版型組件/Collapse',
};

/**
 * @param {Component} children 傳入之內容
 * @param {string} styleType style種類, 預設style-1
 */

export const D1_1 = () => {
  const [openCollapse, setopenCollapse] = useState(false);
  const toggleCollapse = () => {
    if (openCollapse) setopenCollapse(false);
    else setopenCollapse(true);
  };
  return <Collapse styleType="style-1">{D1_1_Content}</Collapse>;
};

export const R1_1 = () => {
  const [openCollapse, setopenCollapse] = useState(false);
  const toggleCollapse = () => {
    if (openCollapse) setopenCollapse(false);
    else setopenCollapse(true);
  };
  return <Collapse styleType="style-2">{R1_1_Content}</Collapse>;
};

const D1_1_Content = (
  <>
    <div className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.testDiv}>
          <div className={styles.title}>积分池</div>
          <div className={styles.text}> 888,888,888,888.000</div>
          <div className={styles.testDiv3}>圖表</div>
        </div>
        <div className={styles.testDiv}>
          <div className={styles.title}>有效投注额</div>
          <div className={styles.text}> 888,888,888,888.000</div>
          <div className={styles.testDiv3}>圖表</div>
        </div>
        <div className={styles.testDiv}>
          <div className={styles.title}>实际产品盈亏</div>
          <div className={styles.text}> 888,888,888,888.000</div>
          <div className={styles.testDiv3}>圖表</div>
        </div>
        <div className={styles.testDiv}>
          <div className={styles.title}>产品利润率</div>
          <div className={styles.text}> 1.8%</div>
          <div className={styles.testDiv3}>圖表</div>
        </div>
        <div className={styles.testDiv2}>
          <div className={styles.title}>快速篩選</div>
          <div className={styles.search}>
            <InputSearch
              defaultPlaceholder="开奖起始日期"
              onClick={value => console.log(`InputSearch, ${value}`)}
            ></InputSearch>
          </div>
          <div className={styles.search}>
            <InputSearch
              defaultPlaceholder="开奖截止日期"
              onClick={value => console.log(`InputSearch, ${value}`)}
            ></InputSearch>
          </div>
          <div className={styles.buttonGroup}>
            <div className={styles.button}>
              <ButtonBase
                list={[{ value: '昨日', onClick: () => console.log('昨日') }]}
                size={'md2'}
                styleType={'style-3'}
              />
            </div>
            <div className={styles.button}>
              <ButtonBase
                list={[{ value: '今日', onClick: () => console.log('今日') }]}
                size={'md2'}
                styleType={'style-2'}
              />
            </div>
            <div className={styles.button}>
              <ButtonBase
                list={[{ value: '本週', onClick: () => console.log('本週') }]}
                size={'md2'}
                styleType={'style-2'}
              />
            </div>
          </div>
          <div className={styles.button}>
            <ButtonBase
              list={[{ value: '查詢', onClick: () => console.log('查詢') }]}
              styleType={'style-2'}
              size={'xl2'}
            />
          </div>
        </div>
      </div>
      <div className={styles.hint}>
        # 数据统计范围为当日零时至当前，每十分钟刷新数据 #
      </div>
    </div>
  </>
);

const R1_1_Content = (
  <>
    <div className={styles.root}>
      <div className={styles.top}>
        <span
          className={styles.icon}
          onClick={() => {
            console.log('clicked');
          }}
        >
          <i className="las la-filter la-lg"></i>
        </span>
        <span
          className={styles.icon}
          onClick={() => {
            console.log('clicked');
          }}
        >
          <i className="las la-plus la-lg"></i>
        </span>
        <span
          className={styles.icon}
          onClick={() => {
            console.log('clicked');
          }}
        >
          <i className="las la-pen-nib la-lg"></i>
        </span>
        <span className={styles.span}>
          <SpanTag text={'危险赢家'} />
        </span>
        <span className={styles.span}>
          <SpanTag text={'触发'} />
        </span>
      </div>
      <div className={styles.wrap}>
        <div className={styles.testDiv4}>
          <div className={styles.badge}>总数</div>
          <div className={styles.testDiv5T}>
            <div className={styles.textMU}>99,999M</div>
            <div className={styles.textKU}>99,999K</div>
            <div className={styles.textGU}>99,999.999</div>
          </div>
        </div>
        <div className={styles.testDiv4}>
          <div className={styles.badge}>手动触发</div>
          <div className={styles.testDiv5}>
            <div className={styles.textM}>100</div>
            <div className={styles.textK}>100</div>
            <div className={styles.textG}>100</div>
          </div>
        </div>
        <div className={styles.testDiv4}>
          <div className={styles.badge}>危险赢家</div>
          <div className={styles.testDiv5}>
            <div className={styles.textM}>100</div>
            <div className={styles.textK}>100</div>
            <div className={styles.textG}>100</div>
          </div>
        </div>
        <div className={styles.testDiv4}>
          <div className={styles.badge}>中奖赢家</div>
          <div className={styles.testDiv5}>
            <div className={styles.textM}>100</div>
            <div className={styles.textK}>100</div>
            <div className={styles.textG}>100</div>
          </div>
        </div>
        <div className={styles.testDiv4}>
          <div className={styles.badge}>单期赢家</div>
          <div className={styles.testDiv5}>
            <div className={styles.textM}>100</div>
            <div className={styles.textK}>100</div>
            <div className={styles.textG}>100</div>
          </div>
        </div>
        <div className={styles.testDiv4}>
          <div className={styles.badge}>投注赢家</div>
          <div className={styles.testDiv5}>
            <div className={styles.textM}>100</div>
            <div className={styles.textK}>100</div>
            <div className={styles.textG}>100</div>
          </div>
        </div>
        <div className={styles.testDiv4}>
          <div className={styles.badge}>盈亏赢家</div>
          <div className={styles.testDiv5}>
            <div className={styles.textM}>100</div>
            <div className={styles.textK}>100</div>
            <div className={styles.textG}>100</div>
          </div>
        </div>
        <div className={styles.testDiv4}>
          <div className={styles.badge}>可疑赢家</div>
          <div className={styles.testDiv5}>
            <div className={styles.textM}>100</div>
            <div className={styles.textK}>100</div>
            <div className={styles.textG}>100</div>
          </div>
        </div>
      </div>
    </div>
  </>
);
