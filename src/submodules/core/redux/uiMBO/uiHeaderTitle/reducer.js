import { handleActions } from 'redux-actions';
import { setHeaderTitle } from './action';

const initState = {
  title: '',
};

const reducer = handleActions(
  {
    // 設定標頭的標題
    [setHeaderTitle]: (state, { payload }) => {
      state.title = payload;
      return state;
    },
  },
  initState
);

export default reducer;
