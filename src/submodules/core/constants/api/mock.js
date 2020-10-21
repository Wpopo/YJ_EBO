import axios from 'axios';
import _ from 'lodash';
import { add, format } from 'date-fns';
import MockAdapter from 'axios-mock-adapter';
import Mock from 'mockjs';

const mock = new MockAdapter(axios, { delayResponse: 0 });

const database = Mock.mock({
  'merchants|10': [
    {
      'id|+1': 0,
      merchantName: '@ctitle',
      'maxBouns|20000-50000': 20000,
      'merchantStatuses|1': ['1', '2'],
      merchantGroupName: '@name',
      'minBouns|2000-18000': 18000,
      'highestRebate|1-100.2': 1,
      'lotteries|30-160': [
        {
          'id|+1': 100000,
          v1: '@ctitle(3,6)',
          v2: '@ctitle',
          'v3|1': ['集团游戏', '爱码游戏'],
          v4: '999,999,999,999.000',
          'v5|1': ['正常', '维护', '隐藏'],
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
      ],
      'menu|1-13': [
        {
          title: '@ctitle',
          'items|2-8': [
            {
              id: 100000,
            },
          ],
        },
      ],
      'gameList|10-100': [
        {
          'id|+1': 100000,
          v1: '@datetime',
          'v2|1': [
            [1, 2, 3, 4, 5, 6, '+', 7],
            [10, 20, 30, 40, 50],
          ],
          v3: '9,999,999',
          v4: '9,999,999.000',
          v5: '894,123.000',
          'v6|1': ['未开奖', '已开奖', '手动开奖', '撤奖'],
          v7: ['手动开奖', '撤奖', '纠正'],
        },
      ],
    },
  ],
});

const fakeHistory = (prev = []) => {
  const next = _.times(10).map(v => ({
    datetime: format(
      add(Date.now(), {
        hours: v,
        minutes: _.random(-3600, 3600),
        seconds: _.random(-6000, 6000),
      }),
      'yyyy-MM-ddTHH:mm:ss'
    ),
    value: _.random(1, 20),
  }));
  prev.shift();
  return _.take([...prev, ...next], 10);
};

console.log('database', database);

const pagination = (items, page = 1, perPage = 10) => {
  const offset = (page - 1) * perPage;
  const pagedItems = _.drop(items, offset).slice(0, perPage);

  return {
    page,
    perPage,
    total: items.length,
    totalPages: Math.ceil(items.length / perPage),
    data: pagedItems,
  };
};
const wrapper = (data, { success = 'true', message = '', code = 1 } = {}) => [
  200,
  {
    success,
    message,
    code,
    data,
    // data: {
    //   result: data,
    // },
  },
];

// 系统设置 商家设置
mock.onGet(new RegExp('^getMerchantInfo/*')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  return wrapper(_.find(database.merchants, { id: +merchantID }));
});
mock.onPost(new RegExp('^editMerchantInfo')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  return wrapper({ id: merchantID });
});

// 系統設置 日志管理
mock.onPost(new RegExp('^getLogListInfo/*')).reply(({ data }) => {
  return wrapper(
    [
      {
        time: '2020-01-10 10:10:10',
        operator: '后台',
        account: 'user001',
        operationPage: '登录',
        action: '登录',
        content: '日志内容一',
        ip: '255.255.255.255',
        status: '成功',
      },
      {
        time: '2020-01-09 10:10:10',
        operator: '玩家',
        account: 'Ada',
        operationPage: '入款',
        action: '充值',
        content: '日志内容二',
        ip: '255.255.255.255',
        status: '失败',
      },
      {
        time: '2020-01-08 10:10:10',
        operator: '后台',
        account: 'user001',
        operationPage: '出款',
        action: '代客提款',
        content: '日志内容三',
        ip: '255.255.255.255',
        status: '成功',
      },
      {
        time: '2020-01-07 10:10:10',
        operator: '后台',
        account: 'user001',
        operationPage: '订单',
        action: '退单',
        content: '日志内容四',
        ip: '255.255.255.255',
        status: '成功',
      },
      {
        time: '2020-01-06 10:10:10',
        operator: '后台',
        account: 'user001',
        operationPage: '玩家详情',
        action: '升为代理',
        content: '日志内容五',
        ip: '255.255.255.255',
        status: '成功',
      },
      {
        time: '2020-01-05 10:10:10',
        operator: '后台',
        account: 'user001',
        operationPage: '编辑玩家',
        action: '禁止登录',
        content: '日志内容六',
        ip: '255.255.255.255',
        status: '成功',
      },
      {
        time: '2020-01-04 10:10:10',
        operator: '后台',
        account: 'user001',
        operationPage: '入款',
        action: '代客充值',
        content: '日志内容七',
        ip: '255.255.255.255',
        status: '成功',
      },
      {
        time: '2020-01-03 10:10:10',
        operator: '后台',
        account: 'user001',
        operationPage: '出款',
        action: '代客提款',
        content: '日志内容八',
        ip: '255.255.255.255',
        status: '成功',
      },
    ],
    { message: '拒絕存取' }
  );
});

