import { Navigation, MapPin, Clock, Wind, CheckCircle } from 'lucide-react';
import { routes, getAQICategory } from '../data/dummyData';

export default function SafeRoutePage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#006d6d] to-[#008b8b] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <Navigation className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Safe Route Planner</h1>
        </div>
        <p className="text-white/80">
          Find routes with lower pollution exposure
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="space-y-4 mb-6">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#006d6d]" />
            <input
              type="text"
              value="Current Location"
              readOnly
              className="w-full pl-12 pr-4 py-3 bg-[#f5f7f7] rounded-xl text-gray-700 font-medium cursor-not-allowed"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ffb400]" />
            <input
              type="text"
              value="Connaught Place, New Delhi"
              readOnly
              className="w-full pl-12 pr-4 py-3 bg-[#f5f7f7] rounded-xl text-gray-700 font-medium cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Wind className="w-4 h-4" />
          <span>Calculating routes with minimal pollution exposure...</span>
        </div>
      </div>

      <div className="space-y-4">
        {routes.map((route, index) => {
          const category = getAQICategory(route.AQI);
          return (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all ${
                route.recommended ? 'ring-2 ring-[#006d6d]' : ''
              }`}
            >
              {route.recommended && (
                <div className="flex items-center gap-2 mb-3 text-[#006d6d]">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">Recommended Route</span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{route.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-4 h-4" />
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {route.duration}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#006d6d] mb-1">{route.AQI}</div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold inline-block"
                    style={{ backgroundColor: category.bgColor, color: category.color }}
                  >
                    {category.label}
                  </span>
                </div>
              </div>

              <div className="bg-[#f5f7f7] rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  <strong>Average AQI Exposure:</strong> {route.AQI}
                  {route.recommended && (
                    <span className="block mt-2 text-[#006d6d]">
                      ✓ This route passes through areas with better air quality
                    </span>
                  )}
                </p>
              </div>

              <button
                className={`w-full mt-4 py-3 rounded-xl font-semibold transition-all ${
                  route.recommended
                    ? 'bg-gradient-to-r from-[#006d6d] to-[#008b8b] text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Select This Route
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="font-semibold text-lg mb-4">Route Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Route</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Distance</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Time</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Avg AQI</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-[#f5f7f7]">
                  <td className="py-3 px-2">
                    {route.name}
                    {route.recommended && (
                      <span className="ml-2 text-xs text-[#006d6d]">★</span>
                    )}
                  </td>
                  <td className="text-center py-3 px-2">{route.distance}</td>
                  <td className="text-center py-3 px-2">{route.duration}</td>
                  <td className="text-center py-3 px-2">
                    <span className="font-semibold" style={{ color: getAQICategory(route.AQI).color }}>
                      {route.AQI}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#ffb400] to-[#ff9500] rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold text-lg mb-3">💡 Travel Tips</h3>
        <ul className="space-y-2 text-sm text-white/90">
          <li>• Keep windows closed during high-pollution zones</li>
          <li>• Use cabin air filter in recirculation mode</li>
          <li>• Avoid peak traffic hours (8-10 AM, 6-8 PM)</li>
          <li>• Wear N95 mask if traveling by bike or walking</li>
        </ul>
      </div>
    </div>
  );
}
