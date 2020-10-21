import React from 'react';
import Flag from 'BaseComponent/Flag';
import stylevariables from 'Styled/styles.scss';

export default {
  title: 'INP-EBO | 基本組件/Flag',
};

export const flag = () => <Flag color={stylevariables.dangerColor}>触发</Flag>;
