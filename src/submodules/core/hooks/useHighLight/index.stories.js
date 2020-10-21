import React, { useEffect } from 'react';

import InputDetailData from 'BaseComponent/InputDetailData';
import useHighLight from './index';

export default {
  title: 'INP-EBO | Hooks/useHighLight',
};

export const highLight = () => {
  // 所有要驗整欄位的 name: 代號; regexp: 正則表達式; value: 初始值
  const params = {
    name1: { regexp: /^[0-9]+$/, value: 0 },
    name2: { regexp: /^[a-z]+$/, value: 'a' },
    name3: { regexp: /^[A-Z]+$/, value: 'A' },
  };
  const { status, compared } = useHighLight(params);

  useEffect(() => {
    console.log('status', status);
  }, [status]);

  const handleChange = (name, value) => {
    compared({ name, value });
  };

  return (
    <>
      <div>
        <InputDetailData
          title="正則：/^[0-9]+$/"
          placeholder="請在此編輯"
          defaultValue={0}
          cusChange={value => handleChange('name1', value)}
          validation={status['name1']}
        />
      </div>
      <div>
        <InputDetailData
          title="正則：/^[a-z]+$/"
          placeholder="請在此編輯"
          defaultValue="a"
          cusChange={value => handleChange('name2', value)}
          validation={status['name2']}
        />
      </div>
      <div>
        <InputDetailData
          title="正則：/^[A-Z]+$/"
          placeholder="請在此編輯"
          defaultValue="A"
          cusChange={value => handleChange('name3', value)}
          validation={status['name3']}
        />
      </div>
    </>
  );
};
