import { compute, formatResult } from "../calc";

const finalizeResult = (s, result) => {
  const formatted = formatResult(result);
  if (formatted === 'Cannot divide by zero') {
    return {
      ...s,
      display: formatted,
      accumulator: null,
      pendingOp: null,
      waitingForNew: false,
      justComputed: false,
      lastOperand: null,
      lastOp: null,
      error: true,
    };
  }
  return formatted;
};

const applyDigit = (s, value) => {
  if (s.waitingForNew || s.justComputed) {
    return { ...s, display: value, waitingForNew: false, justComputed: false };
  }
  if (s.display === '0') return { ...s, display: value };
  if (s.display === '-0') return { ...s, display: '-' + value };
  if (s.display.replace('-', '').replace('.', '').length >= 16) return s;
  return { ...s, display: s.display + value };
};

export const Buttons = ({ input, setInput }) => {
  const handleClick = (e) => {
    const value = e.target.value;
    const s = { ...input };

    if (s.error) {
      if (value === 'restart') return setInput({
        display: '0', accumulator: null, pendingOp: null,
        waitingForNew: false, justComputed: false,
        lastOperand: null, lastOp: null, error: false,
      });
      return;
    }

    if (value === 'restart') {
      return setInput({
        display: '0', accumulator: null, pendingOp: null,
        waitingForNew: false, justComputed: false,
        lastOperand: null, lastOp: null, error: false,
      });
    }

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
      return setInput(applyDigit(s, value));
    }

    if (value === '.') {
      if (s.waitingForNew || s.justComputed) {
        return setInput({ ...s, display: '0.', waitingForNew: false, justComputed: false });
      }
      if (!s.display.includes('.')) {
        s.display = s.display + '.';
      }
      return setInput(s);
    }

    if (value === '=') {
      if (s.pendingOp === null && s.justComputed && s.lastOp !== null) {
        const result = compute(parseFloat(s.display), s.lastOp, s.lastOperand);
        s.display = formatResult(result);
        s.justComputed = true;
        if (s.display === 'Cannot divide by zero') s.error = true;
        return setInput(s);
      }
      if (s.pendingOp === null) return;
      const a = parseFloat(s.accumulator);
      const b = s.waitingForNew ? a : parseFloat(s.display);
      const result = compute(a, s.pendingOp, b);
      const finalized = finalizeResult(s, result);
      if (finalized.error) return setInput(finalized);
      return setInput({
        ...s,
        display: finalized,
        lastOperand: b,
        lastOp: s.pendingOp,
        accumulator: null,
        pendingOp: null,
        waitingForNew: false,
        justComputed: true,
      });
    }

    if (['+', '-', '*', '/'].includes(value)) {
      if (s.pendingOp !== null && !s.waitingForNew) {
        const result = compute(parseFloat(s.accumulator), s.pendingOp, parseFloat(s.display));
        const finalized = finalizeResult(s, result);
        if (finalized.error) return setInput(finalized);
        s.display = finalized;
        s.accumulator = finalized;
      } else {
        s.accumulator = s.display;
      }
      s.pendingOp = value;
      s.waitingForNew = true;
      s.justComputed = false;
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
