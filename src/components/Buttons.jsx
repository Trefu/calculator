import { compute, formatResult, opSymbol, fresh } from "../calc";

const MAX_DIGITS = 16;

export const Buttons = ({ input, setInput }) => {
  const handleClick = (e) => {
    const value = e.target.value;
    const s = { ...input };

    const reset = () => setInput(fresh());

    if (s.error) {
      if (value === 'restart') return reset();
      return;
    }

    if (value === 'restart') return reset();

    if (value === 'backspace') {
      if (s.waitingForNew || s.justComputed) return;
      if (s.display.length <= 1 || (s.display.length === 2 && s.display.startsWith('-'))) {
        s.display = '0';
      } else {
        s.display = s.display.slice(0, -1);
      }
      return setInput(s);
    }

    if (value === 'negate') {
      if (s.display === '0' || s.waitingForNew) return;
      s.justComputed = false;
      s.display = s.display.startsWith('-') ? s.display.slice(1) : '-' + s.display;
      return setInput(s);
    }

    if (!isNaN(value)) {
      const wasComputed = s.justComputed;
      if (s.waitingForNew) {
        s.display = value;
        s.waitingForNew = false;
        return setInput(s);
      }
      if (wasComputed) {
        s.display = value;
        s.justComputed = false;
        s.expression = '';
        return setInput(s);
      }
      if (s.display === '0') return setInput({ ...s, display: value });
      if (s.display === '-0') return setInput({ ...s, display: '-' + value });
      const digits = s.display.replace('-', '').replace('.', '').length;
      if (digits >= MAX_DIGITS) return;
      return setInput({ ...s, display: s.display + value });
    }

    if (value === '.') {
      const wasComputed = s.justComputed;
      if (s.waitingForNew) {
        return setInput({ ...s, display: '0.', waitingForNew: false });
      }
      if (wasComputed) {
        return setInput({ ...s, display: '0.', justComputed: false, expression: '' });
      }
      if (!s.display.includes('.')) {
        s.display = s.display + '.';
      }
      return setInput(s);
    }

    if (value === '=') {
      if (s.pendingOp === null && s.justComputed && s.lastOp !== null) {
        const result = compute(parseFloat(s.display), s.lastOp, s.lastOperand);
        const formatted = formatResult(result);
        if (formatted === 'Cannot divide by zero') {
          return setInput({ ...fresh(), display: formatted, error: true });
        }
        return setInput({ ...s, display: formatted, justComputed: true, expression: '' });
      }
      if (s.pendingOp === null) return;
      const a = parseFloat(s.accumulator);
      const b = s.waitingForNew
        ? (s.lastOperandSource === 'display' ? s.lastOperand : a)
        : parseFloat(s.display);
      const result = compute(a, s.pendingOp, b);
      const formatted = formatResult(result);
      if (formatted === 'Cannot divide by zero') {
        return setInput({ ...fresh(), display: formatted, error: true });
      }
      return setInput({
        ...s,
        display: formatted,
        lastOperand: b,
        lastOp: s.pendingOp,
        lastOperandSource: 'display',
        accumulator: null,
        pendingOp: null,
        waitingForNew: false,
        justComputed: true,
        expression: '',
      });
    }

    if (['+', '-', '*', '/'].includes(value)) {
      if (s.pendingOp !== null && !s.waitingForNew) {
        const enteredValue = parseFloat(s.display);
        const result = compute(parseFloat(s.accumulator), s.pendingOp, enteredValue);
        const formatted = formatResult(result);
        if (formatted === 'Cannot divide by zero') {
          return setInput({ ...fresh(), display: formatted, error: true });
        }
        s.lastOperand = enteredValue;
        s.lastOperandSource = 'display';
        s.display = formatted;
        s.accumulator = formatted;
      } else {
        s.accumulator = s.display;
      }
      s.pendingOp = value;
      s.waitingForNew = true;
      s.justComputed = false;
      s.expression = `${s.accumulator} ${opSymbol(value)}`;
      return setInput(s);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      <button id="clear" onClick={handleClick} value="restart" className="key-fn">AC</button>
      <button id="backspace" onClick={handleClick} value="backspace" className="key-fn">⌫</button>
      <button id="divide" onClick={handleClick} value="/" className="key-op">÷</button>
      <button id="multiply" onClick={handleClick} value="*" className="key-op">×</button>

      <button id="seven" onClick={handleClick} value={7} className="key">7</button>
      <button id="eight" onClick={handleClick} value={8} className="key">8</button>
      <button id="nine" onClick={handleClick} value={9} className="key">9</button>
      <button id="subtract" onClick={handleClick} value="-" className="key-op">−</button>

      <button id="four" onClick={handleClick} value={4} className="key">4</button>
      <button id="five" onClick={handleClick} value={5} className="key">5</button>
      <button id="six" onClick={handleClick} value={6} className="key">6</button>
      <button id="add" onClick={handleClick} value="+" className="key-op">+</button>

      <button id="one" onClick={handleClick} value={1} className="key">1</button>
      <button id="two" onClick={handleClick} value={2} className="key">2</button>
      <button id="three" onClick={handleClick} value={3} className="key">3</button>
      <button id="negate" onClick={handleClick} value="negate" className="key-op">±</button>

      <button id="zero" onClick={handleClick} value={0} className="key col-span-2">0</button>
      <button id="decimal" onClick={handleClick} value="." className="key">.</button>
      <button id="equals" onClick={handleClick} value="=" className="key-eq">=</button>
    </div>
  );
};

export default Buttons;
