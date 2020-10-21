// 金流管理 存款列表
export const DEPOSIT_LIST = {
  // 取得玩家存款單列表
  GET_LIST: ({
    status,
    merchantGroup,
    merchant,
    submitDateFrom,
    submitDateTo,
    approveDateFrom,
    approveDateTo,
    depositAmountFrom,
    depositAmountTo,
    paymentMethod,
    depositID,
    playerUserName,
    currentPage,
    quantityPerPage,
    sortBySubmitDate,
  }) => {
    return {
      url: 'getDepositList',
      params: {
        status,
        merchantGroup,
        merchant,
        submitDateFrom,
        submitDateTo,
        approveDateFrom,
        approveDateTo,
        depositAmountFrom,
        depositAmountTo,
        paymentMethod,
        depositID,
        playerUserName,
        currentPage,
        quantityPerPage,
        sortBySubmitDate,
      },
      method: 'POST',
      // 是否“不”需要 token 驗證
      withoutAuth: false,
      /*** response 及 scopeLoading 存放在 redux 的位置 ***/
      setKey: {
        page: 'depositList',
        function: 'depositList',
      },
      /*** response 及 scopeLoading 存放在 redux 的位置 End ***/
      // 決定整頁是否共用同一個 loading 過場
      globalLoading: true,
    };
  },
  // 取得該筆存款單備註歷程
  GET_REMARK_HISTORY: depositID => {
    return {
      url: 'getDepositListRemarkHistory',
      params: { depositID },
      method: 'POST',
      withoutAuth: false,
      setKey: {
        page: 'depositList',
        function: 'depositListRemarkHistory',
      },
      globalLoading: true,
    };
  },
  // 修改該筆存款單資料
  EDIT_DETAIL_LIST: ({ depositID, bonus, fee, commentTbx, status }) => {
    return {
      url: 'editDepositListData',
      params: {
        depositID,
        bonus,
        fee,
        commentTbx,
        status,
      },
      method: 'POST',
      withoutAuth: false,
      setKey: {
        page: 'depositList',
        function: 'editDepositListData',
      },
      globalLoading: true,
    };
  },
};

// 金流管理 提款列表
export const WITHDRAWALS_LIST = {
  // 取得玩家提款單列表
  GET_LIST: ({
    status,
    merchantGroup,
    merchant,
    submitDateFrom,
    submitDateTo,
    approveDateFrom,
    approveDateTo,
    releaseDateFrom,
    releaseDateTo,
    withdrawalAmountFrom,
    withdrawalAmountTo,
    paymentMethod,
    withdrawalID,
    playerUserName,
    currentPage,
    quantityPerPage,
    sortBySubmitDate,
  }) => {
    return {
      url: 'getWithdrawalsList',
      params: {
        status,
        merchantGroup,
        merchant,
        submitDateFrom,
        submitDateTo,
        approveDateFrom,
        approveDateTo,
        releaseDateFrom,
        releaseDateTo,
        withdrawalAmountFrom,
        withdrawalAmountTo,
        paymentMethod,
        withdrawalID,
        playerUserName,
        currentPage,
        quantityPerPage,
        sortBySubmitDate,
      },
      method: 'POST',
      setKey: {
        page: 'withdrawalsList',
        function: 'withdrawalsList',
      },
      globalLoading: true,
    };
  },
  // 取得該筆提款單詳細資料
  GET_DETAIL_LIST: id => {
    return {
      url: 'getDetailWithdrawalsList',
      params: { id },
      method: 'POST',
      setKey: {
        page: 'withdrawalsList',
        function: 'detailWithdrawalsList',
      },
      globalLoading: true,
    };
  },
  // 取得該筆提款單備註歷程
  GET_REMARK_HISTORY: withdrawalID => {
    return {
      url: 'getWithdrawalsListRemarkHistory',
      params: { withdrawalID },
      method: 'POST',
      setKey: {
        page: 'withdrawalsList',
        function: 'withdrawalsListRemarkHistory',
      },
      globalLoading: true,
    };
  },
  // 修改該筆提款單資料
  EDIT_DETAIL_LIST: ({
    withdrawalID,
    fee,
    commentTbx,
    status,
    withdrawalMethod,
  }) => {
    return {
      url: 'editWithdrawalsListData',
      params: {
        withdrawalID,
        fee,
        commentTbx,
        status,
        withdrawalMethod,
      },
      method: 'POST',
      setKey: {
        page: 'withdrawalsList',
        function: 'editWithdrawalsListData',
      },
      globalLoading: true,
    };
  },
  // 取得該商家可下發的支付方式
  GET_PAYMENT_METHODS: () => {
    return {
      url: 'WithdrawalsListPaymentMethods',
      params: {},
      method: 'POST',
      setKey: {
        page: 'withdrawalsList',
        function: 'withdrawalsListPaymentMethods',
      },
      globalLoading: true,
    };
  },
};

