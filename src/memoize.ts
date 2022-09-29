type Key = string | number;

let cache: any = {};

const search = (path: Array<Key>): any => {
  let temp = cache;
  for (let i = 0; i < path.length; i += 1) {
    const key = path[i];
    if (!temp[key]) {
      // 길이 없으면 insert먼저 해야한다는 의미이므로 null
      return null;
    }
    temp = temp[key];
  }
  return temp;
};

const insert = (val: any, path: Array<Key>) => {
  let temp = cache;
  for (let i = 0; i < path.length; i += 1) {
    const key = path[i];
    if (i === path.length - 1) {
      // 마지막 까지 왔다면 값을 넣는다
      temp[key] = val;
      return;
    }
    temp[key] = {};
    temp = temp[key];
  }
};

const memoize = (valFn: () => any, deps?: Array<string | number>) => {
  if (!deps) {
    if (cache === null) {
      cache = valFn();
    }
    return cache;
  }

  const searchedVal = search(deps);
  if (searchedVal) return searchedVal;

  const val = valFn();
  insert(val, deps);
  return val;
};

export default memoize;
