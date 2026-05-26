import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface GradeDistributionChartProps {
  data: Array<{ grade: string; count: number }>;
}

const colors = ['#6366f1', '#06b6d4', '#0ea5e9', '#38bdf8', '#c084fc'];

const GradeDistributionChart: React.FC<GradeDistributionChartProps> = ({ data }) => {
  return (
    <div className="flex h-[320px] w-full items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="grade" cx="50%" cy="50%" outerRadius={100} innerRadius={50} paddingAngle={4}>
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.grade}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '16px', borderColor: '#cbd5e1' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GradeDistributionChart;
