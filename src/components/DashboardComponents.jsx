import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { getStats, getHeatmapData } from "../utils/helpers.js";
import { StatCard, ProgressBar, Card } from "./UIComponents.jsx";

export function StatsGrid() {
  const { tasks, streak, points } = useApp();
  const stats = useMemo(() => getStats(tasks), [tasks]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon="📋" label="Total Tasks" value={stats.total} />
      <StatCard icon="✅" label="Completed" value={stats.completed} />
      <StatCard icon="🔥" label="Streak" value={`${streak}d`} />
      <StatCard icon="⭐" label="Points" value={points} />
    </div>
  );
}

export function ProgressSection() {
  const { tasks } = useApp();
  const stats = useMemo(() => getStats(tasks), [tasks]);

  const percentage = Math.round((stats.completed / (stats.total || 1)) * 100);

  return (
    <Card title="Progress">
      <div className="space-y-5">
        <ProgressBar
          value={stats.completed}
          max={stats.total || 1}
          label={`Tasks Completed (${percentage}%)`}
        />

        <div className="flex justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>🟢 {stats.completed} done</span>
          <span>⚪ {stats.pending} remaining</span>
        </div>
      </div>
    </Card>
  );
}

export function Heatmap() {
  const { activityLog } = useApp();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const data = useMemo(
    () => getHeatmapData(activityLog, selectedYear, selectedMonth),
    [activityLog, selectedYear, selectedMonth],
  );

  const weeks = [];
  let week = [];

  data.forEach((day, index) => {
    const date = new Date(day.date);
    const dayOfWeek = date.getDay();

    if (index === 0) {
      for (let i = 0; i < dayOfWeek; i++) week.push(null);
    }

    week.push(day);

    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const getColor = (count) => {
    if (!count) return "bg-gray-200 dark:bg-gray-800";
    if (count <= 2) return "bg-emerald-200 dark:bg-emerald-900";
    if (count <= 4) return "bg-emerald-400";
    if (count <= 6) return "bg-emerald-600";
    return "bg-emerald-800";
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card title="Activity Heatmap">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-between items-center">
          <div className="flex gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="input-style"
            >
              {[2024, 2025, 2026].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="input-style"
            >
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((m, i) => (
                <option key={i} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {new Date(selectedYear, selectedMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
        </div>

        <div className="flex gap-3 overflow-x-auto">
          <div className="flex flex-col justify-between text-[10px] text-gray-400 py-1">
            {days.map((d, i) => (
              <span key={i}>{i % 2 === 0 ? d : ""}</span>
            ))}
          </div>

          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => {
                  if (!day) {
                    return <div key={di} className="w-3 h-3 sm:w-4 sm:h-4" />;
                  }

                  const isToday =
                    new Date(day.date).toDateString() ===
                    new Date().toDateString();

                  return (
                    <div
                      key={di}
                      title={`${day.label}: ${day.count} tasks`}
                      className={`
                        w-3 h-3 sm:w-4 sm:h-4 rounded-sm
                        ${getColor(day.count)}
                        ${isToday ? "ring-2 ring-yellow-400" : ""}
                        hover:scale-125 transition
                      `}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>Less</span>
          {[0, 2, 4, 6, 8].map((n) => (
            <div key={n} className={`w-3 h-3 rounded-sm ${getColor(n)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </Card>
  );
}

export function QuoteCard() {
  const { quote } = useApp();
  if (!quote) return null;

  return (
    <Card>
      <div
        className="flex flex-col items-center justify-center text-center 
                      max-w-xl mx-auto px-6 py-8"
      >
        <p
          className="text-base sm:text-lg italic leading-relaxed 
                      text-gray-800 dark:text-gray-200"
        >
          “{quote.text}”
        </p>

        <p
          className="mt-4 text-sm 
                      text-gray-500 dark:text-gray-400"
        >
          — {quote.author}
        </p>
      </div>
    </Card>
  );
}

export function TodayTasks() {
  const { tasks, toggleTask } = useApp();

  const todayTasks = useMemo(() => {
    return tasks
      .filter(
        (t) =>
          new Date(t.createdAt).toDateString() === new Date().toDateString(),
      )
      .slice(0, 5);
  }, [tasks]);

  return (
    <Card title="Today's Tasks">
      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            No tasks for today 🚀
          </p>
        ) : (
          todayTasks.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 p-2 rounded-lg 
              hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTask(t.id)}
                className="accent-emerald-500"
              />

              <span
                className={`text-sm ${
                  t.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800 dark:text-gray-100"
                }`}
              >
                {t.title}
              </span>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <StatsGrid />
            <ProgressSection />
            <TodayTasks />
          </div>

          <div className="space-y-6">
            <QuoteCard />
            <Heatmap />
          </div>
        </div>
      </div>
    </div>
  );
}
