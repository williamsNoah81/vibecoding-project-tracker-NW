import React, { useState, useEffect } from 'react';

const DELIVERABLE_KEYS = [
  { id: 'presentation', label: 'Presentation' },
  { id: 'demo', label: 'Demo' },
  { id: 'report', label: 'Report' },
  { id: 'documentation', label: 'Documentation' },
];

export default function ProjectDeliverables() {
  const [deliverables, setDeliverables] = useState(() => {
    const saved = localStorage.getItem('vibeboard_deliverables');
    return saved
      ? JSON.parse(saved)
      : { presentation: '', demo: '', report: '', documentation: '' };
  });

  useEffect(() => {
    localStorage.setItem('vibeboard_deliverables', JSON.stringify(deliverables));
  }, [deliverables]);

  const handleChange = (id, value) => {
    setDeliverables((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="px-6 pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
      {DELIVERABLE_KEYS.map((item) => {
        const urlValue = deliverables[item.id] || '';
        const isFilled = urlValue.trim().length > 0;

        return (
          <div
            key={item.id}
            className={`bg-[#141A28] border rounded-xl p-3 flex flex-col justify-between transition-all duration-200 ${
              isFilled ? 'border-indigo-500/50 shadow-sm shadow-indigo-950/40' : 'border-[#252E45]'
            }`}
          >
            {/* Header with Empty/Filled Dot Indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-200">{item.label}</span>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono text-slate-500">
                  {isFilled ? 'Linked' : 'Empty'}
                </span>
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isFilled
                      ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]'
                      : 'border border-slate-600 bg-transparent'
                  }`}
                />
              </div>
            </div>

            {/* URL Input Field */}
            <div className="relative flex items-center">
              <input
                type="url"
                value={urlValue}
                onChange={(e) => handleChange(item.id, e.target.value)}
                placeholder="Enter URL..."
                className="w-full bg-[#0B0F19] text-xs text-slate-200 px-2.5 py-1.5 rounded border border-[#252E45] focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 font-mono"
              />
              {isFilled && (
                <a
                  href={urlValue.startsWith('http') ? urlValue : `https://${urlValue}`}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-2 text-indigo-400 hover:text-indigo-300 text-xs"
                  title="Open Link"
                >
                  ↗
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}