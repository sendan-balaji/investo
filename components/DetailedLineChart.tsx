// components/DetailedLineChart.tsx

import React from 'react';

interface ChartProps {
  data: number[];
  isPositive: boolean;
}

// THIS MUST BE a named export, using "export const"
export const DetailedLineChart: React.FC<ChartProps> = ({ data, isPositive }) => {
  if (!data || data.length < 2) {
    return <div className="flex items-center justify-center h-full text-text-secondary">Not enough data to display chart.</div>;
  }

  const color = isPositive ? '#00c46a' : '#ff5c5c';
  const gradientColor = isPositive ? '#00c46a' : '#ff5c5c';
  const gradientId = `gradient-${Math.random()}`;
  const svgHeight = 100, svgWidth = 300;
  const maxVal = Math.max(...data), minVal = Math.min(...data);
  const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  const points = data.map((d, i) => `${(i / (data.length - 1)) * svgWidth},${svgHeight - ((d - minVal) / range) * svgHeight}`).join(' ');
  const pathData = `M ${points}`;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
      <style>{`
        @keyframes draw { from { stroke-dashoffset: 1000; } to { stroke-dashoffset: 0; } }
        .line-path { stroke-dasharray: 1000; animation: draw 1.5s ease-out forwards; }
        @keyframes breathe { 0%, 100% { r: 4; opacity: 0.8; } 50% { r: 6; opacity: 1; } }
        .breathing-dot { animation: breathe 2s ease-in-out infinite; }
      `}</style>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradientColor} stopOpacity={0.3} />
          <stop offset="100%" stopColor={gradientColor} stopOpacity={0} />
        </linearGradient>
      </defs>
      {[...Array(5)].map((_, i) => <line key={i} x1="0" y1={i * (svgHeight / 4)} x2={svgWidth} y2={i * (svgHeight / 4)} stroke="#21262d" strokeWidth="0.5" />)}
      <path d={`${pathData} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`} fill={`url(#${gradientId})`} />
      <path d={pathData} fill="none" stroke={color} strokeWidth="2" className="line-path" />
      <circle className="breathing-dot" cx={points.split(' ').pop().split(',')[0]} cy={points.split(' ').pop().split(',')[1]} r="4" fill={color} stroke="#161b22" strokeWidth="1.5" />
    </svg>
  );
};
