import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { AddTaskForm, TaskFilters, TaskList } from '../components/TaskComponents.jsx'
import { filterTasks, getStats } from '../utils/helpers.js'
import { Loader } from '../components/UIComponents.jsx'

export default function Tasks() {
  const { tasks, fetchTasks, tasksLoaded } = useApp()

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!tasksLoaded) fetchTasks()
  }, [])

  const filtered = filterTasks(tasks, filter, search)
  const stats = getStats(tasks)

  if (!tasksLoaded) return <Loader text="Loading tasks..." />

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-4">

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Tasks 📝
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stats.completed} of {stats.total} tasks completed
          </p>
        </div>

        <section className="space-y-5">
          <div className="card p-6">
            <AddTaskForm />
          </div>
        </section>

        <section className="space-y-5">
          <div className="card p-6">
            <TaskFilters
              filter={filter}
              setFilter={setFilter}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </section>

        <section className="space-y-5">
          <div className="card p-6">
            <TaskList tasks={filtered} />
          </div>
        </section>

      </div>
    </div>
  )
}