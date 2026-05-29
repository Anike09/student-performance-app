import React, { useMemo, useState } from 'react';

type Row = { id: string; code: string; credits: number; grade: string };

const gradeToPoints: Record<string, number> = {
  A: 4.0,
  A-: 3.7,
  B+: 3.3,
  B: 3.0,
  B-: 2.7,
  C+: 2.3,
  C: 2.0,
  D: 1.0,
  F: 0.0,
};

const defaultRow = (id: string): Row => ({ id, code: '', credits: 3, grade: 'A' });

const GpaCalculator: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([defaultRow('r1')]);

  const addRow = () => setRows((s) => [...s, defaultRow(String(Date.now()))]);
  const removeRow = (id: string) => setRows((s) => s.filter((r) => r.id !== id));
  const updateRow = (id: string, patch: Partial<Row>) =>
    setRows((s) => s.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const { gpa, totalCredits } = useMemo(() => {
    let totalPoints = 0;
    let credits = 0;
    for (const r of rows) {
      const pts = gradeToPoints[r.grade] ?? 0;
      totalPoints += pts * (r.credits || 0);
      credits += r.credits || 0;
    }
    const gpa = credits ? totalPoints / credits : 0;
    return { gpa, totalCredits: credits };
  }, [rows]);

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="grid gap-4 sm:grid-cols-[1.4fr_0.9fr] sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">GPA calculator</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Real-time GPA calculator</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">Add your courses, credits and grades to instantly calculate your GPA.</p>
          </div>
          <div className="rounded-[32px] bg-slate-50 p-6 text-slate-900">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Quick tip</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">Use the grade dropdown and set credits to match your curriculum.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Courses</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">Calculate GPA</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={addRow} className="btn bg-white text-slate-900">Add course</button>
            <div className="text-right">
              <p className="text-xs text-slate-500">Total credits</p>
              <p className="text-xl font-semibold">{totalCredits}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="grid gap-3 sm:grid-cols-6 items-center rounded-[16px] border border-slate-100 p-3">
              <input
                className="col-span-2 rounded-md border border-slate-300 px-3 py-2"
                placeholder="Course code"
                value={row.code}
                onChange={(e) => updateRow(row.id, { code: e.target.value })}
              />
              <input
                className="col-span-1 rounded-md border border-slate-300 px-3 py-2"
                type="number"
                min={0}
                value={row.credits}
                onChange={(e) => updateRow(row.id, { credits: Number(e.target.value) })}
              />
              <select
                className="col-span-1 rounded-md border border-slate-300 px-3 py-2"
                value={row.grade}
                onChange={(e) => updateRow(row.id, { grade: e.target.value })}
              >
                {Object.keys(gradeToPoints).map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <div className="col-span-1 text-right">
                <p className="text-xs text-slate-500">Points</p>
                <p className="font-semibold">{(gradeToPoints[row.grade] ?? 0).toFixed(2)}</p>
              </div>
              <div className="col-span-1 text-right">
                <button onClick={() => removeRow(row.id)} className="btn bg-rose-100 text-rose-800">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[16px] bg-gradient-to-r from-cyan-400 to-mint-300 p-4 text-slate-950">
          <p className="text-sm">Estimated GPA</p>
          <p className="text-3xl font-semibold">{gpa.toFixed(2)}</p>
        </div>
      </section>
    </div>
  );
};

export default GpaCalculator;
