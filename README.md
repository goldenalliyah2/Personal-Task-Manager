# TaskDuty

TaskDuty is a simple task management web app I built with React, TypeScript, and Tailwind CSS. It was designed to closely follow the provided Figma layout while keeping the app functional and easy to use.

## Features

- Create a new task with a title, description, and tags
- View all saved tasks
- Edit existing tasks
- Delete tasks
- Select and remove **Urgent** and **Important** tags
- Form validation for required fields
- Tasks are saved in the browser using `localStorage`
- Navigation between the landing page, task list, new task, and edit task pages

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- Iconify
- Lucide React
- localStorage

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/goldenalliyah2/Personal-Task-Manager.git
cd Personal-Task-Manager
```

### 2. Install dependencies

Make sure Node.js and npm are installed, then run:

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### 4. Build for production (optional)

```bash
npm run build
```

### 5. Run linting (optional)

```bash
npm run lint
```

## How It Works

Create a task from the **New Task** page and click **Done** to save it. Saved tasks appear on the **My Tasks** page. From there, you can edit a task or delete it. Because the app uses `localStorage`, the tasks remain available after refreshing the browser on the same device/browser.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── Navbar.tsx
│   ├── CoverPage.tsx
│   ├── NewTask.tsx
│   ├── EditTask.tsx
│   ├── TaskCard.tsx
│   └── types.ts
├── pages/
│   └── Task.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## GitHub

https://github.com/goldenalliyah2/Personal-Task-Manager


## Known Issues / Limitations

- Tasks are stored in the browser using `localStorage`, so they are not shared across devices or browsers.
- Clearing the browser's site data will remove the saved tasks.
- The project does not currently use a backend or database, so there is no user account or cloud synchronization.

At the time of submission, there are no other known functional issues with the main task creation, viewing, editing, and deletion flow.
