
# Attendance System Frontend

A modern attendance management system built with **React**, **TypeScript**, and **Vite**. This project provides a user-friendly interface for managing lectures, students, and attendance records, with authentication and role-based access.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Pages Overview](#pages-overview)
- [UI Components](#ui-components)
- [Authentication](#authentication)
- [API Integration](#api-integration)
- [Development](#development)
- [License](#license)

---

## Features

- User authentication (login/register)
- Role-based access (student/admin)
- Dashboard with statistics
- CRUD for lectures and students
- Attendance marking and reporting
- Responsive, modern UI with Tailwind CSS
- Modular, reusable component structure

---

## Project Structure

```
src/
  api/           # Axios instance and API config
  assets/        # Static assets (images, icons, etc.)
  components/    # Reusable UI and layout components
    ui/          # Atomic UI components (Button, Card, Input, etc.)
  context/       # React context for authentication
  lib/           # Utility functions
  pages/         # Route-based pages (Dashboard, Lectures, etc.)
  App.tsx        # Main app and routing
  main.tsx       # Entry point
```

---

## Key Components

### `App.tsx`
- Sets up routing using React Router.
- Wraps the app in `AuthProvider` for authentication context.
- Defines public and protected routes.
- Uses `DashboardLayout` for authenticated pages.

### `DashboardLayout.tsx`
- Provides a sidebar navigation and layout for dashboard pages.
- Shows navigation links, user info, and logout button.

### `Navbar.tsx`
- Simple top navigation bar for branding and quick links.

### `ProtectedRoute.tsx`
- Restricts access to authenticated users.
- Redirects unauthenticated users to the login page.

---

## Pages Overview

- **Login/Register**: User authentication forms.
- **Dashboard**: Overview of statistics (lectures, students, attendance).
- **Lectures**: List, create, edit, and view lectures.
- **LectureDetail**: Details and attendance management for a lecture.
- **Attendance**: Mark attendance for students in a lecture.
- **Students**: List, create, and search students.
- **StudentReport**: View attendance report for a student.

---

## UI Components

Located in `src/components/ui/`:

- **Button**: Styled button with variants.
- **Card**: Card container for grouping content.
- **Input**: Styled input field.
- **Label**: Accessible label for form fields.
- **Badge**: Status or tag indicator.
- **Select**: Custom select dropdown.
- **Textarea**: Styled textarea.

All UI components use Tailwind CSS and utility helpers for consistent styling.

---

## Authentication

- Managed via `AuthContext` in `src/context/AuthContext.tsx`.
- Stores user and token in localStorage.
- Provides `login` and `logout` methods.
- Protects routes using `ProtectedRoute`.

---

## API Integration

- Uses Axios (`src/api/axios.ts`) for HTTP requests.
- Base URL is set via environment variable or defaults to the backend deployment.
- Automatically attaches JWT token to requests if available.

---

## Development

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables (optional):
   - Create a `.env` file and set `VITE_API_URL` if you want to override the default backend URL.

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

---

## License

This project is licensed under the MIT License.

---

## Credits

- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/).
- UI icons from [Lucide](https://lucide.dev/).
