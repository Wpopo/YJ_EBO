import { combineReducers } from 'redux-immer';
import produce from 'immer';
import uiMBO from './uiMBO/rootReducer';
import user from './user/reducer';
import messagePopup from './messagePopup/reducer';
import axios from './axios/reducer';
import interceptor from './interceptor/reducer';

const rootReducer = combineReducers(produce, {
  messagePopup,
  uiMBO,
  user,
  axios,
  interceptor,
});

export default rootReducer;
