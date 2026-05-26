import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface GpaTrendChartProps {
  data: Array<{ term: string; gpa: number }>;
}

const GpaTrendChart: React.FC<GpaTrendChartProps> = ({ data }) => {
  return (
    <div className="h-[340px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="term" tickLine={false} axisLine={false} tick={{ fill: '#475569' }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#475569' }} domain={[2.5, 4.5]} />
          <Tooltip contentStyle={{ borderRadius: '16px', borderColor: '#cbd5e1' }} />
          <Area type="monotone" dataKey="gpa" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#gpaGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GpaTrendChart;
