import produce from 'immer';
import { handleActions } from 'redux-actions';
import { subscribe, unsubscribe } from './action';

const initState = {
  interceptors: [],
};

const reducer = handleActions(
  {
    [subscribe]: produce((state, { payload }) => {
      state.interceptors.push(payload);
    }),
    [unsubscribe]: produce((state, { payload }) => {
      state.interceptors = state.interceptors.filter(cb => cb !== payload);
    }),
  },
  initState
);

export default reducer;
