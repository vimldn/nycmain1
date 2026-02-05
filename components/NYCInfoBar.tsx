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
        // Using Open-Meteo API (free, no API key required)
        // NYC coordinates: 40.7128° N, 74.0060° W
        const response = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/New_York'
        );
        
        const data = await response.json();
        
        // Weather code mapping
        const getWeatherCondition = (code: number): string => {
          const weatherCodes: { [key: number]: string } = {
            0: 'Clear Sky',
            1: 'Mostly Clear',
            2: 'Partly Cloudy',
            3: 'Cloudy',
            45: 'Foggy',
            48: 'Foggy',
            51: 'Light Drizzle',
            53: 'Drizzle',
            55: 'Heavy Drizzle',
            61: 'Light Rain',
            63: 'Rain',
            65: 'Heavy Rain',
            71: 'Light Snow',
            73: 'Snow',
            75: 'Heavy Snow',
            77: 'Snow Grains',
            80: 'Light Showers',
            81: 'Showers',
            82: 'Heavy Showers',
            85: 'Light Snow Showers',
            86: 'Snow Showers',
            95: 'Thunderstorm',
            96: 'Thunderstorm',
            99: 'Severe Thunderstorm',
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
    // Refresh weather every 10 minutes
    const interval = setInterval(fetchWeather, 600000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 px-6 py-3.5 bg-[#0a0e1a] bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 rounded-lg border border-blue-500/10">
      {/* Time and Date */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-white font-semibold text-[15px]">{currentTime} EST</span>
          <span className="text-gray-400 text-[11px]">{currentDate}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-8 w-0.5 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>

      {/* Weather */}
      <div className="flex items-center gap-2">
        {loading ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-white font-semibold text-[15px]">Loading...</span>
            <span className="text-gray-400 text-[11px]">Weather data</span>
          </div>
        ) : weather ? (
          <div className="flex flex-col gap-0.5">
            <span className="text-white font-semibold text-[15px]">{weather.temp}°F</span>
            <span className="text-gray-400 text-[11px]">{weather.condition}</span>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            <span className="text-white font-semibold text-[15px]">N/A</span>
            <span className="text-gray-400 text-[11px]">Weather unavailable</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-8 w-0.5 bg-gradient-to-b from-transparent via-blue-500/50 to-transparent"></div>

      {/* NYC Label */}
      <div className="flex flex-col gap-0.5">
        <span className="text-white font-semibold text-[15px]">NYC</span>
        <span className="text-gray-400 text-[11px]">New York City</span>
      </div>
    </div>
  );
}
