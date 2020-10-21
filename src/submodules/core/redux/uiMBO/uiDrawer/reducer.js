import { handleActions } from 'redux-actions';
import { openDrawer, closeDrawer } from './action';

const initState = {
  open: false,
};

const reducer = handleActions(
  {
    [openDrawer]: state => {
      state.open = true;
      return state;
    },
    [closeDrawer]: state => {
      state.open = false;
      return state;
    },
  },
  initState
);

export default reducer;
