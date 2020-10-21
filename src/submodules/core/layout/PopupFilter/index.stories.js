import React, { useState, useEffect } from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import zhCNLocale from 'date-fns/locale/zh-CN';

import PopupFilter from 'Layout/PopupFilter';
import ButtonBase from 'BaseComponent/ButtonBase';

import usePopupFilter from 'Hooks/usePopupFilter';

import { Provider } from 'react-redux';

import store from 'Redux/store';

export default {
  title: 'INP-EBO | 統一版型組件/PopupFilter',
  decorators: [
    StoryFn => {
      return (
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCNLocale}>
            <StoryFn />
          </MuiPickersUtilsProvider>
        </Provider>
      );
    },
  ],
};

const options1 = [
  { value: '1', label: '正常' },
  { value: '2', label: '维护' },
  { value: '3', label: '隐藏' },
];

const options2 = [
  { value: '1', label: '官方游戏' },
  { value: '2', label: '爱码游戏' },
  { value: '3', label: 'QQ游戏' },
];

export const PopupFilterDemo = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { state, register, handleSubmit, reset } = usePopupFilter({
    defaultValue: {
      状态: [options1[1]],
    },
  });

  const handleOpen = e => {
    setAnchorEl(e.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => setOpen(false);

  const onFilter = data => {
    handleClose();
    console.log('筛选', data);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <ButtonBase
          list={[{ value: '筛选', onClick: handleOpen }]}
          size={'xxl'}
          styleType={'style-1'}
        />
        <PopupFilter open={open} anchorEl={anchorEl} onClose={handleClose}>
          <PopupFilter.Header onClick={reset} />
          <PopupFilter.Checkboxes
            label={'状态'}
            options={options1}
            {...register('状态')}
          />
          <PopupFilter.Select
            isMulti
            label={'彩种'}
            options={options2}
            {...register('彩种')}
          />
          <PopupFilter.NumberRange label={'注数'} {...register('注数')} />
          <PopupFilter.DateRange label={'申请时间'} {...register('申请时间')} />
          <PopupFilter.Footer onClick={handleSubmit(onFilter)} />
        </PopupFilter>
      </div>
      <div style={{ flex: 1 }}>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </div>
    </div>
  );
};
