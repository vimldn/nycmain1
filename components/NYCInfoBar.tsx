'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  condition: string;
}

export default function NYCInfoBar() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time for NYC (EST/EDT)
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      // Format date
      const dateString = now.toLocaleDateString('en-US', {
        timeZone: 'America/New_York',
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/New_York'
        );
        
        const data = await response.json();
        
        const getWeatherCondition = (code: number): string => {
          const weatherCodes: { [key: number]: string } = {
            0: 'Clear Sky', 1: 'Mostly Clear', 2: 'Partly Cloudy', 3: 'Cloudy',
            45: 'Foggy', 48: 'Foggy', 51: 'Light Drizzle', 53: 'Drizzle',
            55: 'Heavy Drizzle', 61: 'Light Rain', 63: 'Rain', 65: 'Heavy Rain',
            71: 'Light Snow', 73: 'Snow', 75: 'Heavy Snow', 77: 'Snow Grains',
            80: 'Light Showers', 81: 'Showers', 82: 'Heavy Showers',
            85: 'Light Snow Showers', 86: 'Snow Showers', 95: 'Thunderstorm',
            96: 'Thunderstorm', 99: 'Severe Thunderstorm',
          };
          return weatherCodes[code] || 'Unknown';
        };
        
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getWeatherCondition(data.current.weather_code)
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { opacity: 0.8; box-shadow: 0 0 30px rgba(59, 130, 246, 0.6); }
        }
        .gradient-animate {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.25) 0%, rgba(147, 51, 234, 0.25) 25%, rgba(59, 130, 246, 0.25) 50%, rgba(147, 51, 234, 0.25) 75%, rgba(59, 130, 246, 0.25) 100%);
          background-size: 200% 100%;
          animation: gradient-shift 8s ease infinite;
        }
        .divider-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative gradient-animate rounded-2xl border border-blue-500/30 shadow-lg shadow-blue-500/10 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0e1a]/80 backdrop-blur-sm"></div>
        
        {/* ALWAYS HORIZONTAL - COMPACT ON MOBILE, WIDE ON DESKTOP */}
        <div className="relative flex flex-row items-center justify-between gap-3 sm:gap-6 px-4 sm:px-8 md:px-12 lg:px-16 py-3 sm:py-6">
          
          {/* Time */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-white font-bold text-sm sm:text-xl md:text-2xl tracking-tight whitespace-nowrap">
                {currentTime} <span className="text-blue-400 text-xs sm:text-xl">EST</span>
              </span>
              <span className="text-gray-400 text-[10px] sm:text-sm md:text-base font-medium truncate">
                {currentDate}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-10 sm:h-14 md:h-16 w-0.5 bg-gradient-to-b from-transparent via-blue-400 to-transparent divider-glow flex-shrink-0"></div>

          {/* Weather */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {loading ? (
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-white font-bold text-sm sm:text-xl md:text-2xl whitespace-nowrap animate-pulse">...</span>
                <span className="text-gray-400 text-[10px] sm:text-sm md:text-base truncate">Loading</span>
              </div>
            ) : weather ? (
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-white font-bold text-sm sm:text-xl md:text-2xl tracking-tight whitespace-nowrap">
                  {weather.temp}<span className="text-blue-400 text-xs sm:text-xl">°F</span>
                </span>
                <span className="text-gray-400 text-[10px] sm:text-sm md:text-base font-medium truncate">
                  {weather.condition}
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-white font-bold text-sm sm:text-xl md:text-2xl whitespace-nowrap">N/A</span>
                <span className="text-gray-400 text-[10px] sm:text-sm md:text-base truncate">Unavailable</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-10 sm:h-14 md:h-16 w-0.5 bg-gradient-to-b from-transparent via-purple-400 to-transparent divider-glow flex-shrink-0"></div>

          {/* NYC */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex flex-col gap-0.5 text-left">
              <span className="text-white font-bold text-sm sm:text-xl md:text-2xl tracking-tight whitespace-nowrap">
                <span className="gradient-text">NYC</span>
              </span>
              <span className="text-gray-400 text-[10px] sm:text-sm md:text-base font-medium truncate">
                New York City
              </span>
            </div>
          </div>
        </div>
        
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}
