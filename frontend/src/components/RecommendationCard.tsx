import React from 'react';

interface RecommendationCardProps {
  title: string;
  description: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ title, description }) => {
  return (
    <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-500">Action</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900">{title}</h3>
        </div>
        <span className="rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-950">
          Priority
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
};

export default RecommendationCard;
