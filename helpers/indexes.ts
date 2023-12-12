const getAllIndexes = <T>(arr: Array<T>, value: T): Array<number> => {
  const indexes: Array<number> = [];
  let i = -1;
  while ((i = arr.indexOf(value, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
};

export default getAllIndexes;
