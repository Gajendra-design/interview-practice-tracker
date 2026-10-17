import { Code2, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export default function Navbar({ onOpenAddModal }) {
  const { resetToDummyData, clearAllQuestions, questions } = usePractice();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Interview Practice Tracker
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                LocalStorage Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Track weekly DSA, Git, Technical & Machine Coding readiness
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {questions.length > 0 && (
            <button
              onClick={clearAllQuestions}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Test Empty State
            </button>
          )}
          <button
            onClick={resetToDummyData}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Reset Dummy Data</span>
          </button>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>
    </header>
  );
}