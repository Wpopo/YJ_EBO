import React from 'react';
import { LocalizationProvider } from '@material-ui/pickers';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import zhCNLocale from 'date-fns/locale/zh-CN';

import RouterTree from './submodules/core/router';
import store from 'Redux/store';
import { Provider } from 'react-redux';

import 'Styled/styles.scss';
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css';

import './submodules/core/constants/api/mock';

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={DateFnsAdapter} locale={zhCNLocale}>
        <div className="App">
          <RouterTree />
        </div>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
