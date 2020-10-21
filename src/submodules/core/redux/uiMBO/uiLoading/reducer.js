import { handleActions } from 'redux-actions';
import { setLoading, setLoaded } from './action';

const initState = {
  loading: false,
};

const reducer = handleActions(
  {
    [setLoading]: state => {
      state.loading = true;
      return state;
    },
    [setLoaded]: state => {
      state.loading = false;
      return state;
    },
  },
  initState
);

export default reducer;
