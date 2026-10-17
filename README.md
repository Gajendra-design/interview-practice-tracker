# 🎯 Interview Practice Tracker

A responsive frontend machine coding dashboard where students can track, filter, and analyze their weekly interview-preparation workflow across Data Structures & Algorithms (DSA), Git, Core Technical concepts, and Machine-Coding rounds.

---

## 🔗 Project Deliverables
- **Live Deployment Link:** [https://interview-practice-tracker-ochre.vercel.app](https://interview-practice-tracker-ochre.vercel.app)
- **GitHub Repository:** [https://github.com/Gajendra-design/interview-practice-tracker](https://github.com/Gajendra-design/interview-practice-tracker)
- **Demo Video (1–2 min):** `[Insert your Loom / Google Drive link here]`

---

## 🚀 Key Features

### 1. Overview Dashboard
- **Total Questions Metric:** Live count of questions with a breakdown of in-progress and pending items.
- **Completed DSA Problems:** Dedicated tracker for algorithmic questions.
- **Completed Interview Questions:** Aggregate count combining conceptual topics across **Git** and **Technical** rounds.
- **Machine-Coding Status Card:** Real-time round status with support for automatic calculation and manual status override directly from the card.

### 2. Visual Progress Indicator
- Dynamic progress bar calculating overall completion percentage across all stored questions.
- Modular breakdown cards displaying completion progress per category (DSA, Git, Technical, Machine Coding).

### 3. Question Tracker & Status Management
- Multi-field practice questions containing Title, Category, Difficulty, Topic tag, Reference URL, and Revision Notes.
- One-click status cycling (`Pending` ➔ `In Progress` ➔ `Completed`) with inline status strikethrough.
- Complete CRUD operations (Create, Read, Update, Delete).

### 4. Search & Multi-Criteria Filters
- Real-time instant search matching question titles, topic tags, and revision notes.
- Combined filtering dropdowns:
  - **Category:** All, DSA, Git, Technical, Machine Coding
  - **Difficulty:** All, Easy, Medium, Hard
  - **Status:** All, Pending, In Progress, Completed
- One-click reset for search and active filters.

### 5. Robust State & Edge Case Handling
- **Empty State:** Clean fallback screen with a direct action button to add a question or reload dummy data when storage is cleared.
- **No Search Results State:** Dedicated feedback screen when filters or search queries return 0 items.
- **Form Validation:** Managed with `react-hook-form` with custom error messaging for required fields, min/max length, and valid URL syntax.

### 6. Client-Side Persistence & Feedback
- Synced with browser `localStorage` to retain data across page reloads and tab closures without needing a backend server.
- Interactive toast notifications via `react-hot-toast` for additions, updates, deletions, and dataset resets.

---

## 🛠️ Tech Stack & Architecture

- **UI Framework:** [React 19 / 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management:** React Context API (`PracticeContext`) + Custom Hook (`usePractice`)
- **Client-Side Storage:** Browser `localStorage`
- **Form Management & Validation:** [`react-hook-form`](https://react-hook-form.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [`lucide-react`](https://lucide.dev/)
- **Toaster Notifications:** [`react-hot-toast`](https://react-hot-toast.com/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 📂 Component-Based Folder Architecture

```text
src/
├── components/
│   ├── Navbar.jsx              # Navigation header with reset/empty test controls
│   ├── DashboardStats.jsx      # Top 4 summary metric cards
│   ├── ProgressBanner.jsx      # Visual progress bar & per-category percentages
│   ├── SearchFilterBar.jsx     # Multi-filter controls & live search input
│   ├── QuestionCard.jsx        # Question card with one-click status toggle & edit/delete
│   ├── TrackerEmptyState.jsx   # Zero-data and zero-search-results placeholder screens
│   └── QuestionFormModal.jsx   # Add/Edit modal powered by react-hook-form
├── context/
│   └── PracticeContext.jsx     # Context provider managing local storage & calculations
├── data/
│   └── initialQuestions.js     # Pre-loaded realistic dummy questions & constants
├── App.jsx                     # Root application container & modal triggers
├── main.jsx                    # Application mount point with providers
└── index.css                   # Tailwind styles