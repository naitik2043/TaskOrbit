import { Card } from "../components/UIComponents.jsx";
import { BarChart3, Clock, Target, Brain } from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center pt-10">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Analytics 🧠
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <Target className="text-indigo-500" />
              <p className="text-sm text-gray-500">Focus Score</p>
              <h2 className="text-xl font-bold">82%</h2>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <Clock className="text-green-500" />
              <p className="text-sm text-gray-500">Avg Study Time</p>
              <h2 className="text-xl font-bold">3.5 hrs</h2>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <BarChart3 className="text-purple-500" />
              <p className="text-sm text-gray-500">Productivity</p>
              <h2 className="text-xl font-bold">High</h2>
            </div>
          </Card>

          <Card>
            <div className="flex flex-col items-center gap-2 text-center py-4">
              <Brain className="text-pink-500" />
              <p className="text-sm text-gray-500">Consistency</p>
              <h2 className="text-xl font-bold">Strong</h2>
            </div>
          </Card>
        </div>

        <Card title="Task Category Breakdown">
          <div className="flex flex-col gap-4">
            {[
              { name: "DSA", value: 80 },
              { name: "Development", value: 60 },
              { name: "Study", value: 90 },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full">
                  <div
                    className="h-2 bg-indigo-600 rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Insights">
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            🚀 You are most productive in the evening <br />
            🔥 Consistency improving weekly <br />
            📈 Focus more on Development
          </div>
        </Card>
      </div>
    </div>
  );
}
