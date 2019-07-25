import './style/WeatherDetail.css';
import React from 'react';


const TimeStamp = (time) => {
	let cut = time.slice(11,13);

	if (cut >= 13) {
		return cut = cut - 12 + ' PM';
	}
	else if (cut == 0) {
		return cut = 12 + ' AM';
	}
	else if (cut < 12){
		if(cut.charAt( 0 ) === '0') {
		 return cut = cut.slice( 1 ) + ' AM'
		}
		 return cut = cut + ' AM';
	}
		return cut = cut + ' PM'
}


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
