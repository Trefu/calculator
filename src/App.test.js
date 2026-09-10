import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { compute, formatResult, initialState } from './calc';

const FCC_IDS = [
  'display', 'clear', 'equals', 'decimal', 'zero',
  'one', 'two', 'three', 'four', 'five', 'six',
  'seven', 'eight', 'nine',
  'add', 'subtract', 'multiply', 'divide',
];

const click = (id) => userEvent.click(document.getElementById(id));
const display = () => document.getElementById('display').textContent;

// ---- pure helpers ----

test('compute handles the four basic operators', () => {
  expect(compute(2, '+', 3)).toBe(5);
  expect(compute(9, '-', 4)).toBe(5);
  expect(compute(6, '*', 7)).toBe(42);
  expect(compute(8, '/', 2)).toBe(4);
});

test('compute returns NaN on division by zero', () => {
  expect(Number.isNaN(compute(5, '/', 0))).toBe(true);
});

test('formatResult handles divide-by-zero and float drift', () => {
  expect(formatResult(NaN)).toBe('Cannot divide by zero');
  expect(formatResult(Infinity)).toBe('Cannot divide by zero');
  expect(formatResult(0.1 + 0.2)).toBe('0.3');
});

test('initialState is the documented zero-state', () => {
  expect(initialState).toEqual({
    display: '0', accumulator: null, pendingOp: null,
    waitingForNew: false, justComputed: false,
    lastOperand: null, lastOp: null, error: false,
  });
});

// ---- DOM presence ----

test('renders every FCC-required element with the correct id', () => {
  render(<App />);
  FCC_IDS.forEach((id) => expect(document.getElementById(id)).toBeInTheDocument());
});

test('renders Win10-style extra keys (backspace, negate)', () => {
  render(<App />);
  expect(document.getElementById('backspace')).toBeInTheDocument();
  expect(document.getElementById('negate')).toBeInTheDocument();
});

// ---- basic entry ----

test('initial display shows 0', () => {
  render(<App />);
  expect(display()).toBe('0');
});

test('typing a single digit replaces the leading 0', () => {
  render(<App />);
  click('seven');
  expect(display()).toBe('7');
});

test('concatenates digits when typed sequentially', () => {
  render(<App />);
  click('one'); click('two'); click('three');
  expect(display()).toBe('123');
});

// ---- four operations ----

test('addition: 1 + 2 = 3', () => {
  render(<App />);
  click('one'); click('add'); click('two'); click('equals');
  expect(display()).toBe('3');
});

test('subtraction: 9 - 4 = 5', () => {
  render(<App />);
  click('nine'); click('subtract'); click('four'); click('equals');
  expect(display()).toBe('5');
});

test('multiplication: 6 × 7 = 42', () => {
  render(<App />);
  click('six'); click('multiply'); click('seven'); click('equals');
  expect(display()).toBe('42');
});

test('division: 8 ÷ 2 = 4', () => {
  render(<App />);
  click('eight'); click('divide'); click('two'); click('equals');
  expect(display()).toBe('4');
});

// ---- chained ops (Win10 evaluates left-to-right) ----

test('chained left-to-right: 2 + 3 + 4 = 9', () => {
  render(<App />);
  click('two'); click('add'); click('three'); click('add'); click('four'); click('equals');
  expect(display()).toBe('9');
});

test('chained left-to-right: 2 + 3 × 4 = 20 (Win10 does not apply precedence)', () => {
  render(<App />);
  click('two'); click('add'); click('three'); click('multiply'); click('four'); click('equals');
  expect(display()).toBe('20');
});

test('chained subtraction: 8 - 3 - 2 = 3', () => {
  render(<App />);
  click('eight'); click('subtract'); click('three'); click('subtract'); click('two'); click('equals');
  expect(display()).toBe('3');
});

// ---- operator replacement ----

test('pressing an operator twice replaces the previous operator', () => {
  render(<App />);
  click('one'); click('add'); click('subtract'); click('two'); click('equals');
  expect(display()).toBe('-1');
});

// ---- decimals ----

test('decimal: 1.5 + 2.5 = 4', () => {
  render(<App />);
  click('one'); click('decimal'); click('five');
  click('add');
  click('two'); click('decimal'); click('five');
  click('equals');
  expect(display()).toBe('4');
});

