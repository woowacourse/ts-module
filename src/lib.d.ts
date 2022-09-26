/**
 * CustomElement는 Element를 확장한 타입이다.
 * CustomElement는 다음과 같은 메서드를 추가로 갖는다.
 *
 * - addEvent
 */
interface CustomElement extends HTMLElement {
  /**
   * Target element에 listener로 전달한 함수를 type 이벤트로 추가한다.
   *
   * @param type - Type은 target 요소에 등록할 이벤트 타입이다.
   * @param listener - Listener는 target 요소의 type 이벤트가 발생했을 때 호출되는 함수이다.
   */
  addEvent: <T extends keyof HTMLElementEventMap>(
    type: T,
    listener: (event?: HTMLElementEventMap[T]) => void,
  ) => void;
}

type IsNil = (value: unknown) => boolean;

type IsNumber = (value: unknown) => boolean;
