import { useApp } from "../context/AppContext.jsx";

export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center px-4 h-10 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md",
    secondary:
      "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-md",
    ghost:
      "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
    success:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm hover:shadow-md",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}

export function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-10 h-10 border-4 border-gray-300 dark:border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
      <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
        {text}
      </p>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useApp();
  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-[90%] sm:w-auto">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl text-sm font-medium shadow-lg border backdrop-blur-md
          ${
            t.type === "success"
              ? "bg-emerald-500/90 text-white border-emerald-500"
              : t.type === "error"
                ? "bg-red-500/90 text-white border-red-500"
                : "bg-indigo-600/90 text-white border-indigo-600"
          } animate-[slideIn_.3s_ease-out]`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function StatCard({ icon, label, value, color = "brand" }) {
  const colors = {
    brand:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    success:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    warning:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400",
    danger: "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  };

  return (
    <div
      className="
      w-full rounded-2xl p-5 
      bg-white dark:bg-gray-900 
      border border-gray-200 dark:border-gray-800 
      shadow-sm hover:shadow-lg 
      transition-all duration-300
      hover:-translate-y-1
    "
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${colors[color]}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ProgressBar({ value, max = 100, label }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">{label}</span>
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {pct}%
          </span>
        </div>
      )}

      <div className="h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function Card({ children, className = "", title }) {
  return (
    <div
      className={`
      w-full rounded-2xl p-6
      bg-white dark:bg-gray-900 
      border border-gray-200 dark:border-gray-800 
      shadow-sm hover:shadow-lg 
      transition-all duration-300
      hover:-translate-y-[2px]
      dark:shadow-none
      ${className}
    `}
    >
      {title && (
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-5 tracking-tight">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
