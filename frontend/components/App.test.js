import { render } from "@testing-library/react"
import React from "react";
import AppClass from "./AppClass";
import AppFunctional from "./AppFunctional";


test('sanity', () => {
  expect(true).toBe(true)
})

test("class based app renders without errors", () => {
  render(<AppClass />);
})

test("functional app renders without errors", () => {
  render(<AppFunctional />);
})

test("functional app is functional", () => {
  expect(AppFunctional.prototype && AppFunctional.prototype.isReactComponent)
    .not.toBeTruthy();
});

test("class based app is class based", () => {
  expect(AppClass.prototype && AppClass.prototype.isReactComponent)
    .toBeTruthy();
});

test("ClassBased - active square is initially at index 4", () => {
  render(<AppClass/>);

  const squares = document.querySelectorAll(".square");
  expect(squares[4].textContent).toBe("B");
  expect(squares[4].className).toMatch(/active/);
})

test("Functional - active square is initially at index 4", () => {
  render(<AppFunctional />);

  const squares = document.querySelectorAll(".square");
  expect(squares[4].textContent).toBe("B");
  expect(squares[4].className).toMatch(/active/);
})