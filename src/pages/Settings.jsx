import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { Card, Button } from "../components/UIComponents.jsx";
import { Moon, Sun, Trash2, Save } from "lucide-react";

export default function Settings() {
  const { user, updateProfile, resetApp, showToast, theme, toggleTheme } =
    useApp();

  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      updateProfile({ name });
      showToast("Profile updated ✅");
      setLoading(false);
    }, 500);
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all data?",
    );
    if (!confirmReset) return;

    resetApp();
    showToast("All data reset ⚠️");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your account, preferences and data
        </p>
      </div>

      <Card>
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Account
          </h2>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              Display Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="
                px-4 py-2.5 rounded-xl border
                border-gray-300 dark:border-gray-700
                bg-white dark:bg-gray-900
                text-gray-900 dark:text-white
                placeholder:text-gray-400
                focus:ring-2 focus:ring-indigo-500
                focus:border-indigo-500
                transition-all
              "
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save size={16} />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Appearance
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Switch between light and dark mode
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className={`
              relative w-14 h-7 rounded-full transition-all
              ${theme === "dark" ? "bg-indigo-600" : "bg-gray-300"}
            `}
          >
            <span
              className={`
                absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow
                transition-all flex items-center justify-center
                ${theme === "dark" ? "translate-x-7" : "translate-x-0"}
              `}
            >
              {theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
            </span>
          </button>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-medium text-red-600">Danger Zone</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              These actions are irreversible
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Reset all your data and progress
            </span>

            <Button
              onClick={handleReset}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
            >
              <Trash2 size={16} />
              Reset Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
