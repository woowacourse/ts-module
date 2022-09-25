/**
 * 이벤트 타입과 이벤트 객체를 매핑하는 객체이다.
 */
type MappedEventType = {
  click: MouseEvent;
  input: Event;
};

export type CustomElement = {
  /**
   * Target element에 listener로 전달한 함수를 type 이벤트로 추가한다.
   *
   * @param type - Type은 target 요소에 등록할 이벤트 타입이다.
   * @param listener - Listener는 target 요소의 type 이벤트가 발생했을 때 호출되는 함수이다.
   */
  addEvent: <T extends keyof MappedEventType>(
    type: T,
    listener: (event?: MappedEventType[T]) => void,
  ) => void;
};
