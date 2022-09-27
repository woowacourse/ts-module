const throttle = (interval: number) => {
  let timer: NodeJS.Timeout | null = null;

  return (callback: () => void) => {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
      callback();
    }, interval);
  };
};

export default throttle;
