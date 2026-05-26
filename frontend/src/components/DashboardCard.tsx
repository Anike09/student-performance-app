import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  detail: string;
  accent: 'indigo' | 'cyan' | 'slate' | 'rose';
}

const accentStyles: Record<DashboardCardProps['accent'], string> = {
  indigo: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  cyan: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  slate: 'border-slate-200 bg-slate-50 text-slate-900',
  rose: 'border-rose-200 bg-rose-50 text-rose-700',
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, detail, accent }) => {
  return (
    <div className={`rounded-[32px] border p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl ${accentStyles[accent]}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">{value}</p>
        </div>
        <div className="rounded-3xl bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 shadow-sm">
          {title.split(' ')[0]}
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
};

export default DashboardCard;
