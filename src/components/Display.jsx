const formatNumber = (n) => {
  if (typeof n !== "number" || !isFinite(n)) return String(n);
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e12 || abs < 1e-6)) return n.toExponential(6);
  const [intPart, decPart] = String(n).split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decPart ? `${withSep}.${decPart}` : withSep;
};

export const Display = ({ input }) => {
  const isResult = input.length === 1 && typeof input[0] === "number";
  const text = isResult ? formatNumber(input[0]) : input.join("");

  return (
    <div className="bg-ink-50 rounded-2xl shadow-inset border border-ink-200/80 px-6 py-5 mb-5 h-[7.5rem] flex flex-col justify-end overflow-hidden">
      <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400 mb-1 h-4 leading-none">
        {isResult ? "Result" : ""}
      </div>
      <div
        id="display"
        className="font-mono text-right text-ink-900 tabular-nums tracking-tight
                   text-5xl sm:text-6xl leading-none
                   h-16 overflow-hidden whitespace-nowrap text-ellipsis"
      >
        {text}
      </div>
    </div>
  );
};

export default Display;
