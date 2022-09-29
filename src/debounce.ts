const debounce = (interval: number) => {
  let timer: NodeJS.Timeout | null = null;

  return (callback: () => void) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, interval);
  };
};

export default debounce;
