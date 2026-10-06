TaskDuty

TaskDuty is a personal task management application built with React and TypeScript. It was developed in two stages: a frontend task manager and a backend API with authentication, authorization, and user-scoped task management.

Features

Frontend

Create tasks with a title, description, and tags

View all saved tasks

Edit existing tasks

Delete tasks

Select tags such as Urgent and Important

Navigate between the different pages

Figma-inspired layout, typography, spacing, colors, and components

Save frontend tasks locally using browser localStorage

Backend

User registration

User login

Password hashing with bcrypt

JWT authentication

Protected routes

User-scoped task data

Create, read, update, and delete tasks

Authorization to prevent users from accessing another user's tasks

Request validation with Zod

MongoDB persistence with Mongoose

API testing with Thunder Client

Tech Stack

Frontend

React

TypeScript

Tailwind CSS

React Router

Iconify

Lucide React

LocalStorage

Backend

Node.js

Express

TypeScript

MongoDB

Mongoose

Zod

JSON Web Tokens (JWT)

bcryptjs

Thunder Client

Project Structure

Personal-Task-Manager/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── task.controller.ts
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   ├── models/
│   │   │   ├── Task.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   └── task.routes.ts
│   │   ├── schemas/
│   │   │   ├── auth.schema.ts
│   │   │   └── task.schema.ts
│   │   ├── utils/
│   │   │   └── jwt.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── src/
│   ├── components/
│   ├── Pages/
│   ├── assets/
│   └── ...
│
├── package.json
└── README.md

Setup

1. Clone the repository

git clone https://github.com/goldenalliyah2/Personal-Task-Manager.git
cd Personal-Task-Manager

2. Frontend setup

Install the frontend dependencies:

npm install

Start the frontend:

npm run dev

The frontend runs locally on:

http://localhost:5173

3. Backend setup

Open a second terminal and move into the backend:

cd backend

Install backend dependencies:

npm install

Create a file named .env inside the backend folder.

Add:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Use your own MongoDB connection string and JWT secret.

Start the backend:

npm run dev

The backend runs locally on:

http://localhost:5000

4. Test the API

The backend is tested separately using Thunder Client or another API testing tool.

Health check:

GET /api/health

API Endpoints

Authentication

Register

POST /api/auth/register

Example body:

{
  "name": "Alliyah",
  "email": "alliyah@example.com",
  "password": "TaskDuty2026"
}

Login

POST /api/auth/login

Example body:

{
  "email": "alliyah@example.com",
  "password": "TaskDuty2026"
}

The login response returns a JWT token. Use this token as a Bearer token when accessing protected task routes.

Current authenticated user

GET /api/auth/me

This route requires:

Authorization: Bearer <JWT_TOKEN>

Tasks

All task routes require authentication.

Create a task

POST /api/tasks

Example body:

{
  "title": "Project Defense",
  "description": "Prepare my slides and practice my presentation",
  "tags": ["Urgent"]
}

Get all tasks for the authenticated user

GET /api/tasks

Get one task

GET /api/tasks/:id

Update a task

PATCH /api/tasks/:id

Example body:

{
  "title": "Updated Project Defense",
  "tags": ["Urgent", "Important"]
}

Delete a task

DELETE /api/tasks/:id

Authentication and Authorization

The backend uses JWT authentication.

When a user logs in successfully, the server returns a JWT containing the user's ID. Protected routes verify that token before allowing access.

Tasks are stored with the authenticated user's ID. The server uses that ID when querying, updating, or deleting tasks.

This means a user can only:

See their own tasks

Create tasks for themselves

Update their own tasks

Delete their own tasks

A user cannot access another user's task by simply knowing its task ID.

Validation

Zod is used to validate authentication and task request data before it is processed.

Examples of validated fields include:

Name

Email

Password

Task title

Task description

Task tags

Invalid requests return appropriate validation errors.

Security

Passwords are hashed with bcryptjs before being stored.

JWTs are used to authenticate protected requests.

The real .env file is excluded from Git using .gitignore.

.env.example is provided as a template for required environment variables.

User IDs are taken from the authenticated token instead of being trusted from the request body.

Testing Workflow

The backend was tested with Thunder Client.

The main test flow includes:

Register a user

Login and receive a JWT

Verify a protected route using the JWT

Create a task

Get the authenticated user's tasks

Get one task

Update the task

Delete the task

Register and login a second user

Confirm the second user cannot access the first user's tasks

Confirm the second user cannot update or delete the first user's tasks

Confirm protected routes reject requests without a valid JWT

Known Limitations

The React frontend is not connected to the backend in this stage. The backend is tested separately with Thunder Client, as required by the internship brief.

The backend depends on a valid MongoDB connection string and JWT secret stored in the local backend/.env file.

The project is intended to run locally and has not been deployed.

There is currently no password reset, email verification, refresh-token flow, or role-based access control.

Frontend task data and backend task data are separate because the frontend has not been integrated with the backend for this stage.

Clearing browser localStorage removes tasks created through the frontend, while backend tasks are stored separately in MongoDB.

GitHub Repository

https://github.com/goldenalliyah2/Personal-Task-Manager