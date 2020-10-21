import React from 'react';
import store from 'Redux/store';
import { Provider } from 'react-redux';
import Notification from 'Layout/Notification';
import Demo from './demo';

export default {
  title: 'INP-EBO | 統一版型組件/Notification',
};

export const span_with_two_button = () => (
  <Provider store={store}>
    <Notification />
    <Demo styleDemo="style-1" />
  </Provider>
);
