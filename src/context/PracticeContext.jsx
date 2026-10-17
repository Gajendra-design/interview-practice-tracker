import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
  INITIAL_QUESTIONS,
  STORAGE_KEY,
  MC_STORAGE_KEY,
  CATEGORIES,
} from '../data/initialQuestions';

const PracticeContext = createContext(null);

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
};

export const PracticeProvider = ({ children }) => {
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) return JSON.parse(saved);
    } catch (error) {
      console.error('Failed to parse questions from localStorage:', error);
    }
    return INITIAL_QUESTIONS;
  });

  const [machineCodingOverride, setMachineCodingOverride] = useState(() => {
    try {
      return localStorage.getItem(MC_STORAGE_KEY) || 'Auto';
    } catch {
      return 'Auto';
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [questions]);

  useEffect(() => {
    try {
      localStorage.setItem(MC_STORAGE_KEY, machineCodingOverride);
    } catch (error) {
      console.error('Failed to save MC status:', error);
    }
  }, [machineCodingOverride]);

  const addQuestion = (data) => {
    const newQuestion = {
      id: `q-${Date.now()}`,
      title: data.title.trim(),
      category: data.category,
      difficulty: data.difficulty,
      status: data.status,
      topic: data.topic?.trim() || 'General Prep',
      link: data.link?.trim() || '',
      notes: data.notes?.trim() || '',
      updatedAt: new Date().toISOString(),
    };
    setQuestions((prev) => [newQuestion, ...prev]);
    toast.success(`Added "${newQuestion.title}"!`);
  };

  const updateQuestion = (id, updatedData) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              ...updatedData,
              title: updatedData.title.trim(),
              topic: updatedData.topic?.trim() || 'General Prep',
              link: updatedData.link?.trim() || '',
              notes: updatedData.notes?.trim() || '',
              updatedAt: new Date().toISOString(),
            }
          : q
      )
    );
    toast.success('Question updated successfully!');
  };

  const cycleQuestionStatus = (id) => {
    const statusOrder = ['Pending', 'In Progress', 'Completed'];
    let nextStatus = 'Completed';

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextIndex = (statusOrder.indexOf(q.status) + 1) % statusOrder.length;
          nextStatus = statusOrder[nextIndex];
          return { ...q, status: nextStatus, updatedAt: new Date().toISOString() };
        }
        return q;
      })
    );
    toast.success(`Status updated to "${nextStatus}"`);
  };

  const deleteQuestion = (id) => {
    const target = questions.find((q) => q.id === id);
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    toast.error(`Removed "${target?.title || 'Question'}"`);
  };

  const resetToDummyData = () => {
    setQuestions(INITIAL_QUESTIONS);
    setMachineCodingOverride('Auto');
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSelectedDifficulty('All');
    toast.success('Restored initial dummy dataset!');
  };

  const clearAllQuestions = () => {
    setQuestions([]);
    toast('Cleared all questions (Empty State active)', { icon: '🗑️' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSelectedDifficulty('All');
    toast('All search & filter criteria cleared');
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.notes.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || q.status === selectedStatus;
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesStatus && matchesDifficulty;
    });
  }, [questions, searchQuery, selectedCategory, selectedStatus, selectedDifficulty]);

  const metrics = useMemo(() => {
    const total = questions.length;
    const completedTotal = questions.filter((q) => q.status === 'Completed').length;
    const inProgressTotal = questions.filter((q) => q.status === 'In Progress').length;
    const pendingTotal = questions.filter((q) => q.status === 'Pending').length;

    const dsaQuestions = questions.filter((q) => q.category === 'DSA');
    const completedDSA = dsaQuestions.filter((q) => q.status === 'Completed').length;

    const interviewQuestions = questions.filter(
      (q) => q.category === 'Git' || q.category === 'Technical'
    );
    const completedInterview = interviewQuestions.filter((q) => q.status === 'Completed').length;

    const mcQuestions = questions.filter((q) => q.category === 'Machine Coding');
    const completedMC = mcQuestions.filter((q) => q.status === 'Completed').length;

    let computedMCStatus = 'Pending';
    if (machineCodingOverride !== 'Auto') {
      computedMCStatus = machineCodingOverride;
    } else if (mcQuestions.length > 0) {
      if (completedMC === mcQuestions.length) computedMCStatus = 'Completed';
      else if (mcQuestions.some((q) => q.status === 'In Progress' || q.status === 'Completed')) {
        computedMCStatus = 'In Progress';
      }
    }

    const completionPercentage = total > 0 ? Math.round((completedTotal / total) * 100) : 0;

    const categoryBreakdown = CATEGORIES.map((cat) => {
      const catList = questions.filter((q) => q.category === cat);
      const catDone = catList.filter((q) => q.status === 'Completed').length;
      const pct = catList.length > 0 ? Math.round((catDone / catList.length) * 100) : 0;
      return { category: cat, total: catList.length, completed: catDone, percentage: pct };
    });

    return {
      total,
      completedTotal,
      inProgressTotal,
      pendingTotal,
      totalDSA: dsaQuestions.length,
      completedDSA,
      totalInterview: interviewQuestions.length,
      completedInterview,
      totalMC: mcQuestions.length,
      completedMC,
      computedMCStatus,
      completionPercentage,
      categoryBreakdown,
    };
  }, [questions, machineCodingOverride]);

  return (
    <PracticeContext.Provider
      value={{
        questions,
        filteredQuestions,
        metrics,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        selectedDifficulty,
        setSelectedDifficulty,
        machineCodingOverride,
        setMachineCodingOverride,
        addQuestion,
        updateQuestion,
        cycleQuestionStatus,
        deleteQuestion,
        resetToDummyData,
        clearAllQuestions,
        resetFilters,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};