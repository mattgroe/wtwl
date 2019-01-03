import React from 'react';
import { css } from 'glamor';

const OneDayTemp = (weather) => {

    // let newTime = new Date(weather.time);

    let wrapper= css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    })

    return (
        <div {...wrapper}>
            <span>One day forecast</span>
            <span>{Date(weather.time)}</span>
            <span>Summary: {weather.summary}</span>
            <span>Temperature: {weather.temp}</span>
            <span>Wind Speed: {weather.wind}</span>
            <span>Humidity: {weather.humidity}</span>
        </div>
    );
}

export default OneDayTemp;