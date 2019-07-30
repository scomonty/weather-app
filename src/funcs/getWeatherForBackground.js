const getWeatherForBackground = (weather) => {

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

export default getWeatherForBackground;