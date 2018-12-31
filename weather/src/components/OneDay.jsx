import React, { Component } from 'react';
import { css } from 'glamor';
import axios from 'axios';

class OneDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lon: null,
            currentForecast: null
        }
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
        this.getForecast = this.getForecast.bind(this);
        this.geoLocate = this.geoLocate.bind(this);
        this.forecastPromise = this.forecastPromise.bind(this);
    }
    
    displayLocationInfo(position) {
        console.log(position)
        const lng = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.setState({lat: latitude});
        this.setState({lon: lng});
        console.log(`longitude: ${ this.state.lon } | latitude: ${ this.state.lat }`);
    }

    getForecast() {
        // https://cors-anywhere.herokuapp.com/ <- infront of the api url to allow cors
        axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/dc11d929dc5e5ef61391814ae9f491e1/37.8267,-122.4233', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'user-key': 'dc11d929dc5e5ef61391814ae9f491e1'
            },
            crossdomain: true
        })
        .then(res => {
            console.log(res.data.currently);
            this.setState({currentForecast: res.data.currently});
        })
        .catch(err => {
            console.log(err);
        })
    }

    geoLocate = new Promise(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        } else {
            alert('You must allow location access to use this app.');
        }
    })
    
    forecastPromise = new Promise((resolve, reject) => {
        if (this.state.lan === null) {
            let reason = new Error('this.state.lan is null')
            reject(reason);
        } else {
            this.getForecast()
            resolve('Forecast set.');
        }
    })
    
    componentDidMount() {
        this.geoLocate.then((success) => {
            console.log(success)
            //other promise
            this.forecastPromise.then((success) => {
                console.log(success)
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    render() {



        return(
            <div>
                One day forecast
            </div>
        );
    }
}

export default OneDay;
