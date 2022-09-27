/**
 * 전달된 대상 요소가 아닌 다른 요소가 클릭되었을 때 콜백함수를 호출하는 이벤트 리스너를 추가합니다.
 *
 * @param targetElement 대상 요소
 * @param handler 대상 요소가 아닌 곳이 클릭됐을 때 호출할 콜백 함수
 */
export default function clickOutside(
  targetElement: Element,
  handler: (event: MouseEvent) => void
): void {
  window.addEventListener("click", (e) => {
    if (e.target === targetElement) return;
    handler(e);
  });
}
