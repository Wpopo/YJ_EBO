import { put, call } from 'redux-saga/effects';

import {
  requestData,
  receiveSuccess,
  receiveFail,
  receiveDone,
} from 'Redux/axios/action';
import { tokenExpired } from 'Redux/identity/action';
import { callApi } from 'Constants/api/apiConfig';
import { IDENTITY } from 'Constants/api/identity';
import { notify } from 'Layout/Notification';

const delay = time => new Promise(resolve => setTimeout(resolve, time));

// 1. 發送 request 前後的 loading 過場
// 2. 發送 request，並存放 response
// 3. 成功失敗要做的事
export function* axiosData(requestProfile) {
  const { setKey } = requestProfile;
  try {
    if (!setKey) throw new Error('Must have setKey');

    yield put(requestData(requestProfile));

    const response = yield call(callApi, requestProfile);

    if (response.success === 'true') {
      // TODO 模擬呼叫API等待時間，帶真正串上API時，此function將移除
      yield call(delay, 200);
      yield put(receiveSuccess({ params: response.data, setKey }));
    } else {
      // TODO 模擬呼叫API等待時間，帶真正串上API時，此function將移除
      yield call(delay, 200);
      yield put(
        receiveFail({
          params: { code: response.code, message: response.message },
          setKey,
        })
      );
    }
    return response;
  } catch (error) {
    notify({ title: 'Failure', text: error.message, type: 'error' });
    if (error.type === tokenExpired().type) {
      setTimeout(() => {
        IDENTITY.LOGOUT();
      }, 3000);
    }
  } finally {
    yield put(receiveDone(requestProfile));
  }
}
