# Personal Habit Challenge League - Frontend

This is the frontend for the **Personal Habit Challenge League**, a web application that allows users to track and compete in habit challenges, view leaderboard rankings, and manage their personal growth journey in a fun, gamified environment. Built with **React** and styled using **Tailwind CSS**, the frontend interfaces with a Flask backend via RESTful APIs.

> 👉 **Backend Repository Link:** [https://github.com/Christine-June/Personal-Habit-Challenge-League]  
> 👉 **Live App Link:** [https://vercel.com/christine-junes-projects/personal-habit-league-2]

---

## 📚 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [File Structure](#file-structure)
- [Component & Page Descriptions](#component--page-descriptions)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [License](#license)

---

## 📝 Overview

This client-side app allows:

- New and returning users to view available challenges and track their habits.
- Users to log daily habit entries, including date, value, and notes.
- Visualization of entries and participants in a clean and intuitive UI.
- Admin-style users to view all users, habits, and participation stats.

---

## ⚙️ Tech Stack

- **React 19**
- **React Router DOM**
- **Tailwind CSS**
- **@tanstack/react-query**
- **Vite**
- **Axios (via `api.js`)**

---

## 📁 File Structure

src/
├── App.jsx # Main app with all route declarations
├── api.js # Axios helper to manage API requests
├── index.js # App root render entry
├── components/
│ ├── DarkModeToggle.jsx # Toggle for light/dark mode
│ ├── Footer.jsx # Page footer
│ ├── Leaderboard.jsx # Component to show leaderboard stats
│ └── Navbar.jsx # Main site navigation bar
└── pages/
├── ChallengeEntriesPage.jsx # Logs of entries for challenges
├── ChallengeParticipantsPage.jsx # Who joined which challenge
├── ChallengesPage.jsx # List of available challenges
├── HabitEntriesPage.jsx # Page to view & create habit entries
├── HabitsPage.jsx # List of habits being tracked
├── HomePage.jsx # Gen Z styled dashboard home
├── UserHabitsPage.jsx # View specific user's habits
└── UsersPage.jsx # All registered users

---

## 🔍 Component & Page Descriptions

### `App.jsx`

- Acts as the root router.
- Uses `react-router-dom` to handle navigation.
- Displays a layout with `Navbar`, `DarkModeToggle`, main content via `<Routes>`, and a `Footer`.

### `api.js`

- Contains helper functions using `axios` to interact with the backend API.
- Includes methods like `getHabitEntries`, `createHabitEntry`, etc.

### Pages

#### `HomePage.jsx`

- Gen-Z styled landing page welcoming users.
- Sidebar.

#### `UsersPage.jsx`

- Lists all users fetched from the backend.

#### `HabitsPage.jsx`

- Displays available habits in the system.

#### `ChallengesPage.jsx`

- Shows a list of public habit challenges users can join.

#### `UserHabitsPage.jsx`

- Displays habits that belong to a specific user.

#### `ChallengeParticipantsPage.jsx`

- Shows which users are participating in which challenges.

#### `ChallengeEntriesPage.jsx`

- Shows entries logged by users in the challenges.

#### `HabitEntriesPage.jsx`

- A form-based page allowing users to log habit entries.
- Uses `react-query` for caching and mutations.
- Implements optimistic UI updates and validation.

### Components

#### `Navbar.jsx`

- Navigation bar used across all pages.

#### `Footer.jsx`

- Minimal styled footer.

#### `Leaderboard.jsx`

- Fetches and shows top performers.

#### `DarkModeToggle.jsx`

- Button to toggle between light/dark modes using Tailwind's `dark` class.

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/Christine-June/Personal-Habit-League-2
cd Personal-Habit-League-2

2. Install Dependencies
npm install

3. Start the Dev Server
npm run dev
Make sure the backend is running at the correct URL (e.g., http://localhost:5000) that matches the base URL in api.js.

📜 Available Scripts
npm run dev - Start local development server.

🔗 Useful Resources
TailwindCSS Docs

🪪 License
This project is for educational purposes.
Maintained by Christine Mworia & team (Brian Kaloki, Eugene Wekesa, Regina Kariuki, Anderson Waithaka, Priscillah Njai).

