import './style/Backgrounds.css';
import React from 'react';
import WeatherDetail from './WeatherDetail';
import LocationDetail from './LocationDetail';
import WeeklyDetail from './WeeklyDetail';
import Loader from './Loader';

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
                .then((responseData) => this.setState({ hourlyWeatherData: responseData.properties.periods }));
                fetch(weekly)
        .then((response) => response.json())
        //set the state to weekly forecast data
        .then((responseData) => this.setState({ weeklyForecast: responseData.properties.periods }));
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

        if (weather.startTime.slice(11,13) > 22 && weather.startTime.slice(11,13) < 6 ) {
            return(`night`)
        }
        if (weather.shortForecast.toLowerCase().includes('sunny')) {
            return('sunny');
        }
        if (weather.shortForecast.toLowerCase().includes('thunder')) {
            return('thunderstorm');
        }
        return(`${weather.shortForecast.toLowerCase()}`);
    }




    renderContent() {
        if(this.state.weatherData.length === 0) {
            return <div><Loader errorText="Please accept the location request" /></div>
        }
        if (this.state.weatherData.length !== 0 && !this.state.errorMessge) {
            return <div className={this.state.hourlyWeatherData.slice(0, 1).map( week => this.getWeatherForBackground(week))}>
            {this.renderLocation()}
            <div className='TopSlider'>
            {this.renderWeather()}
            </div>
            <div className="detailContainer">
                {this.renderWeekly()}
                </div>
                        </div>
        }
    }


    render() {
        return (
            <div>
            { this.renderContent() }
            </div>
        )
    }
}

export default WeatherApi;
