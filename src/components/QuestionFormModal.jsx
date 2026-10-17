import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, AlertCircle } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../data/initialQuestions';

export default function QuestionFormModal({ isOpen, onClose, editingQuestion }) {
  const { addQuestion, updateQuestion } = usePractice();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      category: 'DSA',
      difficulty: 'Medium',
      status: 'Pending',
      topic: '',
      link: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (editingQuestion) {
      reset({
        title: editingQuestion.title,
        category: editingQuestion.category,
        difficulty: editingQuestion.difficulty,
        status: editingQuestion.status,
        topic: editingQuestion.topic || '',
        link: editingQuestion.link || '',
        notes: editingQuestion.notes || '',
      });
    } else {
      reset({
        title: '',
        category: 'DSA',
        difficulty: 'Medium',
        status: 'Pending',
        topic: '',
        link: '',
        notes: '',
      });
    }
  }, [editingQuestion, isOpen, reset]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    if (editingQuestion) {
      updateQuestion(editingQuestion.id, data);
    } else {
      addQuestion(data);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            {editingQuestion ? 'Edit Practice Question' : 'Add New Practice Question'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4" noValidate>
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Question Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Implement Debounce & Throttle with Cancel Method"
              {...register('title', {
                required: 'Question title is required',
                minLength: { value: 5, message: 'Title must be at least 5 characters' },
                maxLength: { value: 120, message: 'Title cannot exceed 120 characters' },
              })}
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Category *
              </label>
              <select
                {...register('category', { required: true })}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Difficulty *
              </label>
              <select
                {...register('difficulty', { required: true })}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Status *
              </label>
              <select
                {...register('status', { required: true })}
                className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Topic / Pattern Tag
              </label>
              <input
                type="text"
                placeholder="e.g., Sliding Window, Closures"
                {...register('topic', {
                  maxLength: { value: 40, message: 'Max 40 characters' },
                })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
              {errors.topic && (
                <p className="mt-1 text-xs text-rose-600">{errors.topic.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Problem / Docs URL
              </label>
              <input
                type="url"
                placeholder="https://leetcode.com/..."
                {...register('link', {
                  pattern: {
                    value: /^https?:\/\/.+/i,
                    message: 'URL must start with http:// or https://',
                  },
                })}
                className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
              />
              {errors.link && (
                <p className="mt-1 text-xs text-rose-600">{errors.link.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              Key Revision Notes & Complexity
            </label>
            <textarea
              rows={3}
              placeholder="Time/Space complexity, edge cases, or key takeaways..."
              {...register('notes', {
                maxLength: { value: 300, message: 'Notes cannot exceed 300 characters' },
              })}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
            />
            {errors.notes && (
              <p className="mt-1 text-xs text-rose-600">{errors.notes.message}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer"
            >
              {editingQuestion ? 'Save Changes' : 'Add Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}