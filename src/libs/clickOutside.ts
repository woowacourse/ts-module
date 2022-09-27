export default function clickOutside(element: any, callback: any) {
  window.addEventListener('click', callback);
  window.removeEventListener('click', callback);
}
