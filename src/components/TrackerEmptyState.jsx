import { FolderOpen, SearchX, Plus, RotateCcw } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export default function TrackerEmptyState({ mode, onOpenAddModal }) {
  const { resetToDummyData, resetFilters } = usePractice();

  if (mode === 'no-results') {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto my-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No Matching Questions Found</h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-5">
          No practice questions match your current search or filter criteria.
        </p>
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto my-6">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
        <FolderOpen className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">Your Question Tracker is Empty</h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        Start tracking your interview preparation by adding a question or restoring the sample dataset.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add First Question
        </button>
        <button
          onClick={resetToDummyData}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Load Dummy Questions
        </button>
      </div>
    </div>
  );
}