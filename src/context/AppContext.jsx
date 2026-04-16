import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import {
  loadFromStorage,
  saveToStorage,
  getToday,
  POINTS_PER_TASK,
  calculateStreak
} from '../utils/helpers.js'

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export function AppProvider({ children }) {

  // ===== THEME =====
  const [dark, setDark] = useState(() => loadFromStorage('theme', false))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    saveToStorage('theme', dark)
  }, [dark])

  const toggleTheme = () => setDark(prev => !prev)


  // ===== AUTH =====
  const [user, setUser] = useState(() => loadFromStorage('user', null))

  useEffect(() => {
    saveToStorage('user', user)
  }, [user])

  const login = (email, password) => {
    const users = loadFromStorage('users_db', [])
    const found = users.find(u => u.email === email && u.password === password)

    if (!found) {
      return { success: false, error: 'Invalid email or password' }
    }

    const userData = { ...found, password: undefined }
    setUser(userData)
    return { success: true }
  }

  const signup = (name, email, password) => {
    const users = loadFromStorage('users_db', [])

    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' }
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      avatar: '',
      bio: ''
    }

    saveToStorage('users_db', [...users, newUser])

    const userData = { ...newUser, password: undefined }
    setUser(userData)

    return { success: true }
  }

  const logout = () => setUser(null)

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)

    const users = loadFromStorage('users_db', [])
    const idx = users.findIndex(u => u.email === user.email)

    if (idx >= 0) {
      users[idx] = { ...users[idx], ...updates }
      saveToStorage('users_db', users)
    }
  }


  // ===== TASKS =====
  const [tasks, setTasks] = useState(() => loadFromStorage('tasks', []))
  const [tasksLoaded, setTasksLoaded] = useState(false)

  useEffect(() => {
    saveToStorage('tasks', tasks)
  }, [tasks])

  const fetchTasks = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=15')
      const data = await res.json()

      const fetched = data.map(t => ({
        id: t.id,
        title: t.title,
        completed: t.completed,
        createdAt: getToday()
      }))

      setTasks(prev => (prev.length > 0 ? prev : fetched))
    } catch {
      // silent fail
    } finally {
      setTasksLoaded(true)
    }
  }

  const addTask = (title) => {
    const task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: getToday()
    }
    setTasks(prev => [task, ...prev])
  }

  const deleteTask = (id) =>
    setTasks(prev => prev.filter(t => t.id !== id))

  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id !== id) return t

        const updated = { ...t, completed: !t.completed }

        if (updated.completed) logActivity()

        return updated
      })
    )
  }


  // ===== ACTIVITY =====
  const [activityLog, setActivityLog] = useState(() =>
    loadFromStorage('activityLog', {})
  )
  const [points, setPoints] = useState(() =>
    loadFromStorage('points', 0)
  )

  useEffect(() => {
    saveToStorage('activityLog', activityLog)
  }, [activityLog])

  useEffect(() => {
    saveToStorage('points', points)
  }, [points])

  const logActivity = () => {
    const today = getToday()

    setActivityLog(prev => ({
      ...prev,
      [today]: (prev[today] || 0) + 1
    }))

    setPoints(prev => prev + POINTS_PER_TASK)
  }

  const streak = useMemo(() => calculateStreak(activityLog), [activityLog])


  // ===== QUOTE =====
  const [quote, setQuote] = useState(null)

  const fetchQuote = async () => {
    try {
      const res = await fetch('https://api.quotable.io/random')
      const data = await res.json()

      setQuote({
        text: data.content,
        author: data.author
      })
    } catch {
      setQuote({
        text: "Stay consistent. Small steps matter.",
        author: "TaskOrbit"
      })
    }
  }


  // ===== TOAST =====
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success') => {
    const id = Date.now()

    setToasts(prev => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }


  // ===== SIDEBAR =====
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(prev => !prev)


  // ===== MEMO VALUE (PERFORMANCE BOOST) =====
  const value = useMemo(() => ({
    dark, toggleTheme,
    user, login, signup, logout, updateProfile,
    tasks, tasksLoaded, fetchTasks, addTask, deleteTask, toggleTask,
    activityLog, points, streak,
    quote, fetchQuote,
    toasts, showToast,
    sidebarOpen, toggleSidebar
  }), [
    dark, user, tasks, tasksLoaded,
    activityLog, points, streak,
    quote, toasts, sidebarOpen
  ])

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}