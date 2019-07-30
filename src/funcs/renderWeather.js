import React from 'react';
import WeatherDetail from '../components/WeatherDetail';

const renderWeather = (args) => {
    return args.slice(0, 24).map(weather => <WeatherDetail key={weather.number} weather={weather} />);  
}

export default renderWeather;