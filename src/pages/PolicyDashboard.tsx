import { BarChart3, Map, FileText, Sliders, AlertCircle, Clock } from 'lucide-react';
import { stations, sources, forecast, historicalEvents, policyOptions, getAQICategory } from '../data/dummyData';
import { useState } from 'react';

export default function PolicyDashboard() {
  const [selectedPolicy, setSelectedPolicy] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handlePolicySimulation = () => {
    if (selectedPolicy) {
      const policy = policyOptions.find(p => p.name === selectedPolicy);
      alert(`Simulating: ${policy?.name}\nEstimated AQI Impact: ${policy?.impact}%\nNew Predicted AQI: ${Math.round(210 * (1 + policy!.impact / 100))}`);
    }
  };

  const generateReport = () => {
    alert('PDF Report Generated!\n\nSummary:\n• Current AQI: 210 (Unhealthy)\n• Major Source: Stubble Burning (45%)\n• Predicted Trend: Improving\n• Recommended Actions: 3\n\nDownload would start in production...');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-[#006d6d] to-[#008b8b] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Policy Dashboard</h1>
        </div>
        <p className="text-white/80">
          Real-time analytics and policy simulation for Delhi-NCR
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm text-gray-600 mb-2">Average AQI</p>
          <p className="text-4xl font-bold text-[#006d6d]">210</p>
          <p className="text-xs text-gray-500 mt-1">Delhi-NCR Region</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm text-gray-600 mb-2">Critical Stations</p>
          <p className="text-4xl font-bold text-red-500">3</p>
          <p className="text-xs text-gray-500 mt-1">AQI &gt; 250</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm text-gray-600 mb-2">Improvement</p>
          <p className="text-4xl font-bold text-green-500">-7%</p>
          <p className="text-xs text-gray-500 mt-1">vs Yesterday</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Map className="w-6 h-6 text-[#006d6d]" />
          <h3 className="font-semibold text-lg">AQI Heatmap - Monitoring Stations</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stations.map((station, index) => {
            const category = getAQICategory(station.AQI);
            return (
              <div key={index} className="p-4 rounded-xl border-2 hover:shadow-lg transition-all" style={{ borderColor: category.color }}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{station.name}</h4>
                  <span className="text-2xl font-bold" style={{ color: category.color }}>
                    {station.AQI}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">Primary: {station.source}</p>
                <span
                  className="px-2 py-1 rounded-full text-xs font-semibold inline-block"
                  style={{ backgroundColor: category.bgColor, color: category.color }}
                >
                  {category.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Source Contribution Analysis</h3>
          <div className="space-y-4">
            {sources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{source.source}</span>
                  <span className="text-sm font-bold text-[#006d6d]">{source.percent}%</span>
                </div>
                <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${source.percent}%`,
                      backgroundColor: index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : index === 2 ? '#8b5cf6' : '#6b7280'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">3-Day Forecast Trend</h3>
          <div className="space-y-4">
            {forecast.map((day, index) => {
              const category = getAQICategory(day.AQI);
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-24">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="h-full rounded-lg flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-500"
                        style={{
                          width: `${(day.AQI / 300) * 100}%`,
                          backgroundColor: category.color
                        }}
                      >
                        {day.AQI}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Sliders className="w-6 h-6 text-[#006d6d]" />
          <h3 className="font-semibold text-lg">Policy Impact Simulator</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Policy Intervention
            </label>
            <select
              value={selectedPolicy}
              onChange={(e) => setSelectedPolicy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006d6d]"
            >
              <option value="">Choose a policy...</option>
              {policyOptions.map((policy, index) => (
                <option key={index} value={policy.name}>
                  {policy.name} (Impact: {policy.impact}%)
                </option>
              ))}
            </select>
            <button
              onClick={handlePolicySimulation}
              disabled={!selectedPolicy}
              className="w-full mt-4 bg-gradient-to-r from-[#006d6d] to-[#008b8b] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Run Simulation
            </button>
          </div>
          <div className="bg-[#f5f7f7] rounded-xl p-4">
            <h4 className="font-semibold text-sm mb-3">Expected Impact</h4>
            {selectedPolicy ? (
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Policy:</strong> {selectedPolicy}
                </p>
                <p>
                  <strong>AQI Reduction:</strong>{' '}
                  <span className="text-green-600 font-semibold">
                    {policyOptions.find(p => p.name === selectedPolicy)?.impact}%
                  </span>
                </p>
                <p>
                  <strong>New AQI:</strong>{' '}
                  <span className="text-[#006d6d] font-semibold">
                    {Math.round(210 * (1 + (policyOptions.find(p => p.name === selectedPolicy)?.impact || 0) / 100))}
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Select a policy to see expected impact</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-[#006d6d]" />
          <h3 className="font-semibold text-lg">Historical Events (2019-2024)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Year</th>
                <th className="text-left py-3 px-4 font-semibold">Period</th>
                <th className="text-center py-3 px-4 font-semibold">Peak AQI</th>
                <th className="text-left py-3 px-4 font-semibold">Major Event</th>
              </tr>
            </thead>
            <tbody>
              {historicalEvents.map((event, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-[#f5f7f7]">
                  <td className="py-3 px-4 font-medium">{event.year}</td>
                  <td className="py-3 px-4">{event.month}</td>
                  <td className="text-center py-3 px-4">
                    <span className="font-bold" style={{ color: getAQICategory(event.AQI).color }}>
                      {event.AQI}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{event.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-[#ffb400]" />
            <h3 className="font-semibold text-lg">Create Alert</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006d6d]">
                <option>All Delhi-NCR</option>
                <option>Central Delhi</option>
                <option>South Delhi</option>
                <option>East Delhi</option>
                <option>Noida</option>
                <option>Gurgaon</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006d6d]">
                <option>Health Advisory</option>
                <option>Traffic Restriction</option>
                <option>School Closure</option>
                <option>Construction Ban</option>
              </select>
            </div>
            <button
              onClick={() => setShowAlert(true)}
              className="w-full bg-[#ffb400] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Send Advisory
            </button>
            {showAlert && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">
                ✓ Alert sent to all residents in selected region
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-[#006d6d]" />
            <h3 className="font-semibold text-lg">Generate Report</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[#f5f7f7] rounded-xl text-sm">
              <p className="font-semibold mb-2">Report will include:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• Current AQI summary across all stations</li>
                <li>• Source contribution analysis</li>
                <li>• 7-day forecast and trends</li>
                <li>• Policy recommendations</li>
                <li>• Historical comparisons</li>
              </ul>
            </div>
            <button
              onClick={generateReport}
              className="w-full bg-gradient-to-r from-[#006d6d] to-[#008b8b] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Generate PDF Report
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#006d6d] to-[#008b8b] rounded-2xl p-6 text-white shadow-lg">
        <h3 className="font-semibold text-lg mb-3">🧠 AI Model Explainability</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-sm text-white/80 mb-1">Top Feature</p>
            <p className="text-xl font-bold">Wind Speed</p>
            <p className="text-sm text-white/70 mt-1">35% weight</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-sm text-white/80 mb-1">Model Accuracy</p>
            <p className="text-xl font-bold">92%</p>
            <p className="text-sm text-white/70 mt-1">24-hour forecast</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-sm text-white/80 mb-1">Data Sources</p>
            <p className="text-xl font-bold">12+</p>
            <p className="text-sm text-white/70 mt-1">Real-time sensors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