// 游戏设置 游戏列表
mock.onGet(new RegExp('^getLotteryList/*')).reply(({ data }) => {
  const { merchantID, page, perPage, status, keyword } = JSON.parse(data);
  const { lotteries } = _.find(database.merchants, { id: +merchantID });
  const statusFilter = lotteries => {
    if (status === '全部') return lotteries;
    return _.filter(lotteries, ['v5', status]);
  };
  const keywordFilter = lotteries => {
    if (_.isEmpty(keyword)) return lotteries;
    return _.filter(lotteries, ({ v1 }) => new RegExp(`${keyword}`).test(v1));
  };
  const filter = _.flow(statusFilter, keywordFilter);

  return wrapper(pagination(filter(lotteries), page, perPage));
});

// 游戏设置 游戏列表 新增品牌彩
mock.onGet(new RegExp('^getLotteryGroup/*')).reply(({ data }) => {
  const { merchantID, page, perPage, status, keyword } = JSON.parse(data);
  return wrapper([
    {
      title: 'PK10彩60秒01',
      lotteries: [{ name: 'LF集团PK10彩60秒', menu: 3, isProducing: false }],
    },
    {
      title: 'PK10彩90秒01',
      lotteries: [{ name: 'LF集团PK10彩60秒', menu: 2, isProducing: true }],
    },
    {
      title: '时时彩60秒01',
      lotteries: [{ name: 'LF集团PK10彩60秒', menu: 1, isProducing: false }],
    },
    {
      title: 'PK10彩60秒01',
      lotteries: [],
    },
  ]);
});
mock.onPost(new RegExp('^addLottery/*')).reply(({ data }) => {
  const { merchantID, page, perPage, status, keyword } = JSON.parse(data);
  console.log('mock.onPost data', data);
  return wrapper();
});

