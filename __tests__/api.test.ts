/**
 * @jest-environment jsdom
 */
import _ from "../src";

test("모듈은 기본 내보내기", () => {
  expect(_).toBeTruthy();
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.fetch).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.pick).toBe("function");
});

test("모듈에 포함된 함수 확인", () => {
  expect(typeof _.omit).toBe("function");
});

test("Selector 동작 확인", () => {
  const $divElement = document.createElement("div");
  $divElement.innerHTML = `<button class='test-btn'>Continue</button>`;
  document.body.appendChild($divElement);

  const $buttonElement = _("button.test-btn");
  expect($buttonElement).toBeTruthy();

  document.body.removeChild($divElement);
});

test("insertHTML 함수가 동작한다.", () => {
  const $divElement = document.createElement("div");
  $divElement.setAttribute("class", "target-elem");
  document.body.appendChild($divElement);

  const $targetElement = _("div.target-elem");
  $targetElement?.insertHTML('<button class="test-btn">button</button>');
  const $buttonElement = _("button.test-btn");
  expect($buttonElement).toBeTruthy();

  document.body.removeChild($divElement);
});

test("show 함수가 동작한다.", () => {
  const $divElement = document.createElement("div");
  $divElement.setAttribute("class", "target-elem");
  $divElement.style.display = "none";
  document.body.appendChild($divElement);

  const $targetElement = _("div.target-elem");
  $targetElement?.show(); // TODO
  expect($targetElement?.style.display).toBe("block");

  document.body.removeChild($divElement);
});

test("hide 함수가 동작한다.", () => {
  const $divElement = document.createElement("div");
  $divElement.setAttribute("class", "target-elem");
  document.body.appendChild($divElement);

  const $targetElement = _("div.target-elem");
  $targetElement?.hide(); // TODO
  expect($targetElement?.style.display).toBe("none");

  document.body.removeChild($divElement);
});

test("addEvent 함수가 동작한다.", () => {
  const $divElement = document.createElement("div");
  $divElement.setAttribute("class", "target-elem");
  document.body.appendChild($divElement);

  const $targetElement = _("div.target-elem");
  // TODO
  $targetElement?.addEvent("click", () => {
    const $newElement = document.createElement("div");
    $newElement.setAttribute("class", "new-element");
    document.body.appendChild($newElement);
  });
  $targetElement?.click();
  const $newElement = _("div.new-element");
  expect($newElement).toBeTruthy();

  document.body.removeChild($divElement);
  $newElement && document.body.removeChild($newElement);
});
