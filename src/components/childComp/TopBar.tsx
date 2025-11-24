
export const TopBar = () => {
  const openEdit = () => {
    try {
      const ev = new CustomEvent('openBabyEdit');
      window.dispatchEvent(ev);
      // fallback signal for reliability
      // store a small numeric signal on window as a fallback
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).__babyEditSignal = ((window as any).__babyEditSignal || 0) + 1;
      window.dispatchEvent(new CustomEvent('babyEditSignal'));
      // debug
      // console.log('TopBar: dispatched openBabyEdit and babyEditSignal');
    } catch {
      // noop
    }
  };

  return (
    <div className="w-full flex items-center justify-between py-3 px-2 md:px-4 bg-white sticky top-0 z-40">
      <h1 className="font-semibold text-lg">Baby Monitoring</h1>
      <div>
        <button onClick={openEdit} className="px-3 py-1 bg-[#8d4ed6] text-white rounded-md text-sm">Edit Baby</button>
      </div>
    </div>
  );
};

export default TopBar;
