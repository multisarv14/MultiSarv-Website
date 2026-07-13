import React, { useState } from "react";

// Website Visitors (Bar Chart)
export function VisitorsBarChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  
  const data = [
    { month: "Jan", visitors: 4200 },
    { month: "Feb", visitors: 4900 },
    { month: "Mar", visitors: 5800 },
    { month: "Apr", visitors: 6100 },
    { month: "May", visitors: 7800 },
    { month: "Jun", visitors: 9400 },
  ];

  const maxVal = 10000;
  const height = 150;
  const width = 320;
  const padding = 30;

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transition-all shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-display">Website Visitors</h4>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">+24% YoY</span>
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Helper grid lines */}
        {[0, 0.5, 1].map((ratio, i) => (
          <line
            key={i}
            x1={padding}
            y1={height - padding - ratio * (height - 2 * padding)}
            x2={width - padding}
            y2={height - padding - ratio * (height - 2 * padding)}
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}

        {/* X Axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          className="stroke-slate-200 dark:stroke-slate-700"
          strokeWidth="1"
        />

        {/* Bars */}
        {data.map((item, idx) => {
          const colWidth = (width - 2 * padding) / data.length;
          const barWidth = colWidth * 0.6;
          const barHeight = (item.visitors / maxVal) * (height - 2 * padding);
          const x = padding + idx * colWidth + (colWidth - barWidth) / 2;
          const y = height - padding - barHeight;

          return (
            <g key={idx} className="group cursor-pointer">
              {/* Actual interactive bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="4"
                fill={hoveredIdx === idx ? "url(#cyan-orange)" : "url(#blue-cyan)"}
                className="transition-all duration-300 shadow-md"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
              
              {/* Invisible trigger area */}
              <rect
                x={padding + idx * colWidth}
                y={padding}
                width={colWidth}
                height={height - 2 * padding}
                fill="transparent"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />

              {/* X Tag */}
              <text
                x={x + barWidth / 2}
                y={height - 12}
                textAnchor="middle"
                className="fill-slate-400 dark:fill-slate-500 text-[10px] font-medium font-sans"
              >
                {item.month}
              </text>
            </g>
          );
        })}

        {/* Linear GradientsDefinitions */}
        <defs>
          <linearGradient id="blue-cyan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="cyan-orange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating active Info tooltip */}
      {hoveredIdx !== null && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-950 text-white rounded px-2 py-1 text-xs font-mono shadow-md flex gap-2 items-center z-10 transition-all pointer-events-none border border-slate-800">
          <span className="text-cyan-400 font-semibold">{data[hoveredIdx].month}:</span>
          <span>{data[hoveredIdx].visitors.toLocaleString()} users</span>
        </div>
      )}
    </div>
  );
}

