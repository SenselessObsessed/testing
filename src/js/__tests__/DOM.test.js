import CreditCardWidget from "../CreditCardWidget";

test("should render self", () => {
  document.body.innerHTML = '<div id="container"></div>';
  const container = document.querySelector("#container");
  const widget = new CreditCardWidget(container);

  widget.bindToDOM();

  expect(container.innerHTML).toBe(CreditCardWidget.markup);
});
