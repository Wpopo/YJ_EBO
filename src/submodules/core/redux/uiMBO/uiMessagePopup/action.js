import { createAction } from 'redux-actions';

export const setMessageTitle = createAction('SET_MESSAGE_TITLE');
export const openMessage = createAction('OPEN_MESSAGE');
export const closeMessage = createAction('CLOSE_MESSAGE');
