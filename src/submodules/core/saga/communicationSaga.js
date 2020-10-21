import { takeEvery, call } from 'redux-saga/effects';
import { COMMUNICATION as API } from 'Constants/api/api';
import {
  getInBoxList,
  getSendMailList,
  getAnnouncementList,
} from 'Redux/axios/action';
import { axiosData } from './axiosSaga';

// 取得收件箱清單列表
function* getInBoxListFn({ payload }) {
  console.log('取得收件箱清單列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_INBOX_LIST(payload));
}
// 取得已發送清單列表
function* getSendMailListFn({ payload }) {
  console.log('取得已發送清單列表, param:');
  console.log(payload);

  yield call(axiosData, API.GET_SEND_MAIL_LIST(payload));
}
// 取得公告列表清單
function* getAnnouncementListFn({ payload }) {
  console.log('取得公告列表清單, param:');
  console.log(payload);

  yield call(axiosData, API.GET_ANNOUNCEMENT_LIST(payload));
}

export function* watchCommunication() {
  yield takeEvery(getInBoxList, getInBoxListFn);
  yield takeEvery(getSendMailList, getSendMailListFn);
  yield takeEvery(getAnnouncementList, getAnnouncementListFn);
}
