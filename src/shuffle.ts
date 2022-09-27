const shuffle = <T>(array: Array<T>): Array<T> => {
  let result = array.slice();
  for (let index = array.length - 1; index > 0; index--) {
    const selectedIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[selectedIndex]] = [
      result[selectedIndex],
      result[index],
    ];
  }
  return result;
};

export default shuffle;
