import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const FCC_IDS = [
  'display', 'clear', 'equals', 'decimal', 'zero',
  'one', 'two', 'three', 'four', 'five', 'six',
  'seven', 'eight', 'nine',
  'add', 'subtract', 'multiply', 'divide',
];

const click = (id) => userEvent.click(document.getElementById(id));
const displayText = () => document.getElementById('display').textContent;

test('initial display shows 0', () => {
  render(<App />);
  expect(displayText()).toBe('0');
});

test('renders every FCC-required element with the correct id', () => {
  render(<App />);
  FCC_IDS.forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });
});

test('typing a single digit replaces the leading 0', () => {
  render(<App />);
  click('seven');
  expect(displayText()).toBe('7');
});

test('concatenates digits when typed sequentially', () => {
  render(<App />);
  click('one');
  click('two');
  click('three');
  expect(displayText()).toBe('123');
});

test('addition: 1 + 2 = 3', () => {
  render(<App />);
  click('one');
  click('add');
  click('two');
  click('equals');
  expect(displayText()).toBe('3');
});

test('subtraction: 9 - 4 = 5', () => {
  render(<App />);
  click('nine');
  click('subtract');
  click('four');
  click('equals');
  expect(displayText()).toBe('5');
});

test('multiplication: 6 × 7 = 42', () => {
  render(<App />);
  click('six');
  click('multiply');
  click('seven');
  click('equals');
  expect(displayText()).toBe('42');
});

test('division: 8 ÷ 2 = 4', () => {
  render(<App />);
  click('eight');
  click('divide');
  click('two');
  click('equals');
  expect(displayText()).toBe('4');
});

test('decimal: 1.5 + 2.5 = 4', () => {
  render(<App />);
  click('one');
  click('decimal');
  click('five');
  click('add');
  click('two');
  click('decimal');
  click('five');
  click('equals');
  expect(displayText()).toBe('4');
});

test('chained operations respect operator precedence: 2 + 3 × 4 = 14', () => {
  render(<App />);
  click('two');
  click('add');
  click('three');
  click('multiply');
  click('four');
  click('equals');
  expect(displayText()).toBe('14');
});

test('chained operations left-to-right with same precedence: 8 - 3 - 2 = 3', () => {
  render(<App />);
  click('eight');
  click('subtract');
  click('three');
  click('subtract');
  click('two');
  click('equals');
  expect(displayText()).toBe('3');
});

test('AC resets the display back to 0', () => {
  render(<App />);
  click('nine');
  click('add');
  click('eight');
  click('equals');
  expect(displayText()).toBe('17');
  click('clear');
  expect(displayText()).toBe('0');
});

test('AC also clears internal state so a new calculation starts fresh', () => {
  render(<App />);
  click('nine');
  click('add');
  click('equals');
  click('clear');
  click('four');
  expect(displayText()).toBe('4');
});

test('does not allow two decimal points in the same number', () => {
  render(<App />);
  click('one');
  click('decimal');
  click('decimal');
  click('five');
  expect(displayText()).toBe('1.5');
});

test('typing a number after a result continues from the result', () => {
  render(<App />);
  click('one');
  click('add');
  click('two');
  click('equals');
  expect(displayText()).toBe('3');
  click('zero');
  expect(displayText()).toBe('30');
});

test('handles a large result with formatted output (still numeric string)', () => {
  render(<App />);
  click('one');
  click('zero');
  click('zero');
  click('zero');
  click('zero');
  click('multiply');
  click('one');
  click('zero');
  click('zero');
  click('zero');
  click('equals');
  expect(displayText()).toMatch(/10,000,000|10000000/);
});
