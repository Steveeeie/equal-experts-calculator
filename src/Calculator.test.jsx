import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Calculator } from './Calculator';

let one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  zero,
  decimal,
  times,
  divide,
  plus,
  minus,
  equals,
  allClear,
  clearEntry,
  currentEquation,
  previousEquation;

beforeEach(() => {
  const { getByTestId } = render(<Calculator />);
  one = getByTestId('button-1');
  two = getByTestId('button-2');
  three = getByTestId('button-3');
  four = getByTestId('button-4');
  five = getByTestId('button-5');
  six = getByTestId('button-6');
  seven = getByTestId('button-7');
  eight = getByTestId('button-8');
  nine = getByTestId('button-9');
  zero = getByTestId('button-0');
  decimal = getByTestId('button-decimal');
  times = getByTestId('button-times');
  divide = getByTestId('button-divide');
  plus = getByTestId('button-plus');
  minus = getByTestId('button-minus');
  equals = getByTestId('button-equals');
  allClear = getByTestId('button-ac');
  clearEntry = getByTestId('button-ce');
  currentEquation = getByTestId('current-equation');
  previousEquation = getByTestId('previous-equation');
});

describe('Calculator', () => {
  test('renders with the correct styles applied', () => {
    expect(one).toHaveStyleRule('background-color', '#444444');
    expect(times).toHaveStyleRule('background-color', '#fc6c12');
    expect(equals).toHaveStyleRule('background-color', '#1795d4');
    expect(allClear).toHaveStyleRule('background-color', '#333333');
  });

  test('renders with a zero added to the equation', () => {
    expect(currentEquation.innerHTML).toBe('0');
  });

  test('adding a number to the initial equation removes the zero', () => {
    fireEvent.click(one);
    expect(currentEquation.innerHTML).toBe('1');
  });

  test('can add each of the numbers to the equation', () => {
    fireEvent.click(one);
    fireEvent.click(two);
    fireEvent.click(three);
    fireEvent.click(four);
    fireEvent.click(five);
    fireEvent.click(six);
    fireEvent.click(seven);
    fireEvent.click(eight);
    fireEvent.click(nine);
    fireEvent.click(zero);
    expect(currentEquation.innerHTML).toBe('1234567890');
  });

  test('adding a decimal to the intial equation does not remove the zero', () => {
    fireEvent.click(decimal);
    expect(currentEquation.innerHTML).toBe('0.');
  });

  test('can add a decimal to a value', () => {
    fireEvent.click(one);
    fireEvent.click(decimal);
    fireEvent.click(two);
    expect(currentEquation.innerHTML).toBe('1.2');
  });

  test('can not add multiple decimals to a value', () => {
    fireEvent.click(one);
    fireEvent.click(decimal);
    fireEvent.click(decimal);
    fireEvent.click(two);
    expect(currentEquation.innerHTML).toBe('1.2');
  });

  test('adding a decimal after adding an operator prefixes the decimal with a 0', () => {
    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(decimal);
    expect(currentEquation.innerHTML).toBe('1 + 0.');
  });

  test('can add numbers', () => {
    fireEvent.click(one);
    fireEvent.click(plus);
    fireEvent.click(two);
    fireEvent.click(equals);
    expect(previousEquation.innerHTML).toBe('1 + 2 =');
    expect(currentEquation.innerHTML).toBe('3');
  });

  test('can subtract numbers', () => {
    fireEvent.click(two);
    fireEvent.click(minus);
    fireEvent.click(one);
    fireEvent.click(equals);
    expect(previousEquation.innerHTML).toBe('2 - 1 =');
    expect(currentEquation.innerHTML).toBe('1');
  });

  test('can multiple numbers', () => {
    fireEvent.click(two);
    fireEvent.click(times);
    fireEvent.click(two);
    fireEvent.click(equals);
    expect(previousEquation.innerHTML).toBe('2 * 2 =');
    expect(currentEquation.innerHTML).toBe('4');
  });

  test('can divide numbers', () => {
    fireEvent.click(two);
    fireEvent.click(divide);
    fireEvent.click(two);
    fireEvent.click(equals);
    expect(previousEquation.innerHTML).toBe('2 / 2 =');
    expect(currentEquation.innerHTML).toBe('1');
  });

  test('can handle floating point precision issues', () => {
    fireEvent.click(zero);
    fireEvent.click(decimal);
    fireEvent.click(one);
    fireEvent.click(times);
    fireEvent.click(zero);
    fireEvent.click(decimal);
    fireEvent.click(two);
    fireEvent.click(equals);
    expect(previousEquation.innerHTML).toBe('0.1 * 0.2 =');
    expect(currentEquation.innerHTML).toBe('0.02');
  });

  test('can continue equation after submit', () => {
    fireEvent.click(two);
    fireEvent.click(divide);
    fireEvent.click(two);
    fireEvent.click(equals);
    fireEvent.click(plus);
    fireEvent.click(two);
    expect(previousEquation.innerHTML).toBe('Ans = 1');
    expect(currentEquation.innerHTML).toBe('1 + 2');
  });

  test('replaces the last input if it is an operator and a new operator has been added', () => {
    fireEvent.click(two);
    fireEvent.click(divide);
    fireEvent.click(plus);
    expect(currentEquation.innerHTML).toBe('2 +');
  });

  test('removes any trailing operators on equals', () => {
    fireEvent.click(two);
    fireEvent.click(plus);
    fireEvent.click(equals);
    expect(previousEquation.innerHTML).toBe('2 =');
  });

  test('can reset the calculator by clicking the all clear button', () => {
    fireEvent.click(two);
    fireEvent.click(plus);
    fireEvent.click(equals);
    fireEvent.click(allClear);
    expect(previousEquation.innerHTML).toBe('');
    expect(currentEquation.innerHTML).toBe('0');
  });

  test('can clear the last entry by clicking the clear entry button', () => {
    fireEvent.click(two);
    fireEvent.click(plus);
    fireEvent.click(clearEntry);
    expect(previousEquation.innerHTML).toBe('Ans = 0');
    expect(currentEquation.innerHTML).toBe('2');
  });

  test('completely clearing the equation using the clear entry button shows the last result', () => {
    fireEvent.click(two);
    fireEvent.click(plus);
    fireEvent.click(clearEntry);
    fireEvent.click(clearEntry);
    expect(previousEquation.innerHTML).toBe('');
    expect(currentEquation.innerHTML).toBe('0');
  });
});
