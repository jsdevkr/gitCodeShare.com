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

export const renderWithTheme = component => <ThemeProvider theme={theme}>{component}</ThemeProvider>;
