import React from 'react';
import DatePicker from 'BaseComponent/DatePicker2';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
export default {
  title: 'INP-EBO | 基本組件/DatePicker2',
};
/**
 * @param {string} label
 * @param {function} handleChange
 * @param {Date} defaultDate 預設日期
 * @param {string} invalidDateMessage 格式錯誤提示訊息
 * @param {string} maxDateMessage 日期過大提示訊息
 * @param {string} minDateMessage 日期過小提示訊息
 * @param {boolean} disabled 是否可輸入，預設false
 */

export const datePicker = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      handleChange={date => console.log(date)}
      defaultDate={new Date('09/21/2020')}
    />
  </MuiPickersUtilsProvider>
);
