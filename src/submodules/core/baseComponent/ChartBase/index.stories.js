import React from 'react';
import { LineChart, BarChart } from 'BaseComponent/ChartBase';

export default {
  title: 'INP-EBO | 基本組件/ChartBase',
};

export const line_chart = () => {
  const data = [
    {
      id: '入款总额',
      data: [
        { x: '00:00', y: 1500 },
        { x: '01:00', y: 1800 },
        { x: '02:00', y: 2200 },
        { x: '03:00', y: 2600 },
        { x: '04:00', y: 2800 },
        { x: '05:00', y: 2850 },
        { x: '06:00', y: 2900 },
        { x: '07:00', y: 2850 },
        { x: '08:00', y: 2800 },
        { x: '09:00', y: 2500 },
        { x: '10:00', y: 2200 },
        { x: '11:00', y: 2100 },
        { x: '12:00', y: 2300 },
        { x: '13:00', y: 2600 },
        { x: '14:00', y: 2950 },
        { x: '15:00', y: null },
        { x: '16:00', y: null },
        { x: '17:00', y: null },
        { x: '18:00', y: null },
        { x: '19:00', y: null },
        { x: '20:00', y: null },
        { x: '21:00', y: null },
        { x: '22:00', y: null },
        { x: '23:00', y: null },
        { x: '24:00', y: null },
      ],
    },
    {
      id: '出款总额',
      data: [
        { x: '00:00', y: 3700 },
        { x: '01:00', y: 3900 },
        { x: '02:00', y: 3000 },
        { x: '03:00', y: 3500 },
        { x: '04:00', y: 4100 },
        { x: '05:00', y: 4500 },
        { x: '06:00', y: 4300 },
        { x: '07:00', y: 4100 },
        { x: '08:00', y: 3700 },
        { x: '09:00', y: 3500 },
        { x: '10:00', y: 3200 },
        { x: '11:00', y: 3100 },
        { x: '12:00', y: 2900 },
        { x: '13:00', y: 2950 },
        { x: '14:00', y: 2950 },
        { x: '15:00', y: null },
        { x: '16:00', y: null },
        { x: '17:00', y: null },
        { x: '18:00', y: null },
        { x: '19:00', y: null },
        { x: '20:00', y: null },
        { x: '21:00', y: null },
        { x: '22:00', y: null },
        { x: '23:00', y: null },
        { x: '24:00', y: null },
      ],
    },
  ];
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <LineChart data={data} />
    </div>
  );
};

export const bar_chart = () => {
  const data = [
    {
      gameName: '腾讯分分彩',
      投注金额: 5200,
      有效投注额: 4100,
    },
    {
      gameName: '北京PK10',
      投注金额: 5400,
      有效投注额: 3500,
    },
    {
      gameName: '支付宝彩',
      投注金额: 5100,
      有效投注额: 4800,
    },
    {
      gameName: '幸运飞挺',
      投注金额: 5600,
      有效投注额: 3800,
    },
    {
      gameName: '欢乐生肖',
      投注金额: 3800,
      有效投注额: 2800,
    },
    {
      gameName: '集团PK彩60秒',
      投注金额: 2900,
      有效投注额: 1900,
    },
    {
      gameName: '商家PK60秒',
      投注金额: 5100,
      有效投注额: 3900,
    },
    {
      gameName: '新西兰45秒彩',
      投注金额: 4800,
      有效投注额: 3400,
    },
    {
      gameName: '俄罗斯1.5分彩',
      投注金额: 5200,
      有效投注额: 4100,
    },
    {
      gameName: '北京赛车',
      投注金额: 5300,
      有效投注额: 4200,
    },
    {
      gameName: '奇趣腾讯',
      投注金额: 3100,
      有效投注额: 1800,
    },
    {
      gameName: '广东快乐十分',
      投注金额: 4400,
      有效投注额: 3200,
    },
    {
      gameName: '香港六合彩',
      投注金额: 5300,
      有效投注额: 4300,
    },
    {
      gameName: '加拿大幸运28',
      投注金额: 4600,
      有效投注额: 3200,
    },
  ];
  const keys = ['投注金额', '有效投注额'];
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <BarChart data={data} keys={keys} />
    </div>
  );
};