// Lead Conversion (Line Chart)
export function ConversionLineChart() {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const data = [
    { month: "Jan", rate: 2.1 },
    { month: "Feb", rate: 2.5 },
    { month: "Mar", rate: 3.4 },
    { month: "Apr", rate: 3.2 },
    { month: "May", rate: 4.5 },
    { month: "Jun", rate: 5.6 },
  ];

  const height = 150;
  const width = 320;
  const padding = 30;

  // Map database coordinates
  const points = data.map((item, idx) => {
    const colWidth = (width - 2 * padding) / (data.length - 1);
    const x = padding + idx * colWidth;
    const y = height - padding - (item.rate / 6) * (height - 2 * padding);
    return { x, y, ...item, idx };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="relative bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transition-all shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-display">AI Conversion Rate</h4>
        <span className="text-xs font-medium text-orange-600 bg-orange-50 dark:bg-orange-950/30 px-2 py-0.5 rounded-full">Goal 5.0% Met</span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Helper Horizontal Lines */}
        {[0, 0.5, 1].map((ratio, i) => (
          <line
            key={i}
            x1={padding}
            y1={height - padding - ratio * (height - 2 * padding)}
            x2={width - padding}
            y2={height - padding - ratio * (height - 2 * padding)}
            className="stroke-slate-100 dark:stroke-slate-800"
            strokeWidth="1"
            strokeDasharray="4"
          />
        ))}

        {/* X Axis */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          className="stroke-slate-200 dark:stroke-slate-700"
          strokeWidth="1"
        />

        {/* SVG Sparkline Spark path */}
        <path
          d={linePath}
          fill="none"
          className="stroke-blue-600 dark:stroke-cyan-400"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interactive nodes */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle
              cx={p.x}
              cy={p.y}
              r={activePoint === idx ? 6 : 4}
              fill={activePoint === idx ? "#f97316" : "#2563eb"}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setActivePoint(idx)}
              onMouseLeave={() => setActivePoint(null)}
            />
            {/* Invis block */}
            <circle
              cx={p.x}
              cy={p.y}
              r={15}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setActivePoint(idx)}
              onMouseLeave={() => setActivePoint(null)}
            />
            {/* Axis text labels */}
            <text
              x={p.x}
              y={height - 12}
              textAnchor="middle"
              className="fill-slate-400 dark:fill-slate-500 text-[10px] font-sans"
            >
              {p.month}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating Info tooltip */}
      {activePoint !== null && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-950 text-white rounded px-2 py-1 text-xs font-mono shadow-md flex gap-2 items-center z-10 pointer-events-none border border-slate-800">
          <span className="text-orange-400 font-semibold">{points[activePoint].month}:</span>
          <span>{points[activePoint].rate}% Lead conversion</span>
        </div>
      )}
    </div>
  );
}

// Product Inquiries (Donut / Pie Chart)
export function ProductPieChart() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const data = [
    { name: "RealtySarv", val: 35, color: "stroke-blue-600 dark:stroke-blue-500" },
    { name: "SocietySarv", val: 25, color: "stroke-cyan-500 dark:stroke-cyan-400" },
    { name: "HRSarv", val: 20, color: "stroke-orange-500 dark:stroke-orange-400" },
    { name: "Others", val: 20, color: "stroke-slate-400 dark:stroke-slate-600" },
  ];

  // Computing coordinates and lengths for Donut SVG segments
  // Circumference = 2 * PI * r. Let's make r = 40. Circumference ~ 251.3
  const r = 38;
  const circ = 2 * Math.PI * r;
  let accumulatedPercent = 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-100 dark:border-slate-800 transition-all shadow-sm">
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-display mb-3">Product Interest Distribution</h4>
      
      <div className="flex items-center gap-4">
        {/* Donut circle */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={r}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="10"
              fill="transparent"
            />
            {data.map((item, idx) => {
              const dashArray = `${(item.val / 100) * circ} ${circ}`;
              const dashOffset = -((accumulatedPercent / 100) * circ);
              accumulatedPercent += item.val;

              return (
                <circle
                  key={idx}
                  cx="50"
                  cy="50"
                  r={r}
                  className={`${item.color} transition-all duration-300 stroke-2 cursor-pointer origin-center hover:scale-[1.03]`}
                  strokeWidth={hoveredIdx === idx ? "12" : "10"}
                  fill="transparent"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase">Total Leads</span>
            <span className="text-base font-bold text-slate-800 dark:text-slate-200 font-mono">1,248</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-grow space-y-1.5">
          {data.map((item, idx) => {
            const labelColorMap: { [key: string]: string } = {
              RealtySarv: "bg-blue-600 dark:bg-blue-500",
              SocietySarv: "bg-cyan-500 dark:bg-cyan-400",
              HRSarv: "bg-orange-500 dark:bg-orange-400",
              Others: "bg-slate-400 dark:bg-slate-600",
            };
            return (
              <div
                key={idx}
                className={`flex items-center justify-between text-xs p-1 rounded-md transition-colors ${
                  hoveredIdx === idx ? "bg-slate-50 dark:bg-slate-800/50" : ""
                }`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${labelColorMap[item.name]}`} />
                  <span className="font-medium text-slate-600 dark:text-slate-300">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{item.val}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
