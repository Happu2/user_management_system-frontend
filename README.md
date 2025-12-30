# Frontend – User Management System

React-based frontend for the Mini User Management System with role-based navigation and protected routes.

---

## 🧱 Tech Stack

- React (Hooks)
- Vite
- Tailwind CSS
- React Router DOM

---

## ⚙️ Setup

```bash
npm install
npm run dev
```

The app will run on `http://localhost:5173` by default.

---

## 🔐 Environment Variables

Create a `.env` file in the frontend directory or configure in Netlify:

```env
VITE_API_URL=https://user-management-system-backend-pf5h.onrender.com/api
```

---

## 🚀 Deployment

Deployed on **Netlify** with the following configuration:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variables injected at build time
- SPA routing handled using `_redirects` file

**Live App:** https://<your-frontend>.netlify.app

---

## ✨ Features

### Authentication
- User signup with validation
- Secure login
- JWT token management
- Auto-logout on token expiration

### User Dashboard
- View profile information
- Update name and email
- Change password
- Logout functionality

### Admin Dashboard
- View all users in paginated table
- Activate/deactivate users
- Role-based UI elements
- Search and filter users

### UI/UX
- Fully responsive design
- Clean and modern interface
- Loading states and error handling
- Protected routes based on authentication
- Role-based navigation

---

## 📂 Project Structure

```
frontend/
├── public/
│   └── _redirects
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

---

## 🛠️ Development

Start development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

---

## 📦 Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x"
}
```

---

## 🎨 Styling

The application uses **Tailwind CSS** for styling with a custom color scheme and responsive design system.

Configuration can be found in `tailwind.config.js`.
