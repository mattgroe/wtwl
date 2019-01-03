import React, { Component } from 'react';
import { css } from 'glamor';
import axios from 'axios';

import OneDayTemp from './forecastTemplates/OneDayTemp';

import load from '../media/ajax-loader-bw.gif';

class OneDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lon: null,
            currentForecast: null,
            time: null
        }
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
        this.getForecast = this.getForecast.bind(this);
    }
    
    displayLocationInfo(position) {
        const lng = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.setState({lat: latitude});
        this.setState({lon: lng});
        console.log(`longitude: ${ this.state.lon } | latitude: ${ this.state.lat }`);
        this.getForecast();
    }

    getForecast() {
        // https://cors-anywhere.herokuapp.com/ <- infront of the api url to allow cors
        axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dc11d929dc5e5ef61391814ae9f491e1/33.0072064,-117.0497536', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'user-key': 'dc11d929dc5e5ef61391814ae9f491e1'
            },
            crossdomain: true
        })
        .then(res => {
            //console.log(res.data.currently);
            this.setState({currentForecast: res.data.currently});
            this.interval = setInterval(() => this.setState({ time: Date(this.state.currentForecast.time) }), 1000);
            console.log('Current Forecast: ',this.state.currentForecast);
        })
        .catch(err => {
            console.log(err);
        })
    }
    

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        }
    }

    componentDidUpdate() {

    }

    render() {

        let wrapper= css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
        })

        return(
            <div {...wrapper}>
                <div>
                    {this.state.currentForecast ?
                        <OneDayTemp 
                            summary= {this.state.currentForecast.summary}
                            temp= {this.state.currentForecast.temperature}
                            wind= {this.state.currentForecast.windSpeed}
                            humidity= {this.state.currentForecast.humidity}
                            time= {this.state.time}
                        />
                        :
                        <div>
                            <img src={load} alt='#'></img>
                        </div>
                    }
                    {/* <span>Summary: {this.state.currentForecast.summary}</span>
                    <span>Temperature: {this.setState.currentForecast.apparentTemperature}</span>
                    <span>Time: {this.state.currentForecast.time}</span>
                    <span>Wind Speed: {this.state.currentForecast.windSpeed}</span>
                    <span>Humidity: {this.state.currentForecast.humidity * 100}</span> */}
                </div>
            </div>
        );
    }
}

export default OneDay;
