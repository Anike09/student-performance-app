import React from 'react';

export interface CourseRow {
  code: string;
  title: string;
  semester: string;
  credits: number;
  grade: string;
  status: string;
}

interface CourseTableProps {
  rows: CourseRow[];
}

const statusStyles: Record<string, string> = {
  Passed: 'bg-emerald-100 text-emerald-700',
  Failed: 'bg-rose-100 text-rose-700',
  'In Progress': 'bg-amber-100 text-amber-700',
};

const CourseTable: React.FC<CourseTableProps> = ({ rows }) => {
  return (
    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
          <thead className="bg-slate-950 text-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">Course</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">Semester</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">Credits</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">Grade</th>
              <th className="px-6 py-4 font-semibold uppercase tracking-[0.24em]">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.code}-${row.semester}`} className="border-b border-slate-200 bg-slate-50 transition hover:bg-slate-100">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{row.code}</div>
                  <div className="mt-1 text-sm text-slate-500">{row.title}</div>
                </td>
                <td className="px-6 py-4 text-slate-600">{row.semester}</td>
                <td className="px-6 py-4 text-slate-600">{row.credits}</td>
                <td className="px-6 py-4 font-semibold text-slate-900">{row.grade}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${statusStyles[row.status] ?? 'bg-slate-100 text-slate-700'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseTable;
