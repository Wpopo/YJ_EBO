import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const useAxiosSelector2 = (APIFn = v => null) => {
  const { setKey: setKey } = APIFn({});
  const fn = useCallback(
    setKey => state => state.axios.key?.[setKey.page]?.[setKey.function],
    []
  );
  return useSelector(fn(setKey));
};

export default useAxiosSelector2;