// 金流設置 銀行管理
export const BANK_LIST = {
  // 取得銀行收款渠道列表
  GET_LIST: ({
    status,
    merchantGroup,
    merchant,
    bankNames,
    displayBankName,
    todayDepositAmountFrom,
    todayDepositAmountTo,
    paymentOptionID,
    currentPage,
    quantityPerPage,
  }) => {
    return {
      url: 'getBankList',
      params: {
        status,
        merchantGroup,
        merchant,
        bankNames,
        displayBankName,
        todayDepositAmountFrom,
        todayDepositAmountTo,
        paymentOptionID,
        currentPage,
        quantityPerPage,
      },
      method: 'POST',
      setKey: {
        page: 'bankList',
        function: 'bankList',
      },
      globalLoading: true,
    };
  },
  // 取得該筆資金層級今日存款詳細資料
  GET_DETAIL_TARGET_GROUP_WITH_FEE: paymentOptionID => {
    return {
      url: 'getDetailTargetGroupWithFee',
      params: { paymentOptionID },
      method: 'POST',
      setKey: {
        page: 'bankList',
        function: 'getDetailTargetGroupWithFee',
      },
      globalLoading: true,
    };
  },
  // 修改該筆銀行收款渠道資料
  EDIT_DETAIL_LIST: ({
    paymentOptionID,
    displayBankName,
    bankName,
    accountNumber,
    accountName,
    providerName,
    status,
    amountPerDepositFrom,
    amountPerDepositTo,
    depositAlertLimit,
    accountNumberHide,
    depositMode,
    withdrawalMode,
    targetGroupWithFee,
  }) => {
    return {
      url: 'editBankListData',
      param: {
        paymentOptionID,
        displayBankName,
        bankName,
        accountNumber,
        accountName,
        providerName,
        status,
        amountPerDepositFrom,
        amountPerDepositTo,
        depositAlertLimit,
        accountNumberHide,
        depositMode,
        withdrawalMode,
        targetGroupWithFee,
      },
      method: 'POST',
      setKey: {
        page: 'bankList',
        function: 'editBankListData',
      },
      globalLoading: true,
    };
  },
  // 新增一筆銀行收款渠道資料
  ADD_DETAIL_LIST: ({
    merchantGroup,
    merchant,
    displayBankName,
    bankName,
    accountNumber,
    accountName,
    providerName,
    status,
    amountPerDepositFrom,
    amountPerDepositTo,
    depositAlertLimit,
    accountNumberHide,
    depositMode,
    withdrawalMode,
    device,
    targetGroupWithFee,
  }) => {
    return {
      url: 'addBankListData',
      param: {
        merchantGroup,
        merchant,
        displayBankName,
        bankName,
        accountNumber,
        accountName,
        providerName,
        status,
        amountPerDepositFrom,
        amountPerDepositTo,
        depositAlertLimit,
        accountNumberHide,
        depositMode,
        withdrawalMode,
        device,
        targetGroupWithFee,
      },
      method: 'POST',
      setKey: {
        page: 'bankList',
        function: 'addBankListData',
      },
      globalLoading: true,
    };
  },
  // 取得已達限額修改記錄
  GET_LIMIT_REACHED: paymentOptionID => {
    return {
      url: 'getLimitReached',
      params: { paymentOptionID },
      method: 'POST',
      setKey: {
        page: 'bankList',
        function: 'limitReached',
      },
      globalLoading: true,
    };
  },
  // 修改已達限額修改記錄
  EDIT_LIMIT_REACHED: ({ paymentOptionID, depositAmount }) => {
    return {
      url: 'editLimitReached',
      params: { paymentOptionID, depositAmount },
      method: 'POST',
      setKey: {
        page: 'bankList',
        function: 'editLimitReached',
      },
      globalLoading: true,
    };
  },
  // 取得商家所有支付群組列表
  GET_TARGET_GROUP_WITH_FEE: ({ merchantGroup, merchant }) => {
    return {
      url: 'getTargetGroupWithFee',
      param: { merchantGroup, merchant },
      method: 'POST',
      setKey: {
        page: 'bankList',
        function: 'targetGroupWithFee',
      },
      globalLoading: true,
    };
  },
  // 取得銀行列表
  GET_BANK_NAME_LIST: () => {
    return {
      url: 'getBankNameList',
      param: {},
      method: 'POST',
      setKey: {
        page: 'bankList',
        function: 'bankNameList',
      },
      globalLoading: true,
    };
  },
};

