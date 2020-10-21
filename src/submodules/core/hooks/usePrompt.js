import { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatchEvent } from './useInterceptor';

import _ from 'lodash';

const usePrompt = callback => {
  const history = useHistory();
  const dispatchEvent = useDispatchEvent();
  const [pass, setPass] = useState(false);

  const handleMessage = (location, action) => {
    console.log('location', location);
    if (!pass) {
      dispatchEvent(() => {
        setPass(true);
        history.push(location);
      }, action);
    }
    return pass;
  };

  return {
    message: handleMessage,
  };
};

export default usePrompt;
