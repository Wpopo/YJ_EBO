import { createAction } from 'redux-actions';

// for saga
// 身份驗證失敗，跳轉登入頁
export const tokenExpired = createAction('TOKEN_EXPIRED');
