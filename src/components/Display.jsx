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
    <div className="bg-ink-50 rounded-2xl shadow-inset border border-ink-200/80 px-5 py-4 mb-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400 mb-1 h-3">
        {isResult ? "Result" : ""}
      </div>
      <div
        id="display"
        className="font-mono text-right text-ink-900 tabular-nums tracking-tight
                   text-3xl sm:text-4xl leading-tight truncate min-h-[2.25rem]"
      >
        {text}
      </div>
    </div>
  );
};

export default Display;
