import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PracticeProvider, usePractice } from './context/PracticeContext';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import ProgressBanner from './components/ProgressBanner';
import SearchFilterBar from './components/SearchFilterBar';
import QuestionCard from './components/QuestionCard';
import TrackerEmptyState from './components/TrackerEmptyState';
import QuestionFormModal from './components/QuestionFormModal';

function TrackerDashboard() {
  const { questions, filteredQuestions } = usePractice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const handleOpenAdd = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenAddModal={handleOpenAdd} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <DashboardStats />
        <ProgressBanner />
        <SearchFilterBar />

        {questions.length === 0 ? (
          <TrackerEmptyState mode="empty" onOpenAddModal={handleOpenAdd} />
        ) : filteredQuestions.length === 0 ? (
          <TrackerEmptyState mode="no-results" onOpenAddModal={handleOpenAdd} />
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onEdit={handleOpenEdit}
              />
            ))}
          </section>
        )}
      </main>

      <QuestionFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingQuestion={editingQuestion}
      />
    </div>
  );
}

export default function App() {
  return (
    <PracticeProvider>
      <Toaster position="bottom-right" />
      <TrackerDashboard />
    </PracticeProvider>
  );
}