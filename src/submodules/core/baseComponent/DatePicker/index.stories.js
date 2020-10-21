import React from 'react';
import DatePicker from 'BaseComponent/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
export default {
  title: 'INP-EBO | 基本組件/DatePicker',
};
/**
 * @param {string} label
 * @param {function} handleChange
 * @param {Date} value
 */

export const datePicker = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
      handleChange={date => console.log(date)}
      defaultDate={new Date('09/21/2020')}
    />
  </MuiPickersUtilsProvider>
);
