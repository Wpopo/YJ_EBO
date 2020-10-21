import { handleActions } from 'redux-actions';
import { setMessageTitle, openMessage, closeMessage } from './action';

const initState = {
  title: '',
  switch: false,
};

const reducer = handleActions(
  {
    // 開啟彈跳視窗
    [openMessage]: state => {
      state.switch = true;
      return state;
    },
    // 關閉彈跳視窗
    [closeMessage]: state => {
      state.switch = false;
      return state;
    },
    // 設定彈跳視窗的標題
    [setMessageTitle]: (state, { payload }) => {
      state.title = payload;
      return state;
    },
  },
  initState
);

export default reducer;
