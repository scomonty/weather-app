import './style/WeeklyDetail.css';
import React from 'react';


const WeeklyDetail = ({weekly}) => {
    console.log({weekly})
    if(!weekly.name.includes(' Night')){

	return (
    <div className="ui grid weeklyDetailContainer">
<div className="four wide column DayOfWeek">{weekly.name}</div>
<div className="four wide column TempOfWeek">{weekly.temperature}&#176;F</div>
<div className="four wide column ForecastOfWeek"><img src={`/img/icons/${weekly.shortForecast.toLowerCase().replace(/\s/g, "")}.png`} alt={weekly.shortForecast} title={weekly.shortForecast}></img></div>
<div className="four wide column Wind">{weekly.windSpeed}</div>
</div>
		)
}
return<div></div>
}


export default WeeklyDetail;
