export interface Station {
  name: string;
  AQI: number;
  source: string;
  lat: number;
  lon: number;
}

export interface Forecast {
  day: string;
  AQI: number;
}

export interface Source {
  source: string;
  percent: number;
}

export interface Route {
  name: string;
  distance: string;
  duration: string;
  AQI: number;
  recommended: boolean;
}

export interface ChatMessage {
  id: string;
  question: string;
  answer: string;
}

export const stations: Station[] = [
  { name: "Anand Vihar", AQI: 295, source: "Traffic", lat: 28.650, lon: 77.315 },
  { name: "Punjabi Bagh", AQI: 210, source: "Stubble Burning", lat: 28.670, lon: 77.130 },
  { name: "RK Puram", AQI: 185, source: "Industry", lat: 28.560, lon: 77.180 },
  { name: "Dwarka", AQI: 168, source: "Dust", lat: 28.592, lon: 77.046 },
  { name: "Rohini", AQI: 225, source: "Traffic", lat: 28.743, lon: 77.069 },
  { name: "ITO", AQI: 278, source: "Traffic", lat: 28.628, lon: 77.241 }
];

export const forecast: Forecast[] = [
  { day: "Today", AQI: 210 },
  { day: "Tomorrow", AQI: 195 },
  { day: "Next Day", AQI: 178 }
];

export const sources: Source[] = [
  { source: "Stubble Burning", percent: 45 },
  { source: "Traffic", percent: 30 },
  { source: "Industry", percent: 15 },
  { source: "Dust", percent: 10 }
];

export const routes: Route[] = [
  {
    name: "Route A (NH-24)",
    distance: "12 km",
    duration: "28 min",
    AQI: 180,
    recommended: false
  },
  {
    name: "Route B (Ring Road)",
    distance: "14 km",
    duration: "32 min",
    AQI: 150,
    recommended: true
  }
];

export const healthTips = [
  "Use N95 mask when AQI > 200",
  "Keep windows closed during peak pollution hours",
  "Use air purifiers indoors",
  "Stay hydrated to help flush toxins",
  "Avoid outdoor exercise when AQI is high"
];

export const activities = [
  { time: "6:00 AM - 8:00 AM", AQI: 195, recommendation: "Light walk ok with mask" },
  { time: "12:00 PM - 2:00 PM", AQI: 225, recommendation: "Stay indoors" },
  { time: "6:00 PM - 8:00 PM", AQI: 248, recommendation: "Avoid outdoor activities" },
  { time: "10:00 PM - 11:00 PM", AQI: 212, recommendation: "Indoor activities only" }
];

export const leaderboard = [
  { name: "Rajesh Kumar", actions: 45, badge: "Gold" },
  { name: "Priya Sharma", actions: 38, badge: "Silver" },
  { name: "Amit Singh", actions: 32, badge: "Silver" },
  { name: "Neha Gupta", actions: 28, badge: "Bronze" },
  { name: "Vikram Mehta", actions: 24, badge: "Bronze" }
];

export const chatbotResponses: ChatMessage[] = [
  {
    id: "1",
    question: "What's the AQI near me?",
    answer: "Current AQI at your location (simulated): 210 — Unhealthy. Major source: Traffic (48%). Advice: Limit outdoor time today."
  },
  {
    id: "2",
    question: "Forecast?",
    answer: "24-hr forecast: AQI 195. 48-hr: AQI 178. Air expected to improve gradually."
  },
  {
    id: "3",
    question: "Safe route to Connaught Place?",
    answer: "Route A: 12 km — AQI exposure 180. Route B: 14 km — AQI 150 (recommended)."
  },
  {
    id: "4",
    question: "Why is pollution high today?",
    answer: "Main cause: Regional stubble fires + calm wind conditions. Traffic adds 30%."
  },
  {
    id: "5",
    question: "Suggest a solution.",
    answer: "AI recommendation: Increase stubble management enforcement this week; restrict diesel trucks temporarily."
  }
];

export const aiInsights = {
  predictedAQI: 178,
  topFactors: [
    { name: "Fire Count", trend: "up", impact: "35%" },
    { name: "Wind Speed", trend: "down", impact: "28%" },
    { name: "Traffic Density", trend: "up", impact: "22%" },
    { name: "Temperature", trend: "neutral", impact: "15%" }
  ],
  recommendation: "Restrict night truck movement and increase enforcement of stubble burning violations."
};

export const historicalEvents = [
  { year: 2019, month: "November", AQI: 485, event: "Peak stubble season + Diwali" },
  { year: 2020, month: "November", AQI: 412, event: "Lockdown aftermath + fires" },
  { year: 2021, month: "November", AQI: 468, event: "Heavy stubble burning" },
  { year: 2022, month: "November", AQI: 441, event: "Construction boom + fires" },
  { year: 2023, month: "November", AQI: 456, event: "Farm fires at peak" },
  { year: 2024, month: "November", AQI: 425, event: "Improved enforcement" }
];

export const policyOptions = [
  { name: "Odd-Even Vehicle Scheme", impact: -15 },
  { name: "Construction Ban", impact: -8 },
  { name: "Stubble Burning Fines", impact: -25 },
  { name: "Industrial Shutdown", impact: -12 },
  { name: "Dust Control Measures", impact: -6 }
];

export function getAQICategory(aqi: number): { label: string; color: string; bgColor: string } {
  if (aqi <= 50) return { label: "Good", color: "#10b981", bgColor: "#d1fae5" };
  if (aqi <= 100) return { label: "Moderate", color: "#f59e0b", bgColor: "#fef3c7" };
  if (aqi <= 200) return { label: "Unhealthy", color: "#ef4444", bgColor: "#fee2e2" };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "#9333ea", bgColor: "#f3e8ff" };
  return { label: "Hazardous", color: "#7f1d1d", bgColor: "#fecaca" };
}
