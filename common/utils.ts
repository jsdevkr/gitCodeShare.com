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
