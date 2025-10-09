import { TrendingDown, Calendar, Wind, Droplets, Thermometer } from 'lucide-react';
import { forecast, getAQICategory } from '../data/dummyData';

export default function ForecastPage() {
  const extendedForecast = [
    { day: "Today", date: "Dec 15", AQI: 210, temp: 18, humidity: 65, wind: 8 },
    { day: "Tomorrow", date: "Dec 16", AQI: 195, temp: 19, humidity: 60, wind: 12 },
    { day: "Day 3", date: "Dec 17", AQI: 178, temp: 20, humidity: 58, wind: 15 },
    { day: "Day 4", date: "Dec 18", AQI: 165, temp: 21, humidity: 55, wind: 18 },
    { day: "Day 5", date: "Dec 19", AQI: 155, temp: 22, humidity: 52, wind: 20 }
  ];

  const maxAQI = Math.max(...extendedForecast.map(f => f.AQI));

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#006d6d] to-[#008b8b] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <TrendingDown className="w-8 h-8" />
          <h1 className="text-3xl font-bold">5-Day Forecast</h1>
        </div>
        <p className="text-white/80">
          Air quality expected to improve gradually over the next few days
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-semibold text-lg mb-6">AQI Trend</h3>
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between gap-2">
            {extendedForecast.map((day, index) => {
              const category = getAQICategory(day.AQI);
              const height = (day.AQI / maxAQI) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full group">
                    <div
                      className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                      style={{
                        height: `${height}%`,
                        minHeight: '40px',
                        backgroundColor: category.color
                      }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        AQI: {day.AQI}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-700">{day.day}</p>
                    <p className="text-xs text-gray-500">{day.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {extendedForecast.map((day, index) => {
          const category = getAQICategory(day.AQI);
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{day.day}</h4>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#006d6d] mb-1">{day.AQI}</div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                    style={{ backgroundColor: category.bgColor, color: category.color }}
                  >
                    {category.label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-[#ffb400]" />
                  <div>
                    <p className="text-xs text-gray-500">Temp</p>
                    <p className="text-sm font-semibold">{day.temp}°C</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#006d6d]" />
                  <div>
                    <p className="text-xs text-gray-500">Humidity</p>
                    <p className="text-sm font-semibold">{day.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Wind</p>
                    <p className="text-sm font-semibold">{day.wind} km/h</p>
                  </div>
                </div>
              </div>

              {index === 0 && (
                <div className="mt-4 p-3 bg-[#ffb400]/10 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Advisory:</strong> Limit outdoor activities during peak hours (12 PM - 4 PM)
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-[#006d6d] to-[#008b8b] rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold text-lg mb-3">📊 Forecast Insights</h3>
        <ul className="space-y-2 text-sm text-white/90">
          <li className="flex items-start gap-2">
            <span className="text-[#ffb400] mt-1">•</span>
            <span>Wind speeds increasing from 8 to 20 km/h will help disperse pollutants</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffb400] mt-1">•</span>
            <span>Humidity levels dropping, reducing particle formation</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#ffb400] mt-1">•</span>
            <span>No major stubble burning events predicted in the region</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
