import React, { useState, useEffect } from 'react';
import { MapPin, Thermometer, Cloud, Mountain, Compass, Plus, Minus } from 'lucide-react';

const FuturisticCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2024-06-28'));
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState({ name: 'Manila, PH', timezone: 'Asia/Manila' });
  const [weather, setWeather] = useState({ temp: 31, condition: 'Sunny' });
  const [compass, setCompass] = useState(1);
  const [altitude, setAltitude] = useState(13);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric',
      timeZone: location.timezone
    }).replace(/\//g, '-');
  };

  const getDayOfYear = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const dayCount = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
    return Math.min(dayCount, 364);
  };

  const switchLocation = () => {
    // Implement location switching logic here
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const incrementDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
  };

  const decrementDay = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 rounded-lg shadow-lg font-mono">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-5xl font-bold mb-2">
            {time.toLocaleTimeString('en-US', { hour12: false, timeZone: location.timezone })}
          </div>
          <div className="text-xl">{formatDate(currentDate)}</div>
          <div className="flex items-center mt-1">
            <button onClick={decrementDay} className="mr-2 p-1 bg-gray-700 rounded hover:bg-gray-600">
              <Minus size={12} />
            </button>
            <div className="text-sm">{getDayOfYear(currentDate)}/364</div>
            <button onClick={incrementDay} className="ml-2 p-1 bg-gray-700 rounded hover:bg-gray-600">
              <Plus size={12} />
            </button>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end mb-1">
            <MapPin size={16} className="mr-2" />{location.name}
          </div>
          <div className="flex items-center justify-end mb-1">
            <Compass size={16} className="mr-2" />{compass}°
          </div>
          <div className="flex items-center justify-end mb-1">
            <Thermometer size={16} className="mr-2" />{weather.temp}°C
          </div>
          <div className="flex items-center justify-end mb-1">
            <Mountain size={16} className="mr-2" />{altitude}m
          </div>
          <div className="flex items-center justify-end">
            <Cloud size={16} className="mr-2" />{weather.condition}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-8 gap-1 mb-4">
        <div className="text-center text-xs font-bold py-2"></div>
        {['1st day', '2nd day', '3rd day', '4th day', '5th day', '6th day', '7th day'].map((day, index) => (
          <div key={index} className="text-center text-xs font-bold py-2">
            {day}
          </div>
        ))}
        {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            <div className="flex items-center justify-center text-xs font-bold">
              {week}
            </div>
            {[...Array(7)].map((_, dayIndex) => (
              <div key={dayIndex} className="aspect-square flex items-center justify-center text-lg border border-gray-800">
                {weekIndex * 7 + dayIndex + 1}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={prevMonth} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">◀</button>
        <button onClick={switchLocation} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Switch Location
        </button>
        <button onClick={nextMonth} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">▶</button>
      </div>
    </div>
  );
};

export default FuturisticCalendar;
