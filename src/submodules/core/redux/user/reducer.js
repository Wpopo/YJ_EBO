import { handleActions } from 'redux-actions';
import { setUserName, removeUserName } from './action';

const initState = {
  userName: '',
  permission: {
    enterprise: false,
  },
};

const reducer = handleActions(
  {
    // 設定User名稱
    [setUserName]: (state, { payload }) => {
      state.userName = payload;
      return state;
    },
    // User登出
    [removeUserName]: state => {
      state.userName = '';
      state.permission.enterprise = false;
      return state;
    },
  },
  initState
);

export default reducer;
