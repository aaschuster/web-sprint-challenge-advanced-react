import { render, fireEvent } from "@testing-library/react"
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

let squares, coords, steps, up, down, left, right;

function updateSelectors(document) {
  squares = document.querySelectorAll(".square");
  coords = document.querySelector("#coordinates");
  steps = document.querySelector("#steps");

  up = document.querySelector("#up");
  down = document.querySelector("#down");
  left = document.querySelector("#left");
  right = document.querySelector("#right");
}

[AppFunctional, AppClass].forEach((Component, idx) => {

  const label = idx === 0 ? "Functional" : "Class Based";

  beforeEach(() => {
    render(<Component/>)
    updateSelectors(document);
  });

  test(`${label} - active square is initially at index 4`, () => {
    expect(squares[4].textContent).toBe("B");
    expect(squares[4].className).toMatch(/active/);
  })

  test(`${label} - active square is at index 0 after movement`, () => {
    fireEvent.click(up);
    fireEvent.click(left);
    expect(squares[0].textContent).toBe("B");
    expect(squares[0].className).toMatch(/active/);
  })

  test(`${label} - active square is at index 8 after movement`, () => {
    fireEvent.click(down);
    fireEvent.click(right);
    expect(squares[8].textContent).toBe("B");
    expect(squares[8].className).toMatch(/active/);
  })

  test(`${label} - active square is at index 2 after movement, including attempted out of bounds movement`, () => {
    fireEvent.click(up);
    fireEvent.click(right);
    fireEvent.click(right);
    expect(squares[2].textContent).toBe("B");
    expect(squares[2].className).toMatch(/active/);
  })

  test(`${label} - coordinates initially read (2,2)`, () => {
    expect(coords.textContent).toMatch(/\(2.*2\)$/);
  })

  test(`${label} - coordinates read (1, 2) after movement`, () => {
    fireEvent.click(left);
    expect(coords.textContent).toMatch(/\(1.*2\)$/);
  })

  test(`${label} - coordinates read (1, 3) after movement`, () => {
    fireEvent.click(left);
    fireEvent.click(down);
    expect(coords.textContent).toMatch(/\(1.*3\)$/);
  })

  test(`${label} - coordinates read (3, 3) after movement, including attempted out of bounds movement`, () => {
    fireEvent.click(right);
    fireEvent.click(down);
    fireEvent.click(down);
    expect(coords.textContent).toMatch(/\(3.*3\)$/);
  })

  test(`${label} - steps counter intially reads 0`, () => {
    expect(steps.textContent).toBe("You moved 0 times");
  })
})
