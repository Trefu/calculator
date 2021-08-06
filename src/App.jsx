import Display from "./components/Display";
import Buttons from "./components/Buttons";
import { useState } from "react";
function App() {
  const [input, setInput] = useState(0)
  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <div style={{ width: "320px" }} className="bg-blue-100 container mx-auto p-2 rounded-lg border-2 border-blue-300">
        <Display input={input} />

        <Buttons setInput={setInput} />

      </div>

    </div >
  );
}

export default App;
