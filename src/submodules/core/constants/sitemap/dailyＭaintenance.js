import loadable from '@loadable/component';

// 存款列表
const DepositLists = loadable(() => import('Page/money/Deposit-lists'));
// 提款列表
const WithdrawalsLists = loadable(() => import('Page/money/Withdrawals-lists'));
const RiskAlertsEdit = loadable(() =>
  import('Page/risk/Risk-alerts/Risk-alerts-edit')
);
//風控警報
const RiskAlerts = loadable(() => import('Page/risk/Risk-alerts'));
const RiskAlertsEditMark = loadable(() =>
  import('Page/risk/Risk-alerts/Risk-alerts-edit-mark')
);
const PlayerRestrictions = loadable(() =>
  import('Page/risk/Player-restrictions')
);

const PlayerListsProfile = loadable(() =>
  import('Page/player/Player-lists/Player-lists-profile')
);

//玩家管理
const playerLists = loadable(() => import('Page/player/Player-lists'));
const PlayerListsAdd = loadable(() =>
  import('Page/player/Player-lists/Player-lists-add')
);

//游戏管理
const GameManagement = loadable(() => import('Page/gameManagement'));

const SITEMAP = {
  text: '日常运维',
  routes: [
    {
      text: '数据概览',
      key: 'dashboard',
      path: 'dashboard',
      menuIcon: 'la-tachometer-alt',
      component: null,
    },
    {
      text: '游戏管理',
      key: 'game',
      menuIcon: 'la-dice',
      routes: [
        {
          isShow: false,
          path: 'draws/:type',
          component: GameManagement,
        },
        { text: '爱码彩种', path: 'draws/official-self', component: null },
        { text: '集团彩种', path: 'draws/group', component: null },
        { text: '品牌彩种', path: 'draws/merchant', component: null },
        { text: '官方彩种', path: 'draws/official', component: null },
      ],
    },
    {
      text: '订单管理',
      key: 'order',
      menuIcon: 'la-file-invoice',
      routes: [{ text: '彩票订单', path: 'lottery-orders', component: null }],
    },
    {
      text: '金流管理',
      key: 'money',
      menuIcon: 'la-file-invoice-dollar',
      routes: [
        {
          text: '存款列表',
          path: 'deposit-lists',
          component: DepositLists,
        },
        {
          text: '提款列表',
          path: 'withdrawals-lists',
          component: WithdrawalsLists,
        },
      ],
    },
    {
      text: '玩家管理',
      key: 'player',
      menuIcon: 'la-user-alt',
      routes: [
        {
          text: '玩家列表',
          path: 'player-lists',
          component: playerLists,
          isParent: true,
          exact: true,
        },
        {
          isShow: false,
          text: '玩家详情',
          path: 'player-lists/:playerID/profile',
          parent: 'player-lists',
          component: PlayerListsProfile,
        },
        {
          isShow: false,
          text: '新增玩家',
          path: 'player-lists/add',
          parent: 'player-lists',
          component: PlayerListsAdd,
        },
        {
          isShow: false,
          text: '编辑玩家',
          path: 'player-lists/:playerID/edit',
          parent: 'player-lists',
          component: RiskAlertsEditMark,
        },
        { text: '玩家登录统计', path: 'player-login-stats', component: null },
        { text: '玩家层级', path: 'player-group-lists', component: null },
        {
          text: '代理域名列表',
          path: 'affiliate-url-lists',
          component: null,
        },
      ],
    },
    {
      text: '优惠系统',
      key: 'preferential',
      menuIcon: 'la-gifts',
      routes: [
        {
          text: '活动审核',
          path: 'promotion-verification-lists',
          component: null,
        },
        { text: '行销企划', path: 'campaign-lists', component: null },
        {
          text: '对象群组管理',
          path: 'player-target-groups',
          component: null,
        },
      ],
    },
    {
      text: '风控管理',
      key: 'risk',
      menuIcon: 'la-exclamation-triangle',
      routes: [
        {
          isShow: true,
          isParent: true,
          text: '风控警报',
          path: 'risk-alerts/immediate',
          exact: true,
          component: RiskAlerts,
        },
        {
          isShow: false,
          text: '风控警报',
          path: 'risk-alerts/daily',
          exact: true,
          component: RiskAlerts,
        },
        {
          text: '受限玩家',
          exact: true,
          isParent: true,
          path: 'player-restrictions',
          component: PlayerRestrictions,
        },
        {
          isShow: false,
          text: '新增警报',
          parent: 'risk-alerts/immediate',
          path: 'risk-alerts/immediate/edit',
          component: RiskAlertsEdit,
        },
        {
          isShow: false,
          text: '新增警报',
          parent: 'risk-alerts/daily',
          path: 'risk-alerts/daily/edit',
          component: RiskAlertsEdit,
        },
        {
          isShow: false,
          text: '编辑玩家',
          // exact: true,
          path: 'risk-alerts/edit/mark/:playerID',
          component: RiskAlertsEditMark,
        },
        {
          isShow: false,
          text: '编辑玩家',
          parent: 'player-restrictions',
          // exact: true,
          path: 'player-restrictions/edit/:playerID',
          component: RiskAlertsEditMark,
        },
      ],
    },
    {
      text: '通讯系统',
      key: 'communication',
      menuIcon: 'la-comments',
    },
  ],
};

export default SITEMAP;
