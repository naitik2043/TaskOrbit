import { NavLink } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  LayoutDashboard,
  CheckSquare,
  User,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const links = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/tasks", icon: CheckSquare, label: "Tasks" },
  { to: "/progress", icon: CheckSquare, label: "Progress" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  const { user, sidebarOpen, toggleSidebar, streak, points } = useApp();

  if (!user) return null;

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`
        fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 z-50
        flex flex-col transition-transform duration-300

        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-800

        lg:sticky lg:translate-x-0 lg:z-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 lg:hidden">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Menu
          </span>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 active:scale-95 transition"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={() => sidebarOpen && toggleSidebar()}
              className={({ isActive }) =>
                `relative group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200

                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              <span
                className={`
                absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full
                ${
                  location.pathname === link.to
                    ? "bg-indigo-600"
                    : "bg-transparent"
                }
              `}
              />

              <link.icon size={18} className="shrink-0" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 pb-6">
          <div
            className="
            rounded-2xl p-5 
            bg-gray-50 dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            shadow-sm
            space-y-4
          "
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                🔥 Streak
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {streak} days
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ⭐ Points
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {points}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
