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

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour: 'numeric', minute: '2-digit', hour12: true,
      }));
      setCurrentDate(now.toLocaleDateString('en-US', {
        timeZone: 'America/New_York',
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
      }));
    };
    updateTime();
    const t = setInterval(updateTime, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/New_York'
        );
        const data = await res.json();
        const codes: Record<number, string> = {
          0:'Clear Sky',1:'Mostly Clear',2:'Partly Cloudy',3:'Overcast',
          45:'Foggy',48:'Foggy',51:'Light Drizzle',53:'Drizzle',55:'Heavy Drizzle',
          61:'Light Rain',63:'Rain',65:'Heavy Rain',71:'Light Snow',73:'Snow',
          75:'Heavy Snow',80:'Light Showers',81:'Showers',82:'Heavy Showers',
          95:'Thunderstorm',96:'Thunderstorm',99:'Severe Thunderstorm',
        };
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: codes[data.current.weather_code] ?? 'Unknown',
        });
      } catch {}
    };
    fetchWeather();
    const t = setInterval(fetchWeather, 600000);
    return () => clearInterval(t);
  }, []);

  const cell = (main: React.ReactNode, sub: string, last = false) => (
    <div style={{
      flex: 1,
      padding: '16px 24px',
      borderRight: last ? 'none' : '1px solid #e0e0e0',
    }}>
      <div style={{
        fontFamily: 'var(--font-bebas, "Bebas Neue", sans-serif)',
        fontSize: '22px',
        letterSpacing: '0.04em',
        color: '#0a0a0a',
        lineHeight: 1,
        marginBottom: '4px',
      }}>{main}</div>
      <div style={{
        fontFamily: 'var(--font-space-mono, monospace)',
        fontSize: '10px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#888',
      }}>{sub}</div>
    </div>
  );

  return (
    <div style={{
      border: '2px solid #0a0a0a',
      display: 'flex',
      background: '#fff',
      width: '100%',
      maxWidth: '720px',
      margin: '0 auto',
    }}>
      {/* Label */}
      <div style={{
        background: '#0a0a0a',
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-space-mono, monospace)',
          fontSize: '9px',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--teal, #0b8a7a)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}>Live</span>
      </div>

      {cell(
        currentTime
          ? <>{currentTime} <span style={{color:'var(--teal,#0b8a7a)',fontSize:'14px'}}>EST</span></>
          : '––',
        currentDate || 'New York City'
      )}

      {cell(
        weather
          ? <>{weather.temp}<span style={{color:'var(--teal,#0b8a7a)',fontSize:'14px'}}>°F</span></>
          : '––',
        weather?.condition ?? 'Loading'
      )}

      {cell(
        <span style={{color:'var(--teal,#0b8a7a)'}}>NYC</span>,
        'New York City',
        true
      )}
    </div>
  );
}
