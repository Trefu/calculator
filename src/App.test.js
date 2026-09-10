import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calculator with display and required buttons', () => {
  render(<App />);
  expect(screen.getAllByText('0').length).toBeGreaterThan(0);
  expect(document.getElementById('display')).toBeInTheDocument();
  expect(document.getElementById('equals')).toBeInTheDocument();
  expect(document.getElementById('clear')).toBeInTheDocument();
  expect(document.getElementById('decimal')).toBeInTheDocument();
  for (let i = 0; i <= 9; i++) {
    expect(document.getElementById(['zero','one','two','three','four','five','six','seven','eight','nine'][i])).toBeInTheDocument();
  }
  expect(document.getElementById('add')).toBeInTheDocument();
  expect(document.getElementById('subtract')).toBeInTheDocument();
  expect(document.getElementById('multiply')).toBeInTheDocument();
  expect(document.getElementById('divide')).toBeInTheDocument();
});
