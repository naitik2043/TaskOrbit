import { Card } from "../components/UIComponents.jsx";
import { TrendingUp, Calendar, Flame } from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

export default function Progress() {
  const { streak, points } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center pt-10">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Progress 📈
        </h1>

        <div className="grid sm:grid-cols-3 gap-6">
          <Card>
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <Flame className="text-amber-500" />
              <p className="text-sm text-gray-500">Current Streak</p>
              <h2 className="text-2xl font-bold">{streak} days</h2>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <TrendingUp className="text-indigo-500" />
              <p className="text-sm text-gray-500">Total Points</p>
              <h2 className="text-2xl font-bold">{points}</h2>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <Calendar className="text-green-500" />
              <p className="text-sm text-gray-500">Active Days</p>
              <h2 className="text-2xl font-bold">18</h2>
            </div>
          </Card>
        </div>

        <Card title="Weekly Progress">
          <div className="h-48 flex items-center justify-center text-gray-400">
            📊 Chart coming soon
          </div>
        </Card>

        <Card title="Completion Rate">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span>Tasks Completed</span>
              <span>75%</span>
            </div>

            <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full">
              <div className="h-3 w-[75%] bg-indigo-600 rounded-full"></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
