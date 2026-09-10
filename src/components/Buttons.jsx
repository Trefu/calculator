import { useState } from "react";

export const Buttons = ({ input, setInput }) => {
  const [hasDecimal, setHasDecimal] = useState(false);

  const handleClick = (e) => {
    const value = e.target.value;
    const lastInput = input[input.length - 1];
    const firstNumberIsZero =
      input[0] === "0" && input.length <= 1 ? true : false;

    if (isNaN(value)) {
      if (value === "restart") {
        setHasDecimal(false);
        return setInput(["0"]);
      }
      if (value === "=") {
        try {
          const filtered = input.join("").match(/(\*|\+|\/|-)?(\.|-)?\d+/g).join("");
          // eslint-disable-next-line no-eval
          const result = eval(filtered);
          setHasDecimal(String(result).includes("."));
          return setInput([result]);
        } catch (error) {
          return setInput(["ERROR"]);
        }
      }
      if (firstNumberIsZero) return setInput([...input, value]);
      if (value === "-" && isNaN(lastInput)) return setInput([...input, value]);
      if (value === "." && isNaN(lastInput)) return;
      if (lastInput === ".") return;
      if (value === "." && hasDecimal) return;
      if (value === "." && !isNaN(lastInput)) {
        setHasDecimal(true);
        return setInput([...input, value]);
      }
      setHasDecimal(false);
      return setInput([...input, value]);
    }

    if (firstNumberIsZero) return setInput([value]);
    return setInput([...input, value]);
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <button id="clear" onClick={handleClick} value="restart" className="key-fn col-span-2">
        AC
      </button>
      <button id="divide" value={"/"} onClick={handleClick} className="key-op">
        ÷
      </button>
      <button id="multiply" value={"*"} onClick={handleClick} className="key-op">
        ×
      </button>

      <button id="seven" value={7} onClick={handleClick} className="key">7</button>
      <button id="eight" value={8} onClick={handleClick} className="key">8</button>
      <button id="nine" value={9} onClick={handleClick} className="key">9</button>
      <button id="subtract" value={"-"} onClick={handleClick} className="key-op">−</button>

      <button id="four" value={4} onClick={handleClick} className="key">4</button>
      <button id="five" value={5} onClick={handleClick} className="key">5</button>
      <button id="six" value={6} onClick={handleClick} className="key">6</button>
      <button id="add" value={"+"} onClick={handleClick} className="key-op">+</button>

      <button id="one" value={1} onClick={handleClick} className="key">1</button>
      <button id="two" value={2} onClick={handleClick} className="key">2</button>
      <button id="three" value={3} onClick={handleClick} className="key">3</button>
      <button id="equals" value={"="} onClick={handleClick} className="key-eq row-span-2">
        =
      </button>

      <button id="zero" value={0} onClick={handleClick} className="key col-span-2">
        0
      </button>
      <button id="decimal" value={"."} onClick={handleClick} className="key">.</button>
    </div>
  );
};

export default Buttons;
