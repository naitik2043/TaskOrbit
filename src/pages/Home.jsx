import { useEffect } from "react";
import { useApp } from "../context/AppContext.jsx";
import {
  StatsGrid,
  ProgressSection,
  Heatmap,
  QuoteCard,
  TodayTasks,
} from "../components/DashboardComponents.jsx";

export default function Dashboard() {
  const { user, fetchTasks, fetchQuote, tasksLoaded } = useApp();

  useEffect(() => {
    if (user && !tasksLoaded) fetchTasks();
    fetchQuote();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center pt-10">
      <div
        className="
        w-full max-w-[1400px]
        px-4 sm:px-6 lg:px-10
        flex flex-col gap-12
      "
      >
        <section>
          <div
            className="
            relative overflow-hidden rounded-3xl 
            p-8 sm:p-10
            bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700
            text-white shadow-xl
          "
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl" />

            <div className="relative flex flex-col gap-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                {user
                  ? `Welcome back, ${user.name}! 👋`
                  : "Build Consistency, Achieve More 🚀"}
              </h1>

              <p className="text-sm sm:text-base text-indigo-100 max-w-2xl leading-relaxed">
                {user
                  ? "Track your progress, manage tasks, and stay consistent every day."
                  : "Turn your daily efforts into visible progress with TaskOrbit."}
              </p>

              {!user && (
                <div className="flex gap-3 flex-wrap">
                  <button
                    className="
                    px-6 h-11 rounded-xl 
                    bg-white text-indigo-600 font-semibold
                    hover:bg-gray-100 hover:scale-105
                    shadow-md hover:shadow-lg
                    transition-all duration-300
                  "
                  >
                    Get Started →
                  </button>

                  <button
                    className="
                    px-6 h-11 rounded-xl 
                    border border-white/30 text-white
                    hover:bg-white/10
                    transition-all
                  "
                  >
                    Learn More
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <StatsGrid />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <ProgressSection />
          </div>

          <div className="card p-6">
            <QuoteCard />
          </div>
        </section>

        <section>
          {!user ? (
            <div className="card p-10 flex flex-col items-center gap-8 text-center">
              <div className="text-5xl">🚀</div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Productivity System Starts Here
              </h2>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-xl">
                Plan your tasks, build streaks, and track your growth — all in
                one place.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
                {[
                  { icon: "📋", title: "Smart Tasks" },
                  { icon: "🔥", title: "Daily Streak" },
                  { icon: "📊", title: "Insights" },
                  { icon: "📅", title: "Activity" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      flex flex-col items-center gap-2 p-4 rounded-xl 
                      bg-gray-50 dark:bg-gray-800 
                      border border-gray-200 dark:border-gray-700
                      hover:bg-gray-100 dark:hover:bg-gray-700
                      hover:shadow-md hover:-translate-y-1
                      transition-all duration-300
                    "
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className="
                px-6 h-11 rounded-xl 
                bg-indigo-600 hover:bg-indigo-700 
                text-white font-semibold
                shadow-md hover:shadow-lg 
                transition-all hover:scale-[1.03]
              "
              >
                Get Started for Free →
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                No distractions. Just consistency.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card p-6">
                <TodayTasks />
              </div>

              <div className="card p-6">
                <Heatmap />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