// 金流設置 在線支付
export const GATEWAY_LIST = {
  // 取得三方支付渠道列表
  GET_LIST: ({
    status,
    merchantGroup,
    merchant,
    paymentMethods,
    paymentOptions,
    todayDepositAmountFrom,
    todayDepositAmountTo,
    paymentOptionID,
    currentPage,
    quantityPerPage,
  }) => {
    return {
      url: 'getGatewayList',
      params: {
        status,
        merchantGroup,
        merchant,
        paymentMethods,
        paymentOptions,
        todayDepositAmountFrom,
        todayDepositAmountTo,
        paymentOptionID,
        currentPage,
        quantityPerPage,
      },
      method: 'POST',
      setKey: {
        page: 'gatewayList',
        function: 'gatewayList',
      },
      globalLoading: true,
    };
  },
  // 修改該筆三方支付渠道資料
  EDIT_DETAIL_LIST: ({
    paymentOptionID,
    displayOptionName,
    paymentProvider,
    accountNumber,
    paymentMethod,
    paymentOption,
    status,
    depositMode,
    withdrawalMode,
    device,
    support,
    amountPerDepositFrom,
    amountPerDepositTo,
    depositAlertLimit,
    gatewayFee,
    domainName,
    securityKey,
    targetGroupWithFee,
  }) => {
    return {
      url: 'editGatewayListData',
      param: {
        paymentOptionID,
        displayOptionName,
        paymentProvider,
        accountNumber,
        paymentMethod,
        paymentOption,
        status,
        depositMode,
        withdrawalMode,
        device,
        support,
        amountPerDepositFrom,
        amountPerDepositTo,
        depositAlertLimit,
        gatewayFee,
        domainName,
        securityKey,
        targetGroupWithFee,
      },
      method: 'POST',
      setKey: {
        page: 'gatewayList',
        function: 'editGatewayListData',
      },
      globalLoading: true,
    };
  },
  // 新增一筆三方支付渠道資料
  ADD_DETAIL_LIST: ({
    merchantGroup,
    merchant,
    displayOptionName,
    paymentProvider,
    accountNumber,
    paymentMethod,
    paymentOption,
    status,
    depositMode,
    withdrawalMode,
    device,
    support,
    amountPerDepositFrom,
    amountPerDepositTo,
    depositAlertLimit,
    gatewayFee,
    domainName,
    securityKey,
    targetGroupWithFee,
  }) => {
    return {
      url: 'addGatewayListData',
      param: {
        merchantGroup,
        merchant,
        displayOptionName,
        paymentProvider,
        accountNumber,
        paymentMethod,
        paymentOption,
        status,
        depositMode,
        withdrawalMode,
        device,
        support,
        amountPerDepositFrom,
        amountPerDepositTo,
        depositAlertLimit,
        gatewayFee,
        domainName,
        securityKey,
        targetGroupWithFee,
      },
      method: 'POST',
      setKey: {
        page: 'gatewayList',
        function: 'addGatewayListData',
      },
      globalLoading: true,
    };
  },
  // 取得三方商戶列表
  GET_PAYMENT_PROVIDER: ({ merchantGroup, merchant }) => {
    return {
      url: 'getPaymentProvider',
      params: {
        merchantGroup,
        merchant,
      },
      method: 'POST',
      setKey: {
        page: 'gatewayList',
        function: 'paymentProvider',
      },
      globalLoading: true,
    };
  },
  // 取得支付类别列表
  GET_PAYMENT_METHOD: ({ merchantGroup, merchant }) => {
    return {
      url: 'getPaymentMethod',
      params: {
        merchantGroup,
        merchant,
      },
      method: 'POST',
      setKey: {
        page: 'gatewayList',
        function: 'paymentMethod',
      },
      globalLoading: true,
    };
  },
  // 取得支付选项列表
  GET_PAYMENT_OPTION: ({ merchantGroup, merchant }) => {
    return {
      url: 'getPaymentOption',
      params: {
        merchantGroup,
        merchant,
      },
      method: 'POST',
      setKey: {
        page: 'gatewayList',
        function: 'paymentOption',
      },
      globalLoading: true,
    };
  },
  // 取得三方特定商戶名稱底下的商戶號列表
  GET_ACCOUNT_NUMBER: ({ merchantGroup, merchant, paymentProvider }) => {
    return {
      url: 'getAccountNumber',
      params: {
        merchantGroup,
        merchant,
        paymentProvider,
      },
      method: 'POST',
      setKey: {
        page: 'gatewayList',
        function: 'accountNumber',
      },
      globalLoading: true,
    };
  },
  // 取得三方特定商戶號的歷史輸入紀錄
  GET_ACCOUNT_NUMBER_HISTORY: ({
    merchantGroup,
    merchant,
    paymentProvider,
    accountNumber,
  }) => {
    return {
      url: 'getAccountNumberHistory',
      params: {
        merchantGroup,
        merchant,
        paymentProvider,
        accountNumber,
      },
      method: 'POST',
      setKey: {
        page: 'gatewayList',
        function: 'accountNumberHistory',
      },
      globalLoading: true,
    };
  },
};

