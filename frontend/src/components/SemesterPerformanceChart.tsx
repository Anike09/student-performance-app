import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface SemesterPerformanceChartProps {
  data: Array<{ semester: string; performance: number }>;
}

const SemesterPerformanceChart: React.FC<SemesterPerformanceChartProps> = ({ data }) => {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 15, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="semester" tickLine={false} axisLine={false} tick={{ fill: '#475569' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#475569' }} domain={[0, 100]} />
          <Tooltip contentStyle={{ borderRadius: '16px', borderColor: '#cbd5e1' }} />
          <Bar dataKey="performance" fill="#06b6d4" radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SemesterPerformanceChart;
