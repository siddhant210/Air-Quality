import { useEffect, useState } from 'react';
import { Cloud } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#006d6d] via-[#008b8b] to-[#00a5a5] flex flex-col items-center justify-center z-[100]">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl"></div>
          <Cloud className="w-24 h-24 text-white relative animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            ClearAir AI
          </h1>
          <p className="text-white/80 text-lg">
            Breathe Better with Intelligence
          </p>
        </div>

        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-white to-[#ffb400] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-white/60 text-sm">
          {progress < 30 && "Initializing AI models..."}
          {progress >= 30 && progress < 60 && "Loading pollution data..."}
          {progress >= 60 && progress < 90 && "Preparing dashboard..."}
          {progress >= 90 && "Ready!"}
        </div>
      </div>

      <div className="absolute bottom-8 text-center">
        <p className="text-white/80 text-sm">Built for SIH 2025</p>
        <p className="text-[#ffb400] font-semibold">Team EcoVision</p>
      </div>
    </div>
  );
}
