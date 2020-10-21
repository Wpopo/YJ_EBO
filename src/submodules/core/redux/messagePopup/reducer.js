import { handleActions } from 'redux-actions';
import { setContent, setParams, clearParams } from './action';

const initState = {
  content: [],
  params: {},
};

const reducer = handleActions(
  {
    // 設定彈跳視窗Footer Config
    [setContent]: (state, { payload }) => {
      state.content = payload;
      return state;
    },
    [setParams]: (state, { payload }) => {
      state.params = payload;
      return state;
    },
    [clearParams]: state => {
      state.params = {};
      return state;
    },
  },
  initState
);

export default reducer;