// 金流設置 支付分配
export const PAYMENT_RISK = {
  // 取得目標群組統計資料
  GET_LIST: ({ merchantGroup, merchant, targetGroupName, gatewayType }) => {
    return {
      url: 'getPaymentRiskList',
      params: {
        merchantGroup,
        merchant,
        targetGroupName,
        gatewayType,
      },
      method: 'POST',
      setKey: {
        page: 'paymentRiskList',
        function: 'paymentRiskList',
      },
      globalLoading: true,
    };
  },
  // 編輯提款詳情
  EDIT_WITHDRAWALS_DETAIL: ({ paymentRiskID, count, amount }) => {
    return {
      url: 'editWithdrawalsDetail',
      params: {
        paymentRiskID,
        count,
        amount,
      },
      method: 'POST',
      setKey: {
        page: 'paymentRiskList',
        function: 'editWithdrawalsDetail',
      },
      globalLoading: true,
    };
  },
  // 取得該支付選項擁有的所有 provider
  GET_PROVIDER: ({ merchantGroup, merchant, paymentRiskID }) => {
    return {
      url: 'getDetailPaymentRiskProvider',
      params: {
        merchantGroup,
        merchant,
        paymentRiskID,
      },
      method: 'POST',
      setKey: {
        page: 'paymentRiskList',
        function: 'getDetailPaymentRiskProvider',
      },
      globalLoading: true,
    };
  },
  // 修改該筆目標群組資料
  EDIT_PROVIDER: ({ method, option, provider, mode }) => {
    return {
      url: 'editDetailPaymentRiskProvider',
      params: {
        method,
        option,
        provider,
        mode,
      },
      method: 'POST',
      setKey: {
        page: 'paymentRiskList',
        function: 'editDetailPaymentRiskProvider',
      },
      globalLoading: true,
    };
  },
  // 取得目標群組條件設定資料
  GET_TARGET_GROUP: ({ merchantGroup, merchant }) => {
    return {
      url: 'getTargetGroupPaymentRisk',
      params: {
        merchantGroup,
        merchant,
      },
      method: 'POST',
      setKey: {
        page: 'paymentRiskList',
        function: 'getTargetGroupPaymentRisk',
      },
      globalLoading: true,
    };
  },
  // 編輯目標群組條件設定資料
  EDIT_TARGET_GROUP: ({
    merchantGroup,
    merchant,
    categoryName,
    updateFrequency,
    data,
  }) => {
    return {
      url: 'editTargetGroupPaymentRisk',
      params: {
        merchantGroup,
        merchant,
        categoryName,
        updateFrequency,
        data,
      },
      method: 'POST',
      setKey: {
        page: 'paymentRiskList',
        function: 'editTargetGroupPaymentRisk',
      },
      globalLoading: true,
    };
  },
};

