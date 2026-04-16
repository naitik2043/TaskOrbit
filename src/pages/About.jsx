import { BookOpen, Target, Zap, Users } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Smart Task Management',
    desc: 'Organize your daily tasks, set priorities, and stay focused with a clean interface.'
  },
  {
    icon: Target,
    title: 'Streak & Consistency',
    desc: 'Build powerful habits by maintaining streaks and tracking your daily consistency.'
  },
  {
    icon: Zap,
    title: 'Productivity Insights',
    desc: 'Visualize your progress with stats, heatmaps, and performance tracking.'
  },
  {
    icon: Users,
    title: 'Personal Dashboard',
    desc: 'Manage your tasks, progress, and learning journey in one place.'
  }
]

export default function About() {
  return (
    <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12">

      <div className="flex flex-col gap-14">

        {/* ===== HERO ===== */}
        <div className="text-center flex flex-col items-center gap-5">

          <h1 className="
            text-3xl sm:text-4xl font-bold 
            text-gray-900 dark:text-white
            tracking-tight
          ">
            About TaskOrbit 🚀
          </h1>

          <p className="
            text-sm sm:text-base 
            text-gray-600 dark:text-gray-400 
            max-w-2xl leading-relaxed
          ">
            TaskOrbit is a modern productivity system designed for students who want to stay consistent,
            manage their time effectively, and turn daily efforts into long-term success.
          </p>

        </div>

        {/* ===== FEATURES ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {features.map((f, i) => (
            <div
              key={i}
              className="
                group rounded-2xl p-6
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                shadow-sm hover:shadow-lg
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              <div className="flex items-start gap-4">

                <div className="
                  p-3 rounded-xl
                  bg-indigo-100 text-indigo-600
                  dark:bg-indigo-500/10 dark:text-indigo-400
                  group-hover:scale-110 transition
                ">
                  <f.icon size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {f.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    {f.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* ===== WHY SECTION ===== */}
        <div className="text-center flex flex-col items-center gap-4">

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Why TaskOrbit?
          </h2>

          <p className="
            text-sm text-gray-600 dark:text-gray-400 
            max-w-2xl leading-relaxed
          ">
            Unlike traditional to-do apps, TaskOrbit focuses on consistency and habit-building.
            It helps you stay disciplined, visualize your growth, and improve daily without feeling overwhelmed.
          </p>

        </div>

        {/* ===== TECH STACK ===== */}
        <div className="flex flex-col items-center gap-5">

          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Built With
          </h2>

          <div className="flex flex-wrap justify-center gap-3">

            {[
              'React',
              'Vite',
              'Tailwind CSS',
              'React Router',
              'Lucide Icons',
              'Local Storage'
            ].map((t) => (
              <span
                key={t}
                className="
                  px-4 py-1.5 rounded-full text-sm font-medium
                  bg-gray-100 dark:bg-gray-800
                  text-gray-700 dark:text-gray-300
                  border border-gray-200 dark:border-gray-700
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition
                "
              >
                {t}
              </span>
            ))}

          </div>

        </div>

        {/* ===== CTA ===== */}
        <div className="
          relative w-full rounded-2xl p-8 text-center
          bg-gradient-to-r from-indigo-600 to-indigo-500
          shadow-lg
        ">

          <h3 className="text-lg font-semibold text-white">
            Start Your Productivity Journey 🚀
          </h3>

          <p className="text-sm text-indigo-100 mt-2">
            Join TaskOrbit and turn your daily routine into consistent progress.
          </p>

          <button className="
            mt-5 px-6 h-10 rounded-xl 
            bg-white text-indigo-600 font-medium
            hover:bg-gray-100 hover:scale-105
            transition-all
          ">
            Get Started →
          </button>

        </div>

      </div>
    </div>
  )
}