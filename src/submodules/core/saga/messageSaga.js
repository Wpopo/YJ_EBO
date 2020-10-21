import { takeEvery } from 'redux-saga/effects';

export function* closeMessage() {
  yield console.log('close');
}

export function* deleteData() {
  yield console.log('删除');
}
export function* watchCloseMessage() {
  yield takeEvery('CLOSE_MESSAGE', closeMessage);
}

export function* watchDelete() {
  yield takeEvery('DELETE', deleteData);
}
