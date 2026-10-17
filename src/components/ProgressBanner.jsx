import { Award } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export default function ProgressBanner() {
  const { metrics } = usePractice();

  return (
    <section className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Weekly Interview Readiness Progress
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Visual completion percentage calculated across all stored practice questions
            </p>
          </div>
        </div>

        <div className="flex items-baseline gap-2 md:text-right">
          <span className="text-3xl font-extrabold text-indigo-600">
            {metrics.completionPercentage}%
          </span>
          <span className="text-xs font-medium text-slate-500">
            ({metrics.completedTotal} of {metrics.total} completed)
          </span>
        </div>
      </div>

      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 via-violet-600 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${metrics.completionPercentage}%` }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        {metrics.categoryBreakdown.map((item) => (
          <div key={item.category} className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">{item.category}</span>
              <span className="font-bold text-slate-900">{item.percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              {item.completed}/{item.total} completed
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}