//風控管理 風控警報
export const RISK_ALERTS = {
  //警報列表
  GET_RISK_ALERT_CONDITION: params => ({
    url: 'getRiskAlertCondition',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlerts',
      function: 'riskAlertsCondition',
    },
    globalLoading: true,
  }),

  GET_RISK_ALERT_PLAYERS: params => ({
    url: 'getRiskAlertPlayers',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlerts',
      function: 'riskAlertsPlayers',
    },
    globalLoading: true,
  }),
  //取得警報設置列表
  GET_RISK_ALERT_LIST: params => ({
    url: 'getRiskAlertList',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlertsEdit',
      function: 'riskAlertList',
    },
    globalLoading: true,
  }),

  //修改指定警報設置資料
  EDIT_RISK_ALERT_LIST: params => ({
    url: 'editRiskAlertList',
    params,
    method: 'POST',
    setKey: {
      page: 'riskAlertsEditMark',
      function: 'editRiskAlertList',
    },
    globalLoading: true,
  }),
  //警報註記 取得該player觸發的警報名稱列表
  GET_ALERT_NAME_LIST: params => ({
    url: 'getAlertNameList',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlertsEditMark',
      function: 'playerNameList',
    },
    globalLoading: true,
  }),
  //警報註記 取得該player在特定警報名稱下觸發的警報列表名稱
  GET_PLAYER_ALERTS: params => ({
    url: 'getPlayerAlerts',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlertsEditMark',
      function: 'playerAlerts',
    },
    globalLoading: true,
  }),

  SAVE_PLAYER_ALERT_DATA: params => ({
    url: 'savePlayerAlertData',
    params,
    setKey: {
      page: 'riskAlertsEditMark',
      function: 'savePlayerAlertData',
    },
    method: 'POST',
    withoutAuth: false,
    globalLoading: true,
  }),
};

export const PLAYER_RESTRICTIONS = {
  GET_PLAYER_LIST: params => ({
    url: 'getPlayerList',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'playerRestrictions',
      function: 'playerList',
    },
    globalLoading: true,
  }),
  GET_PLAYER_ALERTS_DETAIL: params => ({
    url: 'getPlayerAlertsDetail',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlertsEditMark',
      function: 'playerAlertsDetail',
    },
    globalLoading: true,
  }),
  GET_PLAYER_ALERTS_PRODUCT: params => ({
    url: 'getPlayerAlertsProduct',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlertsEditMark',
      function: 'playerAlertsProduct',
    },
    globalLoading: true,
  }),
  GET_PLAYER_ALERTS_LOG: params => ({
    url: 'getPlayerAlertsLog',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlertsEditMark',
      function: 'playerAlertsLog',
    },
    globalLoading: false,
  }),
  SAVE_PLAYER_RESTRIC_DETAIL: params => ({
    url: 'savePlayerRestricDetail',
    params,
    method: 'POST',
    withoutAuth: false,
    setKey: {
      page: 'riskAlertsEditMark',
      function: 'savePlayerRestricDetail',
    },
    globalLoading: true,
  }),
};

