import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import _ from 'lodash';

const useAxiosSelector = page => {
  const data = useSelector(state => state.axios.key[page]);

  const selector = useCallback(
    (path, defaultValue) => {
      return _.get(data, `${path}`, defaultValue);
    },
    [page, data]
  );

  return selector;
};

export default useAxiosSelector;