// 游戏设置 游戏列表 游戏设置
mock.onGet(new RegExp('^getLotterySettings/*')).reply(({ data }) => {
  const { merchantID, page, perPage, status, keyword } = JSON.parse(data);
  return wrapper({
    状态设置: {
      name: '腾讯分分彩',
      投注玩法: [
        {
          name: '官方玩法',
          status: '正常',
          投注类型: [
            {
              name: '四星',
              status: '正常',
              投注组合: [
                {
                  name: 'A',
                  status: '隐藏',
                  玩法名称: [
                    { name: '1', status: '正常' },
                    { name: '2', status: '正常' },
                  ],
                },
                {
                  name: 'B',
                  status: '正常',
                  玩法名称: [
                    { name: '3', status: '正常' },
                    { name: '4', status: '正常' },
                  ],
                },
              ],
            },
            {
              name: '五星',
              status: '正常',
              投注组合: [
                {
                  name: 'C',
                  status: '正常',
                  玩法名称: [
                    { name: '5', status: '正常' },
                    { name: '6', status: '正常' },
                  ],
                },
                {
                  name: 'D',
                  status: '维护',
                  玩法名称: [
                    { name: '7', status: '正常' },
                    { name: '8', status: '正常' },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: '信用玩法',
          status: '正常',
          投注类型: [
            {
              name: 'X',
              status: '正常',
              投注组合: [
                {
                  name: 'E',
                  status: '正常',
                  玩法名称: [
                    { name: '9', status: '正常' },
                    { name: '10', status: '正常' },
                  ],
                },
                {
                  name: 'F',
                  status: '正常',
                  玩法名称: [
                    { name: '11', status: '正常' },
                    { name: '12', status: '正常' },
                  ],
                },
              ],
            },
            {
              name: 'Y',
              status: '正常',
              投注组合: [
                {
                  name: 'G',
                  status: '正常',
                  玩法名称: [
                    { name: '13', status: '正常' },
                    { name: '14', status: '正常' },
                  ],
                },
                {
                  name: 'H',
                  status: '维护',
                  玩法名称: [
                    { name: '15', status: '正常' },
                    { name: '16', status: '正常' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    彩种设置: {
      系统名称: '腾讯分分彩',
      游戏名称: '腾讯分分彩',
      开奖策略: '1',
      默认积分池: '1000,000',
      积分池最大值: '999,999,999,999',
      每期计入比例: '100',
    },
    开奖策略: [
      { value: '1', text: '积分池' },
      { value: '2', text: '待用' },
    ],
  });
});
mock.onPost(new RegExp('^editLotterySettings/*')).reply(({ data }) => {
  const { merchantID, page, perPage, status, keyword } = JSON.parse(data);
  console.log('[POST][editLotterySettings]', JSON.parse(data));
  return wrapper();
});
mock.onPost(new RegExp('^editLotteryStatus/*')).reply(({ data }) => {
  const { merchantID, page, perPage, status, keyword } = JSON.parse(data);
  console.log('[POST][editLotteryStatus]', JSON.parse(data));
  return wrapper();
});

// 游戏设置 菜单设置
mock.onGet(new RegExp('^getNormalLotteries/*')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  const { menu, lotteries } = _.find(database.merchants, { id: +merchantID });
  const normalLotteries = _.filter(lotteries, ['v5', '正常']);
  return wrapper(normalLotteries.map(({ id, v1 }) => ({ id, name: v1 })));
});
mock.onGet(new RegExp('^getMenuSettings/*')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  const { menu, lotteries } = _.find(database.merchants, { id: +merchantID });
  const normalLotteries = _.filter(lotteries, ['v5', '正常']);
  return wrapper(
    menu.map(menu => ({
      ...menu,
      items: _.map(
        _.take(_.shuffle(normalLotteries), menu.items.length),
        ({ id }) => ({
          id,
        })
      ),
    }))
  );
});
mock.onPost(new RegExp('^editMenuSettings')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  return wrapper({ id: merchantID });
});

// 游戏管理
let dashboard = [];

mock.onGet(new RegExp('^getGameCategories/*')).reply(({ data }) => {
  const { merchantID, brand } = JSON.parse(data);
  const { menu, lotteries } = _.find(database.merchants, { id: +merchantID });
  return wrapper([{ text: '香港六合彩', value: '香港六合彩' }]);
});
mock.onGet(new RegExp('^getGameList/*')).reply(({ data }) => {
  const { merchantID, brand, category, page, perPage } = JSON.parse(data);

  console.log('[GET][getGameList]', JSON.parse(data));

  const { gameList } = _.find(database.merchants, { id: +merchantID });
  const filter = _.flow(items => items);
  return wrapper(pagination(filter(gameList), page, perPage));
});
mock.onGet(new RegExp('^getDashboard/*')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  const get = (target, defaultValue) => {
    return _.get(_.find(dashboard, ['title', target]), 'history', defaultValue);
  };
  dashboard = [
    {
      title: '积分池',
      value: 888888888888.0,
      history: (get('积分池', 0) + 0.5) % 100,
      resettable: true,
    },
    {
      title: '投注次数',
      value: 1024,
      history: fakeHistory(get('投注次数', [])),
      formater: {
        integerNoTail: true,
      },
    },
    {
      title: '有效投注额',
      value: 888888888888.0,
      history: fakeHistory(get('有效投注额', [])),
    },
    {
      title: '实际游戏盈亏',
      value: 888888888888.0,
      history: fakeHistory(get('实际游戏盈亏', [])),
    },
    // {
    //   title: '游戏利润率',
    //   value: 1.8,
    //   history: fakeHistory(get('游戏利润率', [])),
    //   formater: {
    //     noTail: true,
    //     suffix: '%',
    //     integerNoTail: true,
    //   },
    // },
  ];
  return wrapper(dashboard);
});
mock.onPost(new RegExp('^resetPool')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  console.log('[POST][resetPool]', JSON.parse(data));
  return wrapper({ id: merchantID });
});
mock.onPost(new RegExp('^manualDraw')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  console.log('[POST][manualDraw]', JSON.parse(data));
  return wrapper({ id: merchantID });
});
mock.onPost(new RegExp('^revokeDraw')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  console.log('[POST][revokeDraw]', JSON.parse(data));
  return wrapper({ id: merchantID });
});
mock.onPost(new RegExp('^correctDraw')).reply(({ data }) => {
  const { merchantID } = JSON.parse(data);
  console.log('[POST][correctDraw]', JSON.parse(data));
  return wrapper({ id: merchantID });
});