//玩家管理 玩家列表
export const PLAYER_LISTS = {
  GET_PLAYER_LISTS: params => ({
    url: 'getPlayerLists',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getPlayerLists',
    },
    globalLoading: true,
  }),
  UPGRADE_LEVEL_ONE: params => ({
    url: 'upgradeLevelOne',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'upgradeLevelOne',
    },
  }),
  EDIT_UPLINE: params => ({
    url: 'editUpline',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'editUpline',
    },
  }),
  EDIT_ACCESS_LIMIT: params => ({
    url: 'editAccessLimit',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'editAccessLimit',
    },
  }),
  EDIT_PLAYER_UNLOCK: params => ({
    url: 'editPlayerUnlock',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'editPlayerUnlock',
    },
  }),
  GET_TOPLINE_ACCOUNT: params => ({
    url: 'checkTopLineAccount',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'checkTopLineAccount',
    },
  }),
  GET_PLAYER_DETAILS: params => ({
    url: 'getPlayerDetails',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getPlayerDetails',
    },
  }),
  GET_PLAYER_ODDS_RANGE: params => ({
    url: 'getPlayerOddsRange',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerListsAdd',
      function: 'getPlayerOddsRange',
    },
  }),
  GET_TOPLINE_ODDS_RANGE: params => ({
    url: 'getToplineOddsRange',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerListsAdd',
      function: 'getToplineOddsRange',
    },
  }),
  //編輯玩家
  ADD_NEW_PLAYER: params => ({
    url: 'addNewPlayer',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerListsAdd',
      function: 'addNewPlayer',
    },
  }),
  EDIT_PLAYER_BASIC: params => ({
    url: 'editPlayerBasic',
    params,
    method: 'POST',
    setKey: {
      page: 'RiskAlertsEditMark',
      function: 'editPlayerBasic',
    },
  }),
  //玩家信息
  GET_PLAYER_PROFILE: params => ({
    url: 'getPlayerProfile',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getPlayerProfile',
    },
    globalLoading: true,
  }),
  GET_PLAYER_DEPOSIT: params => ({
    url: 'getPlayerDeposit',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getPlayerDeposit',
    },
    globalLoading: true,
  }),
  GET_GAME_REPORT: params => ({
    url: 'getGameReport',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getGameReport',
    },
    globalLoading: true,
  }),
  GET_WALLET_LIST: params => ({
    url: 'getWalletList',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getWalletList',
    },
    globalLoading: true,
  }),
  GET_WALLET_VALUE: params => ({
    url: 'getWalletValue',
    params,
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getWalletValue',
    },
  }),
  GET_BANK_CARD_LIST: params => ({
    url: 'getBankCardList',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'getBankCardList',
    },
    globalLoading: true,
  }),
  DELETE_BANK_CARD: params => ({
    url: 'deleteBankCard',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'deleteBankCard',
    },
    globalLoading: true,
  }),
  GET_TIME_LINE_LIST: params => ({
    url: 'getTimeLineList',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'getTimeLineList',
    },
    globalLoading: true,
  }),
  GET_PROMO_LIST: params => ({
    url: 'getPromoList',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'getPromoList',
    },
  }),
  EDIT_PROMO_LIST: params => ({
    url: 'editPromoList',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'editPromoList',
    },
  }),
  GET_DOWN_LINE_LIST: params => ({
    url: 'getDownLineList',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'getDownLineLIst',
    },
  }),
  SEND_MESSAGE: params => ({
    url: 'sendMessage',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'sendMessage',
    },
  }),
  EDIT_UNBIND: params => ({
    url: 'editUnbind',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'editUnbind',
    },
  }),
  UNLOCK_LOGIN: params => ({
    url: 'unlockLogin',
    params,
    setKey: {
      page: 'PlayerLists',
      function: 'unlockLogin',
    },
  }),
  // 玩家紀錄 取得今日入款總金額
  GET_TOTAL_DEPOSIT: ({ merchantGroup, merchant, playerUserName }) => ({
    url: 'getTotalDeposit',
    params: {
      merchantGroup,
      merchant,
      playerUserName,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getTotalDeposit',
    },
    globalLoading: true,
  }),
  // 玩家紀錄 取得今日出款總金額
  GET_TOTAL_WITHDRAWALS: ({ merchantGroup, merchant, playerUserName }) => ({
    url: 'getTotalWithdrawals',
    params: {
      merchantGroup,
      merchant,
      playerUserName,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getTotalWithdrawals',
    },
    globalLoading: true,
  }),
  // 玩家紀錄 取得資金流水列表
  GET_CAPITAL_FLOW_LIST: ({
    status,
    merchantGroup,
    merchant,
    playerUserName,
    datePicker,
    currentPage,
    quantityPerPage,
  }) => ({
    url: 'getCapitalFlowList',
    params: {
      status,
      merchantGroup,
      merchant,
      playerUserName,
      datePicker,
      currentPage,
      quantityPerPage,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getCapitalFlowList',
    },
    globalLoading: true,
  }),
  // 玩家紀錄 取得今日投注記錄總金額
  GET_TOTAL_BETTING_RECORD: ({ merchantGroup, merchant, playerUserName }) => ({
    url: 'getTotalBettingRecord',
    params: {
      merchantGroup,
      merchant,
      playerUserName,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getTotalBettingRecord',
    },
    globalLoading: true,
  }),
  // 其他信息 取得 平台表現 圖檔資料
  GET_PLAYER_CHART_DATA: ({
    merchantGroup,
    merchant,
    peopleRange,
    timeRange,
    dateFrequency,
    gameType,
  }) => ({
    url: 'getPlayerChartData',
    params: {
      merchantGroup,
      merchant,
      peopleRange,
      timeRange,
      dateFrequency,
      gameType,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getPlayerChartData',
    },
    globalLoading: true,
  }),
  // 其他信息 取得 產品表現 圖檔資料
  GET_PLAYER_CHART_DATA2: ({
    merchantGroup,
    merchant,
    peopleRange,
    timeRange,
    dateFrequency,
    gameType,
  }) => ({
    url: 'getPlayerChartData2',
    params: {
      merchantGroup,
      merchant,
      peopleRange,
      timeRange,
      dateFrequency,
      gameType,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getPlayerChartData2',
    },
    globalLoading: true,
  }),
  // 其他信息 取得全部下級人數
  GET_TOTAL_DOWN_LINE_COUNT: ({ merchantGroup, merchant, peopleRange }) => ({
    url: 'getTotalDownLineCount',
    params: {
      merchantGroup,
      merchant,
      peopleRange,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getTotalDownLineCount',
    },
    globalLoading: true,
  }),
  // 其他信息 取得全部遊戲類型
  GET_GAME_TYPE: ({ merchantGroup, merchant }) => ({
    url: 'getGameType',
    params: {
      merchantGroup,
      merchant,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getGameType',
    },
    globalLoading: true,
  }),
  // 玩家服務 金額調整 取得總資產、鎖定金額
  GET_TOTAL_ASSETS_AMOUNT: ({ merchantGroup, merchant, playerID }) => ({
    url: 'getTotalAssetsAmount',
    params: {
      merchantGroup,
      merchant,
      playerID,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'getTotalAssetsAmount',
    },
    globalLoading: true,
  }),
  // 玩家服務 金額調整 設定玩家服務的金額調整
  EDIT_AMOUNT_ADJUSTMENT: ({
    merchantGroup,
    merchant,
    playerID,
    value,
    noted,
  }) => ({
    url: 'editAmountAdjustment',
    params: {
      merchantGroup,
      merchant,
      playerID,
      value,
      noted,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'editAmountAdjustment',
    },
    globalLoading: true,
  }),
  // 玩家服務 錢包轉帳 設定玩家服務的錢包轉帳
  EDIT_WALLET_TRANSFER: ({
    merchantGroup,
    merchant,
    playerID,
    type,
    walletID,
    value,
    noted,
  }) => ({
    url: 'editWalletTransfer',
    params: {
      merchantGroup,
      merchant,
      playerID,
      type,
      walletID,
      value,
      noted,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'editWalletTransfer',
    },
    globalLoading: true,
  }),
  // 玩家服務 提交充值 設定玩家服務的提交充值
  EDIT_APPLY_FOR_RECHARGE: ({
    merchantGroup,
    merchant,
    playerID,
    playerName,
    paymentType,
    paymentOption,
    amount,
    noted,
  }) => ({
    url: 'editApplyForRecharge',
    params: {
      merchantGroup,
      merchant,
      playerID,
      playerName,
      paymentType,
      paymentOption,
      amount,
      noted,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'editApplyForRecharge',
    },
    globalLoading: true,
  }),
  // 玩家服務 提交提款 設定玩家服務的提交提款
  EDIT_APPLY_FOR_WITHDRAWAL: ({
    merchantGroup,
    merchant,
    playerID,
    amount,
    bankCardName,
    noted,
  }) => ({
    url: 'editApplyForWithdrawal',
    params: {
      merchantGroup,
      merchant,
      playerID,
      amount,
      bankCardName,
      noted,
    },
    method: 'POST',
    setKey: {
      page: 'PlayerLists',
      function: 'editApplyForWithdrawal',
    },
    globalLoading: true,
  }),
};

