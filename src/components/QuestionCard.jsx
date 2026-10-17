import { CheckCircle2, Clock, CircleDot, ExternalLink, Edit3, Trash2 } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export default function QuestionCard({ question, onEdit }) {
  const { cycleQuestionStatus, deleteQuestion } = usePractice();

  const difficultyStyles = {
    Easy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-50 text-amber-700 border-amber-200',
    Hard: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const statusConfig = {
    Completed: {
      icon: CheckCircle2,
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
    },
    'In Progress': {
      icon: Clock,
      badge: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    },
    Pending: {
      icon: CircleDot,
      badge: 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200',
    },
  };

  const CurrentStatusIcon = statusConfig[question.status]?.icon || CircleDot;

  return (
    <article className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {question.category}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${
                difficultyStyles[question.difficulty]
              }`}
            >
              {question.difficulty}
            </span>
            {question.topic && (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600">
                {question.topic}
              </span>
            )}
          </div>

          <button
            onClick={() => cycleQuestionStatus(question.id)}
            title="Click to cycle status"
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
              statusConfig[question.status]?.badge
            }`}
          >
            <CurrentStatusIcon className="w-3.5 h-3.5" />
            {question.status}
          </button>
        </div>

        <h3
          className={`text-base font-bold leading-snug ${
            question.status === 'Completed' ? 'text-slate-600 line-through' : 'text-slate-900'
          }`}
        >
          {question.title}
        </h3>

        {question.notes && (
          <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100">
            {question.notes}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {question.link ? (
            <a
              href={question.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Reference Link
            </a>
          ) : (
            <span>No external URL</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(question)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
            title="Edit Question"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteQuestion(question.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Delete Question"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}