test('decimal after operator starts a new fractional number', () => {
  render(<App />);
  click('one'); click('add'); click('decimal'); click('five'); click('equals');
  expect(display()).toBe('1.5');
});

test('does not allow two decimal points in the same number', () => {
  render(<App />);
  click('one'); click('decimal'); click('decimal'); click('five');
  expect(display()).toBe('1.5');
});

test('floating-point drift is hidden: 0.1 + 0.2 = 0.3', () => {
  render(<App />);
  click('zero'); click('decimal'); click('one');
  click('add');
  click('zero'); click('decimal'); click('two');
  click('equals');
  expect(display()).toBe('0.3');
});

// ---- AC ----

test('AC resets the display back to 0', () => {
  render(<App />);
  click('nine'); click('add'); click('eight'); click('equals');
  expect(display()).toBe('17');
  click('clear');
  expect(display()).toBe('0');
});

test('AC also clears internal state so a new calculation starts fresh', () => {
  render(<App />);
  click('nine'); click('add'); click('equals');
  click('clear');
  click('four');
  expect(display()).toBe('4');
});

// ---- continuing after result ----

test('after =, pressing a digit starts a new calculation (Win10 replaces)', () => {
  render(<App />);
  click('one'); click('add'); click('two'); click('equals');
  expect(display()).toBe('3');
  click('zero');
  expect(display()).toBe('0');
});

test('after =, pressing an operator continues from the result', () => {
  render(<App />);
  click('one'); click('add'); click('two'); click('equals');
  click('multiply'); click('four'); click('equals');
  expect(display()).toBe('12');
});

// ---- = repeats the last operation (Win10 hallmark) ----

test('pressing = repeatedly repeats the last operation: 1 + 2 = = =', () => {
  render(<App />);
  click('one'); click('add'); click('two'); click('equals');
  expect(display()).toBe('3');
  click('equals');
  expect(display()).toBe('5');
  click('equals');
  expect(display()).toBe('7');
});

test('= repeat works with multiplication: 2 × 3 = =', () => {
  render(<App />);
  click('two'); click('multiply'); click('three'); click('equals');
  expect(display()).toBe('6');
  click('equals');
  expect(display()).toBe('18');
});

// ---- division by zero (Win10 limitation) ----

test('5 ÷ 0 = shows "Cannot divide by zero"', () => {
  render(<App />);
  click('five'); click('divide'); click('zero'); click('equals');
  expect(display()).toBe('Cannot divide by zero');
});

test('after divide-by-zero, digits and operators are ignored until AC', () => {
  render(<App />);
  click('five'); click('divide'); click('zero'); click('equals');
  click('one');
  expect(display()).toBe('Cannot divide by zero');
  click('clear');
  expect(display()).toBe('0');
  click('seven');
  expect(display()).toBe('7');
});

// ---- backspace ----

test('backspace removes the last digit', () => {
  render(<App />);
  click('one'); click('two'); click('three');
  expect(display()).toBe('123');
  click('backspace');
  expect(display()).toBe('12');
  click('backspace');
  expect(display()).toBe('1');
  click('backspace');
  expect(display()).toBe('0');
});

test('backspace is a no-op while waiting for a new operand', () => {
  render(<App />);
  click('five'); click('add');
  click('backspace');
  expect(display()).toBe('5');
});

// ---- negate ----

test('± toggles the sign of the current entry', () => {
  render(<App />);
  click('five'); click('negate');
  expect(display()).toBe('-5');
  click('negate');
  expect(display()).toBe('5');
});

test('± is ignored on 0', () => {
  render(<App />);
  click('negate');
  expect(display()).toBe('0');
});

test('negate participates in arithmetic: 5 ± + 3 = -2... wait, 5 becomes -5, +3 = -2', () => {
  render(<App />);
  click('five'); click('negate'); click('add'); click('three'); click('equals');
  expect(display()).toBe('-2');
});

// ---- large results ----

test('handles a large result without throwing', () => {
  render(<App />);
  click('one'); click('zero'); click('zero'); click('zero'); click('zero');
  click('multiply');
  click('one'); click('zero'); click('zero'); click('zero');
  click('equals');
  expect(display()).toMatch(/10000000|10,000,000/);
});

// ---- regression: make sure the screen still exposes a text content ----

test('exposes display text via getByText', () => {
  render(<App />);
  expect(screen.getAllByText('0').length).toBeGreaterThan(0);
});
