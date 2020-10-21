import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { subscribe, unsubscribe } from 'Redux/interceptor/action';

import pEachSeries from 'p-each-series';
import _ from 'lodash';

export const useInterceptor = handler => {
  const dispatch = useDispatch();
  const handlerRef = useRef();

  const interceptor = (...args) => handlerRef.current(...args);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    _subscribe(interceptor);
    return () => _unsubscribe(interceptor);
  }, []);

  const _subscribe = useCallback(
    interceptor => {
      dispatch(subscribe(interceptor));
    },
    [dispatch]
  );

  const _unsubscribe = useCallback(
    interceptor => {
      dispatch(unsubscribe(interceptor));
    },
    [dispatch]
  );
};

export const useDispatchEvent = () => {
  const { interceptors } = useSelector(state => state.interceptor);

  const _interceptor = async (...args) => {
    if (_.isEmpty(interceptors)) return false;
    try {
      await pEachSeries(interceptors, cb => cb(...args));
      return false;
    } catch (error) {
      return true;
    }
  };

  const dispatchEvent = useCallback(
    async (callback, ...args) => {
      try {
        if (!_.isFunction(callback)) args = [callback, ...args];
        if (await _interceptor(...args)) return true;
        _.isFunction(callback) && callback();
      } catch (error) {
        return false;
      }
    },
    [interceptors]
  );

  return dispatchEvent;
};
