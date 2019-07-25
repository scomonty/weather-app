import './style/Backgrounds.css';
import React from 'react';
import WeatherDetail from './WeatherDetail';
import LocationDetail from './LocationDetail';
import WeeklyDetail from './WeeklyDetail';
import Loader from './Loader';

const dummy = [{"number": 1,"startTime": "2019-07-25T10:00:00-05:00","isDaytime": true,"temperature": '?',"windSpeed": "","shortForecast": "failed to get current weather"},{"number": 2,"startTime": "2019-07-25T11:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 3,"startTime": "2019-07-25T12:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 4,"startTime": "2019-07-25T13:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 5,"startTime": "2019-07-25T14:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 6,"startTime": "2019-07-25T15:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 7,"startTime": "2019-07-25T16:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 8,"startTime": "2019-07-25T17:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 9,"startTime": "2019-07-25T18:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 10,"startTime": "2019-07-25T19:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 11,"startTime": "2019-07-25T20:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 12,"startTime": "2019-07-25T21:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 13,"startTime": "2019-07-25T22:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 14,"startTime": "2019-07-25T23:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 15,"startTime": "2019-07-25T00:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 16,"startTime": "2019-07-25T01:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 17,"startTime": "2019-07-25T02:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 18,"startTime": "2019-07-25T03:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 19,"startTime": "2019-07-25T04:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 20,"startTime": "2019-07-25T05:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 21,"startTime": "2019-07-25T06:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 22,"startTime": "2019-07-25T07:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 23,"startTime": "2019-07-25T08:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"},{"number": 24,"startTime": "2019-07-25T09:00:00-05:00","isDaytime": true,"temperature": 0,"shortForecast": "missing"}];



class WeatherApi extends React.Component {
    //set our initial state to empty array
    state = { weatherData: [], hourlyWeatherData: [], weeklyForecast: [], errorMessge: '' };

    componentWillMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) =>
            fetch(`https://api.weather.gov/points/${position.coords.latitude},${position.coords.longitude}`)
                .then((response) => response.json())
                //set the state for weatherData
                .then((responseData) => this.setState({ weatherData: responseData }))
                //call getLocalForcast once api data is returned and make second call to get local forecast
                .then(() => this.getLocalForcast(this.state.weatherData)),
                (err) => this.setState({ errorMessge: err.message })
        );
    }

    getLocalForcast(responseData) {
        //once we have the location forecast URL make call to second API for forecast details.
            const location = responseData.properties.forecastHourly;
            const weekly = responseData.properties.forecast;

            fetch(location)
                .then((response) => response.json())
                //set the state to 5 day forecast data
                .then((responseData) => this.setState({ hourlyWeatherData: responseData.properties.periods }))
                //if response returns an error just serve up a genaric background without hourly forecast
                .catch(error => this.setState({ hourlyWeatherData: dummy }) );

            fetch(weekly)
                .then((response) => response.json())
                //set the state to weekly forecast data
                .then((responseData) => this.setState({ weeklyForecast: responseData.properties.periods }))
                .catch(error => this.setState({ weeklyForecast: dummy }) );
        }


    renderWeather() {
        return this.state.hourlyWeatherData.slice(0, 24).map(weather => <WeatherDetail key={weather.number} weather={weather} />);  
    }

    renderWeekly() {
        return this.state.weeklyForecast.map(weekly => <WeeklyDetail key={weekly.number} weekly={weekly} />); 
    }

    renderLocation() {
        if (this.state.weatherData.hasOwnProperty('properties')) {
            return <LocationDetail location={this.state.weatherData.properties.relativeLocation.properties} />
        }
    }


    getWeatherForBackground(weather) {

        if (!weather.isDaytime ) {
            return(`night`)
        }
        if (weather.shortForecast.toLowerCase().includes('sunny')) {
            return('sunny');
        }
        if (weather.shortForecast.toLowerCase().includes('thunder')) {
            return('thunderstorm');
        }
        if (weather.shortForecast.toLowerCase().includes('fog')) {
            return('fog');
        }
        if (weather.shortForecast.toLowerCase().includes('failed')) {
            return('failedScreen');
        }
        return(weather.shortForecast.toLowerCase());
    }




    renderContent() {
        if(this.state.weatherData.length === 0) {
            return <div><Loader errorText="Please accept the location request" /></div>
        }
        if (this.state.weatherData.length !== 0 && !this.state.errorMessge) {
            return (
            <div className={this.state.hourlyWeatherData.slice(0, 1).map( week => this.getWeatherForBackground(week))}>
            {this.renderLocation()}
            <div className='TopSlider'>
            {this.renderWeather()}
            </div>
            <div className="detailContainer">
                {this.renderWeekly()}
                </div>
                        </div>
            )
        }
    }


    render() {
        console.log(this.state.hourlyWeatherData);
        return (
            <div>
            { this.renderContent() }
            </div>
        )
    }
}

export default WeatherApi;
