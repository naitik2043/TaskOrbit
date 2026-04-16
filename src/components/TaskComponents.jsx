import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { Button } from './UIComponents.jsx'
import { Plus, Trash2, Search, Check } from 'lucide-react'

// ===== Add Task Form =====
export function AddTaskForm() {
  const [title, setTitle] = useState('')
  const { addTask, showToast } = useApp()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask(title.trim())
    setTitle('')
    showToast('Task added!')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="relative flex-1">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="
            w-full px-4 py-3 rounded-xl 
            border border-gray-200 dark:border-gray-700 
            bg-white dark:bg-gray-900 
            text-gray-800 dark:text-gray-100 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            placeholder:text-gray-400
            transition
          "
        />
      </div>

      <Button type="submit" className="flex items-center gap-1.5 px-5">
        <Plus size={16} /> Add
      </Button>
    </form>
  )
}

// ===== Search & Filter =====
export function TaskFilters({ filter, setFilter, search, setSearch }) {
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-6">

      {/* 🔍 SEARCH */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="
            w-full pl-12 pr-4 py-3.5 rounded-2xl 
            border border-gray-200 dark:border-gray-700 
            bg-gray-50 dark:bg-gray-900 
            text-gray-800 dark:text-gray-100 text-sm

            focus:outline-none focus:ring-2 focus:ring-indigo-500/30 
            focus:border-indigo-500

            shadow-sm
            placeholder:text-gray-400
            transition-all
          "
        />
      </div>

      {/* 🎯 FILTER BUTTONS (FIXED) */}
      <div className="flex items-center gap-2">

        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`
              px-4 py-2 rounded-xl text-xs font-medium 
              transition-all duration-200 border

              ${
                filter === f.value
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
          >
            {f.label}
          </button>
        ))}

      </div>

    </div>
  )
}

// ===== Task Item =====
export function TaskItem({ task }) {
  const { toggleTask, deleteTask, showToast } = useApp()

  return (
    <div className={`
      group flex items-center gap-4 
      px-5 py-4 rounded-xl border transition-all
      ${task.completed
        ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10'
        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-indigo-300 dark:hover:border-indigo-500/40'
      }
    `}>

      {/* CHECKBOX */}
      <button
        onClick={() => {
          toggleTask(task.id)
          if (!task.completed) showToast('+10 points! 🎉')
        }}
        className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
          ${task.completed
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
          }
        `}
      >
        {task.completed && <Check size={12} />}
      </button>

      {/* TITLE */}
      <span className={`
        flex-1 text-sm leading-relaxed
        ${task.completed
          ? 'line-through text-gray-400'
          : 'text-gray-800 dark:text-gray-100'
        }
      `}>
        {task.title}
      </span>

      {/* DELETE */}
      <button
        onClick={() => {
          deleteTask(task.id)
          showToast('Task deleted', 'error')
        }}
        className="
          opacity-0 group-hover:opacity-100 
          p-2 rounded-md 
          hover:bg-red-100 dark:hover:bg-red-500/10 
          text-red-500 transition-all
        "
      >
        <Trash2 size={14} />
      </button>

    </div>
  )
}

// ===== Task List =====
export function TaskList({ tasks }) {
  if (!tasks.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-2">📝</p>
        <p className="text-sm">No tasks found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {tasks.map(task => <TaskItem key={task.id} task={task} />)}
    </div>
  )
}