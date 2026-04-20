import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import {
  Sun,
  Moon,
  Menu,
  LogOut,
  LogIn,
  LayoutDashboard,
  CheckSquare,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export default function Navbar() {
  const { dark, toggleTheme, user, logout, toggleSidebar } = useApp();
  const location = useLocation();

  return (
    <header
      className="
      sticky top-0 z-50 w-full
      border-b border-gray-200/60 dark:border-white/10
      bg-white/70 dark:bg-gray-950/60
      backdrop-blur-xl
      shadow-sm
    "
    >
      <div className="flex items-center h-14 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={toggleSidebar}
              className="
                lg:hidden p-2 rounded-xl 
                hover:bg-gray-100 dark:hover:bg-gray-800 
                active:scale-95 transition
              "
            >
              <Menu size={20} />
            </button>
          )}

          <Link
            to="/"
            className="
              flex items-center gap-2 font-semibold text-lg 
              text-gray-900 dark:text-white tracking-tight
              hover:opacity-80 transition
            "
          >
            <span className="text-2xl">🪐</span>
            <span className="hidden sm:inline">TaskOrbit</span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <div
            className="
            flex items-center gap-1 p-1 rounded-xl
            bg-gray-100 dark:bg-gray-800
          "
          >
            {user ? (
              <>
                <NavItem
                  to="/"
                  icon={LayoutDashboard}
                  label="Overview"
                  active={location.pathname === "/"}
                />
                <NavItem
                  to="/tasks"
                  icon={CheckSquare}
                  label="Tasks"
                  active={location.pathname === "/tasks"}
                />
                <NavItem
                  to="/progress"
                  icon={TrendingUp}
                  label="Progress"
                  active={location.pathname === "/progress"}
                />
                <NavItem
                  to="/analytics"
                  icon={BarChart3}
                  label="Analytics"
                  active={location.pathname === "/analytics"}
                />
              </>
            ) : (
              <>
                <NavItem
                  to="/"
                  label="Home"
                  active={location.pathname === "/"}
                />
                <NavItem
                  to="/about"
                  label="About"
                  active={location.pathname === "/about"}
                />
                <NavItem
                  to="/contact"
                  label="Contact"
                  active={location.pathname === "/contact"}
                />
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-xl 
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700
              active:scale-95
              transition-all
            "
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                className="
                  hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl
                  bg-gray-100 dark:bg-gray-800
                  hover:bg-gray-200 dark:hover:bg-gray-700
                  transition-all
                "
              >
                <img
                  src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${user.email}`}
                  className="
                    w-7 h-7 rounded-full 
                    border border-gray-200 dark:border-gray-700
                  "
                />

                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Stay consistent 🔥
                  </span>
                </div>
              </Link>

              <button
                onClick={logout}
                className="
                  p-2 rounded-xl text-red-500 
                  hover:bg-red-100 dark:hover:bg-red-500/10
                  active:scale-95
                  transition-all
                "
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="
                px-4 h-9 flex items-center justify-center rounded-xl 
                bg-indigo-600 hover:bg-indigo-700 
                text-white text-sm font-medium 
                shadow-sm hover:shadow-md
                transition-all active:scale-95
              "
            >
              <LogIn size={16} />
              <span className="ml-1">Get Started</span>
            </Link>
          )}
        </div>
      </div>

      <MobileNav user={user} />
    </header>
  );
}

function NavItem({ to, label, active, icon: Icon }) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-1 px-3 h-9 rounded-lg 
        text-sm font-medium transition-all duration-200
        ${
          active
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
        }
      `}
    >
      {Icon && <Icon size={16} />}
      {label}
    </Link>
  );
}

function MobileNav({ user }) {
  const location = useLocation();

  return (
    <div
      className="
      md:hidden border-t border-gray-200 dark:border-gray-800 
      flex justify-around px-2 py-2 
      bg-white/90 dark:bg-gray-950/90 backdrop-blur
    "
    >
      {user ? (
        <>
          <NavItem to="/" label="Home" active={location.pathname === "/"} />
          <NavItem
            to="/tasks"
            label="Tasks"
            active={location.pathname === "/tasks"}
          />
          <NavItem
            to="/progress"
            label="Progress"
            active={location.pathname === "/progress"}
          />
          <NavItem
            to="/analytics"
            label="Analytics"
            active={location.pathname === "/analytics"}
          />
        </>
      ) : (
        <>
          <NavItem to="/" label="Home" active={location.pathname === "/"} />
          <NavItem
            to="/about"
            label="About"
            active={location.pathname === "/about"}
          />
          <NavItem
            to="/contact"
            label="Contact"
            active={location.pathname === "/contact"}
          />
        </>
      )}
    </div>
  );
}
