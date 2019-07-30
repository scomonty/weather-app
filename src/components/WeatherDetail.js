import '../style/WeatherDetail.css';
import React from 'react';
import TimeStamp from '../funcs/TimeStamp.js';



const WeatherDetail = ({weather}) => {
	if(weather.number === 1) {
		return (
			<div className="currentForecastContainer">
				<div className="currentForecast">{weather.shortForecast}</div>
				<div className="currentTemp">{weather.temperature}&#176;F</div>
				<div className="currentWind">{weather.windDirection} {weather.windSpeed}</div>
			</div>
		)
	}
	return (
		<div className="hourlyForecast">
			<div>{TimeStamp(weather.startTime)}</div>
			<img src={`/weather-app/img/icons/${weather.shortForecast.toLowerCase().replace(/\s/g, "")}.png`} alt={weather.shortForecast} title={weather.shortForecast}></img>
			<div className="hourlyTemp">{weather.temperature}&#176;F</div>
		</div>
	)
}


export default WeatherDetail;
