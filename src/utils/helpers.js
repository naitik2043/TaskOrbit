// ========== Date Helpers ==========
export const formatDate = (date) => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const getToday = () => new Date().toISOString().split('T')[0]

export const getDaysAgo = (n) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

// ========== Task Helpers ==========
export const filterTasks = (tasks, filter, search) => {
  let result = tasks
  if (filter === 'completed') result = result.filter(t => t.completed)
  if (filter === 'pending') result = result.filter(t => !t.completed)
  if (search.trim()) {
    result = result.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
  }
  return result
}

export const getStats = (tasks) => ({
  total: tasks.length,
  completed: tasks.filter(t => t.completed).length,
  pending: tasks.filter(t => !t.completed).length,
  progress: tasks.length ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
})

// ========== Streak Helpers ==========
export const calculateStreak = (activityLog) => {
  const today = getToday()
  let streak = 0
  let current = new Date()
  
  for (let i = 0; i < 365; i++) {
    const dateStr = current.toISOString().split('T')[0]
    if (activityLog[dateStr] && activityLog[dateStr] > 0) {
      streak++
    } else if (dateStr !== today) {
      break
    }
    current.setDate(current.getDate() - 1)
  }
  return streak
}

export const getHeatmapData = (activityLog) => {
  const data = []
  for (let i = 29; i >= 0; i--) {
    const dateStr = getDaysAgo(i)
    data.push({
      date: dateStr,
      count: activityLog[dateStr] || 0,
      label: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    })
  }
  return data
}

// ========== Points ==========
export const POINTS_PER_TASK = 10

// ========== Storage ==========
export const loadFromStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : fallback
  } catch { return fallback }
}

export const saveToStorage = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

// ========== Validation ==========
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
export const validatePassword = (pw) => pw.length >= 6

// ========== Avatar ==========
export const getAvatar = (seed) => `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(seed)}`
