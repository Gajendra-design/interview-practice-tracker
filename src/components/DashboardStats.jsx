import { Layers, Terminal, Cpu, Laptop } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export default function DashboardStats() {
  const { metrics, machineCodingOverride, setMachineCodingOverride } = usePractice();

  const statusBadgeColor = {
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
    Pending: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Questions
          </span>
          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900">{metrics.total}</span>
          <span className="text-xs font-medium text-emerald-600">
            {metrics.completedTotal} solved
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {metrics.inProgressTotal} in progress • {metrics.pendingTotal} pending
        </p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Completed DSA
          </span>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900">
            {metrics.completedDSA}
            <span className="text-lg font-semibold text-slate-400">/{metrics.totalDSA}</span>
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500">Algorithmic & problem-solving set</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Interview Questions
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900">
            {metrics.completedInterview}
            <span className="text-lg font-semibold text-slate-400">/{metrics.totalInterview}</span>
          </span>
        </div>
        <p className="mt-2 text-xs text-slate-500">Completed Git & Technical concepts</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Machine-Coding Status
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Laptop className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
              statusBadgeColor[metrics.computedMCStatus]
            }`}
          >
            {metrics.computedMCStatus}
          </span>
          <select
            aria-label="Override Machine Coding Status"
            value={machineCodingOverride}
            onChange={(e) => setMachineCodingOverride(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Auto">Auto ({metrics.completedMC}/{metrics.totalMC})</option>
            <option value="Pending">Set: Pending</option>
            <option value="In Progress">Set: In Progress</option>
            <option value="Completed">Set: Completed</option>
          </select>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {metrics.completedMC} of {metrics.totalMC} machine coding rounds done
        </p>
      </div>
    </section>
  );
}