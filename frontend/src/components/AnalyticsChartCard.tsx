import React from 'react';

interface AnalyticsChartCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const AnalyticsChartCard: React.FC<AnalyticsChartCardProps> = ({ title, subtitle, children }) => {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{subtitle}</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
};

export default AnalyticsChartCard;
