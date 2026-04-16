import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext.jsx'

// Layout
import Layout from './components/Layout.jsx'

// Pages
import Home from './pages/Home.jsx'
import Tasks from './pages/Tasks.jsx'
import Profile from './pages/Profile.jsx'
import Progress from './pages/Progress.jsx'
import Analytics from './pages/Analytics.jsx'
import Settings from './pages/Settings.jsx'

import Auth from './pages/Auth.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'


// ===== PRIVATE ROUTE (UPDATED) =====
function PrivateRoute() {
  const { user } = useApp()
  return user ? <Outlet /> : <Navigate to="/auth" replace />
}


// ===== APP ROUTES =====
function AppRoutes() {
  const { user } = useApp()

  return (
    <Routes>

      {/* ===== ALL PAGES WITH LAYOUT ===== */}
      <Route element={<Layout />}>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* PROTECTED GROUP */}
        <Route element={<PrivateRoute />}>

          <Route path="/dashboard" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

        </Route>

      </Route>

      {/* AUTH (NO LAYOUT) */}
      <Route
        path="/auth"
        element={user ? <Navigate to="/dashboard" replace /> : <Auth />}
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}


// ===== ROOT =====
export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  )
}