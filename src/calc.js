export const initialState = {
  display: '0',
  accumulator: null,
  pendingOp: null,
  waitingForNew: false,
  justComputed: false,
  lastOperand: null,
  lastOp: null,
  error: false,
};

export const compute = (a, op, b) => {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? NaN : a / b;
    default: return b;
  }
};

export const formatResult = (n) => {
  if (Number.isNaN(n) || !Number.isFinite(n)) return 'Cannot divide by zero';
  if (Object.is(n, -0)) return '0';
  const rounded = parseFloat(n.toPrecision(12));
  return String(rounded);
};
