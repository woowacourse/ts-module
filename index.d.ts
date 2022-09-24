export {};

declare global {
  interface Element {
    addEvent: (eventType: string, handler: (event: MouseEvent) => void) => void;
  }

  function _(selector: string): Element;

  module _ {
    function isNull(input: unknown): input is null;
    function isNumber(input: unknown): input is Number;
  }
}

export default _;
