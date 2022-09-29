const clickOutside = (selector: string, callback: () => void) => {
  const element = document.querySelector(selector);
  if (!element) return;
  const handler = (event: MouseEvent) => {
    const path = event.composedPath();
    const hasElementClicked = path.some((p) => p === element);
    !hasElementClicked && callback();
  };
  window.addEventListener("click", handler);

  return () => window.removeEventListener("click", handler);
};

export default clickOutside;
