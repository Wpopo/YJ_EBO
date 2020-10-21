import { takeEvery, call } from 'redux-saga/effects';
import { PLAYER_RESTRICTIONS as API } from 'Constants/api/api';
import { axiosData } from './axiosSaga';
import { getPlayerListAction } from 'Redux/axios/action';

function* getPlayerList({ payload }) {
  console.log('取得受限制的player列表 API11-1, param:', payload);
  yield call(axiosData, API.GET_PLAYER_LIST(payload));
}

export function* watchPlayerRestrictions() {
  yield takeEvery(getPlayerListAction, getPlayerList);
}
