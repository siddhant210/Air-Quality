import { Brain, TrendingUp, TrendingDown, Minus, Activity, Award, BookOpen } from 'lucide-react';
import { aiInsights, activities, leaderboard, getAQICategory } from '../data/dummyData';

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#006d6d] to-[#008b8b] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8" />
          <h1 className="text-3xl font-bold">AI Insights</h1>
        </div>
        <p className="text-white/80">
          Machine learning-powered analysis of pollution patterns
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-semibold text-lg mb-4">48-Hour AI Prediction</h3>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Predicted AQI</p>
            <p className="text-5xl font-bold text-[#006d6d]">{aiInsights.predictedAQI}</p>
          </div>
          <div className="text-right">
            <span
              className="px-4 py-2 rounded-full text-sm font-semibold inline-block"
              style={{
                backgroundColor: getAQICategory(aiInsights.predictedAQI).bgColor,
                color: getAQICategory(aiInsights.predictedAQI).color
              }}
            >
              {getAQICategory(aiInsights.predictedAQI).label}
            </span>
            <p className="text-xs text-gray-500 mt-2">Next 48 hours</p>
          </div>
        </div>

        <div className="bg-[#f5f7f7] rounded-xl p-4">
          <h4 className="font-semibold text-sm mb-3 text-gray-700">Top Contributing Factors</h4>
          <div className="space-y-3">
            {aiInsights.topFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {factor.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                  {factor.trend === 'down' && <TrendingDown className="w-4 h-4 text-green-500" />}
                  {factor.trend === 'neutral' && <Minus className="w-4 h-4 text-gray-400" />}
                  <span className="text-sm font-medium">{factor.name}</span>
                </div>
                <span className="text-sm font-semibold text-[#006d6d]">{factor.impact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#ffb400] to-[#ff9500] rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold text-lg mb-3">🤖 AI Recommendation</h3>
        <p className="text-white/90 text-sm leading-relaxed">
          {aiInsights.recommendation}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">Confidence: 87%</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">Impact: High</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="w-6 h-6 text-[#006d6d]" />
          <h3 className="font-semibold text-lg">Activity Planner</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">Best times for outdoor activities today</p>
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const category = getAQICategory(activity.AQI);
            return (
              <div key={index} className="flex items-center justify-between p-4 bg-[#f5f7f7] rounded-xl">
                <div>
                  <p className="font-medium text-sm">{activity.time}</p>
                  <p className="text-xs text-gray-600 mt-1">{activity.recommendation}</p>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: category.bgColor, color: category.color }}
                >
                  {activity.AQI}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-[#ffb400]" />
          <h3 className="font-semibold text-lg">CleanAir Heroes</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">Top contributors this month</p>
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#f5f7f7] rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#006d6d] to-[#008b8b] rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-600">{user.actions} eco-actions</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user.badge === 'Gold'
                    ? 'bg-yellow-100 text-yellow-700'
                    : user.badge === 'Silver'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-orange-100 text-orange-700'
                }`}
              >
                {user.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-[#006d6d]" />
          <h3 className="font-semibold text-lg">Know Your Air</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-[#f5f7f7] rounded-xl">
            <h4 className="font-semibold text-sm mb-2">What is PM2.5?</h4>
            <p className="text-sm text-gray-700">
              Fine particulate matter smaller than 2.5 micrometers that can penetrate deep into lungs
              and enter the bloodstream, causing serious health issues.
            </p>
          </div>
          <div className="p-4 bg-[#f5f7f7] rounded-xl">
            <h4 className="font-semibold text-sm mb-2">AQI Categories</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>0-50: Good</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>51-100: Moderate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>101-200: Unhealthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                <span>201-300: Very Unhealthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-900"></div>
                <span>300+: Hazardous</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
