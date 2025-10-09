import { Wind, AlertTriangle, TrendingDown, MapPin } from 'lucide-react';
import { stations, forecast, sources, healthTips, getAQICategory } from '../data/dummyData';

export default function HomePage() {
  const currentAQI = 210;
  const category = getAQICategory(currentAQI);
  const nearestStation = stations[1];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#006d6d] to-[#008b8b] p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-white/80 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Near {nearestStation.name}</span>
          </div>
          <h1 className="text-6xl font-bold mb-2">{currentAQI}</h1>
          <div className="flex items-center gap-3">
            <span
              className="px-4 py-1 rounded-full text-sm font-semibold"
              style={{ backgroundColor: category.bgColor, color: category.color }}
            >
              {category.label}
            </span>
            <span className="text-white/80">Air Quality Index</span>
          </div>
          <p className="mt-4 text-white/90">
            Major source: {nearestStation.source} ({sources.find(s => s.source === nearestStation.source)?.percent}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#ffb400]/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#ffb400]" />
            </div>
            <h3 className="font-semibold text-lg">Health Alert</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Air quality is unhealthy. Sensitive groups should limit outdoor exposure.
          </p>
          <div className="space-y-2">
            {healthTips.slice(0, 3).map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#006d6d] rounded-full mt-2"></div>
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#006d6d]/20 rounded-full flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-[#006d6d]" />
            </div>
            <h3 className="font-semibold text-lg">3-Day Forecast</h3>
          </div>
          <div className="space-y-3">
            {forecast.map((day, index) => {
              const dayCategory = getAQICategory(day.AQI);
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{day.day}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-[#006d6d]">{day.AQI}</span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: dayCategory.bgColor, color: dayCategory.color }}
                    >
                      {dayCategory.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#006d6d]/20 rounded-full flex items-center justify-center">
            <Wind className="w-5 h-5 text-[#006d6d]" />
          </div>
          <h3 className="font-semibold text-lg">Pollution Sources Today</h3>
        </div>
        <div className="space-y-4">
          {sources.map((source, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{source.source}</span>
                <span className="text-sm font-bold text-[#006d6d]">{source.percent}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#006d6d] to-[#ffb400] rounded-full transition-all duration-500"
                  style={{ width: `${source.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#ffb400] to-[#ff9500] rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold text-lg mb-3">💡 Did You Know?</h3>
        <p className="text-white/90 text-sm leading-relaxed">
          Stubble burning in Punjab and Haryana contributes up to 45% of Delhi's air pollution during
          October-November. Wind patterns carry smoke particles over 300 km into Delhi-NCR.
        </p>
      </div>
    </div>
  );
}
