import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useImmer } from 'use-immer';
import _ from 'lodash';
import Helper from 'Helper';

const usePopupFilter = ({ defaultValue, validate }) => {
  const [state, setState] = useImmer({ data: { ...defaultValue } });
  const [pass, setPass] = useState(true);
  const { data } = state;

  const register = useCallback(
    key => ({
      value: data[key],
      defaultValue: defaultValue[key],
      onChange: value => setState(state => void (state.data[key] = value)),
    }),
    [data]
  );

  const handleSubmit = useCallback(
    onSubmit => () => {
      onSubmit(data);
    },
    [data]
  );

  const reset = useCallback(() => {
    setState(state => void (state.data = defaultValue));
  }, []);

  const setValue = useCallback((key, value) => {
    setState(state => void (state.data[key] = value));
  }, []);

  useEffect(() => {
    if (validate) {
      let passEach = true;
      Object.keys(validate).forEach(key => {
        if (validate[key](state.data[key]) !== true) {
          passEach = false;
        }
      });
      setPass(passEach);
    } else {
      setPass(true);
    }
  }, [state]);

  return { state, register, handleSubmit, reset, pass, setValue };
};

export default usePopupFilter;

export const validateDateRange = rangeArr => {
  if (rangeArr[1] === null && rangeArr[0] === null) return true;
  else return rangeArr[1] && rangeArr[0] && rangeArr[1] - rangeArr[0] >= 0;
};

export const validateIp = ipArr => {
  if (
    validateArr(ipArr, el => {
      return el === null || el === '';
    })
  )
    return true;
  else {
    return (
      validateArr(ipArr, el => !Helper.number.isNaN(el)) &&
      validateArr(ipArr, el => el > 0 && el < 256)
    );
  }
};

const validateArr = (arr = [], validateFn = v => null) => {
  if (!Array.isArray(arr)) return false;
  else if (arr.length === 0) return true;
  else {
    let tag = true;
    for (let el of arr) {
      if (!validateFn(el)) tag = false;
    }
    return tag;
  }
};
