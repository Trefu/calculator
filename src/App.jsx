import { useState } from "react";
import Display from "./components/Display";
import Buttons from "./components/Buttons";

function App() {
  const [input, setInput] = useState(["0"]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-ink-100 to-ink-200 flex items-center justify-center px-4">
      <div className="w-full max-w-[340px] bg-white rounded-3xl shadow-card border border-ink-200/70 p-5">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-ink-400">
            Calculator
          </span>
          <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-ink-400">
            JS · FCC
          </span>
        </div>
        <Display input={input} />
        <Buttons input={input} setInput={setInput} />
      </div>
    </div>
  );
}

export default App;
