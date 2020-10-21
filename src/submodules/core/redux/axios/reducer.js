import { handleActions } from 'redux-actions';
import {
  requestData,
  receiveSuccess,
  receiveFail,
  receiveDone,
} from './action';

const initState = {
  key: {},
  error: {},
  scopeLoading: {},
  globalLoading: false,
};

const reducer = handleActions(
  {
    // 開始讀取資料
    [requestData]: (
      state,
      { payload: { setKey, globalLoading = true, ...payload } }
    ) => {
      if (globalLoading) {
        // 顯示整頁 loading 過場
        state.globalLoading = true;
      } else {
        state.scopeLoading[setKey.page] = {
          ...state.scopeLoading[setKey.page],
        };
        // 個別顯示區域 loading 過場
        state.scopeLoading[setKey.page][setKey.function] = true;
      }
      return state;
    },

    //取得成功
    [receiveSuccess]: (state, { payload: { setKey, params } }) => {
      if (
        typeof state.error[setKey.page] !== 'undefined' &&
        typeof state.error[setKey.page][setKey.function] !== 'undefined'
      )
        delete state.error[setKey.page][setKey.function];

      state.key[setKey.page] = { ...state.key[setKey.page] };
      state.key[setKey.page][setKey.function] = params;
      return state;
    },

    //取得成功，但後端回傳失敗的結果
    [receiveFail]: (state, { payload: { setKey, params } }) => {
      if (
        typeof state.key[setKey.page] !== 'undefined' &&
        typeof state.key[setKey.page][setKey.function] !== 'undefined'
      )
        delete state.key[setKey.page][setKey.function];

      state.error[setKey.page] = { ...state.error[setKey.page] };
      state.error[setKey.page][setKey.function] = params;
      return state;
    },

    // 取得完成
    [receiveDone]: (
      state,
      { payload: { setKey, globalLoading = true, ...payload } }
    ) => {
      if (globalLoading) {
        // 關閉整頁 loading 過場
        state.globalLoading = false;
      } else {
        // 關閉個別區域 loading 過場
        state.scopeLoading[setKey.page][setKey.function] = false;
      }
      return state;
    },
  },
  initState
);

export default reducer;
