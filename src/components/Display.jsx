export const Display = ({ input }) => {
  const text = input.display;
  const isResult = input.justComputed && !input.error;
  const isError = input.error;

  return (
    <div className="bg-ink-50 rounded-2xl shadow-inset border border-ink-200/80 px-6 py-5 mb-5 h-[7.5rem] flex flex-col justify-end overflow-hidden">
      <div className="text-[10px] uppercase tracking-[0.2em] text-ink-400 mb-1 h-4 leading-none">
        {isError ? 'Error' : isResult ? 'Result' : ''}
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