// 系统设置 商家设置
export const MERCHANT = {
  GET_INFO: params => ({
    url: `getMerchantInfo/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '商家设置',
      function: 'getMerchantInfo',
    },
  }),
  EDIT_INFO: params => ({
    url: 'editMerchantInfo',
    params,
    method: 'POST',
    setKey: {
      page: '商家设置',
      function: 'editMerchantInfo',
    },
  }),
  // 日志管理 取得日志清單
  GET_LOG_LIST_INFO: ({
    status,
    merchantGroup,
    merchant,
    playerID,
    currentPage,
    quantityPerPage,
    sortBySubmitDate,
  }) => ({
    url: 'getLogListInfo',
    params: {
      status,
      merchantGroup,
      merchant,
      playerID,
      currentPage,
      quantityPerPage,
      sortBySubmitDate,
    },
    method: 'POST',
    setKey: {
      page: '商家设置',
      function: 'getLogListInfo',
    },
    globalLoading: true,
  }),
};
// 游戏设置 游戏列表
export const LOTTERY = {
  GET_LIST: params => ({
    url: `getLotteryList/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '游戏列表',
      function: 'getLotteryList',
    },
  }),
  GET_GROUP: params => ({
    url: `getLotteryGroup/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '游戏列表',
      function: 'getLotteryGroup',
    },
  }),
  ADD: params => ({
    url: `addLottery/${params.merchantID}`,
    params,
    method: 'POST',
    setKey: {
      page: '游戏列表',
      function: 'addLottery',
    },
  }),
  GET_SETTINGS: params => ({
    url: `getLotterySettings/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '游戏列表',
      function: 'getLotterySettings',
    },
  }),
  EDIT_SETTINGS: params => ({
    url: `editLotterySettings/${params.merchantID}`,
    params,
    method: 'POST',
    setKey: {
      page: '游戏列表',
      function: 'editLotterySettings',
    },
  }),
  EDIT_STATUS: params => ({
    url: `editLotteryStatus/${params.merchantID}`,
    params,
    method: 'POST',
    setKey: {
      page: '游戏列表',
      function: 'editLotteryStatus',
    },
  }),
};
// 游戏设置 菜单设置
export const MENU_SETTINGS = {
  GET_NORMAL_LOTTERIES: params => ({
    url: `getNormalLotteries/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '菜单设置',
      function: 'getNormalLotteries',
    },
  }),
  GET: params => ({
    url: `getMenuSettings/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '菜单设置',
      function: 'getMenuSettings',
    },
  }),
  EDIT: params => ({
    url: 'editMenuSettings',
    params,
    method: 'POST',
    setKey: {
      page: '菜单设置',
      function: 'editMenuSettings',
    },
  }),
};
// 游戏管理
export const GAME_MANAGEMENT = {
  GET_CATEGORIES: params => ({
    url: `getGameCategories/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '游戏管理',
      function: 'getGameCategories',
    },
  }),
  GET_LIST: params => ({
    url: `getGameList/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '游戏管理',
      function: 'getGameList',
    },
  }),
  GET_DASHBOARD: params => ({
    url: `getDashboard/${params.merchantID}`,
    params,
    method: 'GET',
    setKey: {
      page: '游戏管理',
      function: 'getDashboard',
    },
    globalLoading: false,
  }),
  RESET_POOL: params => ({
    url: `resetPool/${params.merchantID}`,
    params,
    method: 'POST',
    setKey: {
      page: '游戏管理',
      function: 'resetPool',
    },
  }),
  MANUAL_DRAW: params => ({
    url: `manualDraw/${params.merchantID}`,
    params,
    method: 'POST',
    setKey: {
      page: '游戏管理',
      function: 'manualDraw',
    },
  }),
  REVOKE_DRAW: params => ({
    url: `revokeDraw/${params.merchantID}`,
    params,
    method: 'POST',
    setKey: {
      page: '游戏管理',
      function: 'revokeDraw',
    },
  }),
  CORRECT_DRAW: params => ({
    url: `correctDraw/${params.merchantID}`,
    params,
    method: 'POST',
    setKey: {
      page: '游戏管理',
      function: 'correctDraw',
    },
  }),
};
// 通訊系統
export const COMMUNICATION = {
  // 取得收件箱 清單列表
  GET_INBOX_LIST: ({
    status,
    merchantGroup,
    merchant,
    playerID,
    currentPage,
    quantityPerPage,
    sortBySubmitDate,
  }) => ({
    url: 'getInBoxList',
    params: {
      status,
      merchantGroup,
      merchant,
      playerID,
      currentPage,
      quantityPerPage,
      sortBySubmitDate,
    },
    method: 'POST',
    setKey: {
      page: 'Communication',
      function: 'getInBoxList',
    },
    globalLoading: true,
  }),
  // 取得已發送 清單列表
  GET_SEND_MAIL_LIST: ({
    status,
    merchantGroup,
    merchant,
    playerID,
    currentPage,
    quantityPerPage,
    sortBySubmitDate,
  }) => ({
    url: 'getSendMailList',
    params: {
      status,
      merchantGroup,
      merchant,
      playerID,
      currentPage,
      quantityPerPage,
      sortBySubmitDate,
    },
    method: 'POST',
    setKey: {
      page: 'Communication',
      function: 'getSendMailList',
    },
    globalLoading: true,
  }),
  // 取得公告清單列表
  GET_ANNOUNCEMENT_LIST: ({
    status,
    merchantGroup,
    merchant,
    playerID,
    currentPage,
    quantityPerPage,
    sortBySubmitDate,
  }) => ({
    url: 'getAnnouncementList',
    params: {
      status,
      merchantGroup,
      merchant,
      playerID,
      currentPage,
      quantityPerPage,
      sortBySubmitDate,
    },
    method: 'POST',
    setKey: {
      page: 'Communication',
      function: 'getAnnouncementList',
    },
    globalLoading: true,
  }),
};

const AxiosAPI = {
  DEPOSIT_LIST,
  WITHDRAWALS_LIST,
  BANK_LIST,
  GATEWAY_LIST,
  RISK_ALERTS,
  PLAYER_LISTS,
  PLAYER_RESTRICTIONS,
};

export default AxiosAPI;
