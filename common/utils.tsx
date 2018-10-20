import React from 'react';
import { theme } from '../styledComponents';
import { ThemeProvider } from '../styledComponents';

export const tohash = (l, k) => {
  const list = l || [];
  const key = k || 'id';
  if (!Array.isArray(list)) {
    throw new TypeError('`list` must be of type Array');
  }

  return list.reduce((accum, item) => {
    if (item && item[key] != null) {
      accum[item[key]] = item;
    }
    return accum;
  }, {});
};

export const encodeParams = param => Buffer.from(encodeURIComponent(JSON.stringify(param))).toString('base64');
export const decodeParams = param => JSON.parse(decodeURIComponent(Buffer.from(param, 'base64').toString('ascii')));

export const renderWithTheme = component => <ThemeProvider theme={theme}>{component}</ThemeProvider>;
