export const Display = ({ input }) => {
  const text = input.display;
  const isResult = input.justComputed && !input.error;
  const isError = input.error;

  return (
    <div className="bg-ink-50 rounded-2xl shadow-inset border border-ink-200/80 px-6 py-5 mb-5 h-[7.5rem] flex flex-col justify-end overflow-hidden">
      <div className="flex items-end justify-between mb-1 h-5 gap-3">
        <span
          data-testid="expression"
          className="text-sm sm:text-base text-ink-500 font-mono truncate min-w-0"
        >
          {input.expression}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-ink-400 shrink-0">
          {isError ? 'Error' : isResult ? '=' : ''}
        </span>
      </div>
      <div
        id="display"
        className={
          'font-mono text-right tabular-nums tracking-tight leading-none ' +
          'h-16 overflow-hidden whitespace-nowrap text-ellipsis ' +
          (isError ? 'text-2xl text-ink-500' : 'text-ink-900 text-5xl sm:text-6xl')
        }
      >
        {text}
      </div>
    </div>
  );
};

export default Display;
