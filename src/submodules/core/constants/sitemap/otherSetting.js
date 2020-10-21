import loadable from '@loadable/component';

// 银行管理
const BankLists = loadable(() => import('Page/cashFlowSetting/Bank-lists'));
// 新增银行 & 编辑银行
const BankListsEdit = loadable(() =>
  import('Page/cashFlowSetting/Bank-lists/Bank-lists-edit')
);
// 在线支付
const GatewayLists = loadable(() =>
  import('Page/cashFlowSetting/Gateway-lists')
);
// 新增支付 & 编辑支付
const GatewayListsEdit = loadable(() =>
  import('Page/cashFlowSetting/Gateway-lists/Gateway-lists-edit')
);
// 支付分配
const PaymentRisks = loadable(() =>
  import('Page/cashFlowSetting/Payment-risks')
);
// 编辑目標群組 & 编辑支付层级
const PaymentRisksEdit = loadable(() =>
  import('Page/cashFlowSetting/Payment-risks/Payment_risks-edit')
);
// 系統設置 / 商家設置
const MerchantSettings = loadable(() =>
  import('Page/systemSettings/Merchant-settings')
);
// 遊戲設置 / 遊戲列表
const LotteryList = loadable(() => import('Page/gameSettings/Lottery-list'));
const LotteryAdd = loadable(() => import('Page/gameSettings/Lottery-add'));
const LotteryEdit = loadable(() => import('Page/gameSettings/Lottery-edit'));
// 遊戲設置 / 菜单设置
const LotteryMenuSettings = loadable(() =>
  import('Page/gameSettings/Lottery-menu-settings')
);

const SITEMAP = {
  text: '其他设置',
  routes: [
    {
      text: '游戏设置',
      key: 'gameSetting',
      menuIcon: 'la-gamepad',
      routes: [
        {
          exact: true,
          isParent: true,
          text: '游戏列表',
          path: 'settings/lottery',
          component: LotteryList,
        },
        {
          text: '菜单设置',
          path: 'settings/lottery-menu',
          component: LotteryMenuSettings,
        },
        {
          isShow: false,
          text: '新增品牌彩',
          parent: 'settings/lottery',
          path: 'settings/lottery/add',
          component: LotteryAdd,
        },
        {
          isShow: false,
          // text: '游戏设置',
          parent: 'settings/lottery',
          path: 'settings/lottery/:lotteryId/edit',
          component: LotteryEdit,
        },
      ],
    },
    {
      text: '金流设置',
      key: 'cashFlowSetting',
      menuIcon: 'la-piggy-bank',
      routes: [
        {
          text: '银行管理',
          path: 'settings/bank-lists',
          isParent: true,
          exact: true,
          component: BankLists,
        },
        {
          isShow: false,
          text: '新增银行',
          parent: 'settings/bank-lists',
          path: 'settings/bank-lists/add',
          component: BankListsEdit,
        },
        {
          isShow: false,
          text: '编辑银行',
          parent: 'settings/bank-lists',
          path: 'settings/bank-lists/edit/:paymentOptionID',
          component: BankListsEdit,
        },
        {
          text: '在线支付',
          path: 'settings/gateway-lists',
          isParent: true,
          exact: true,
          component: GatewayLists,
        },
        {
          isShow: false,
          text: '新增支付',
          parent: 'settings/gateway-lists',
          path: 'settings/gateway-lists/add',
          component: GatewayListsEdit,
        },
        {
          isShow: false,
          text: '编辑支付',
          parent: 'settings/gateway-lists',
          path: 'settings/gateway-lists/edit/:paymentOptionID',
          component: GatewayListsEdit,
        },
        {
          text: '支付分配',
          path: 'settings/payment-risks',
          isParent: true,
          exact: true,
          component: PaymentRisks,
        },
        {
          isShow: false,
          text: '编辑支付层级',
          parent: 'settings/payment-risks',
          path: 'settings/payment-risks/edit',
          component: PaymentRisksEdit,
        },
        {
          isShow: false,
          text: '编辑',
          parent: 'settings/payment-risks',
          path: 'settings/payment-risks/edit/:paymentRiskID',
          component: PaymentRisksEdit,
        },
      ],
    },
    {
      text: '系统设置',
      key: 'setting',
      menuIcon: 'la-cog',
      routes: [
        {
          text: '商家设置',
          path: 'settings/merchant',
          component: MerchantSettings,
        },
        {
          text: '帐号管理',
          path: 'settings/account-permissions',
          component: null,
        },
        { text: '日志管理', path: 'log', component: null },
      ],
    },
  ],
};

export default SITEMAP;
