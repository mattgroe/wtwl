import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { oneDayRequest } from '../redux/actions/weather-actions';
import { Redirect } from 'react-router-dom';

import OneDayTemp from './forecastTemplates/OneDayTemp';

import load from '../media/ajax-loader-bw.gif';

class OneDay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: null,
            redirect: false
        }
    }
    

    getForecast() {
        
    }
    

    componentWillMount() {
        console.log('Component mounting...');
        if (this.props.position === undefined || this.props.position === '') {
            this.setState({redirect: true});
            console.log('Redirect set to true');
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);   //interval to get updating time
        //call redux apiRequest
        this.props.onApiRequest(this.props.position.latitude, this.props.position.longitude);
        //checking props
        console.log('Hey! Its props: ', this.props.weatherData)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        let wrapper= css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
        })

        if (this.state.redirect) {
            //true - return to home
            return (
                <Redirect 
                    to={{
                        pathname: '/',
                        state: { from: this.props.location}
                    }}
                />
            );
        } else {
            //false - stay
            return(
                <div {...wrapper}>
                    <div>
                        {this.props.data ?
                            <OneDayTemp 
                                summary= {this.props.data.currently.summary}
                                temp= {this.props.data.currently.temperature}
                                wind= {this.props.data.currently.windSpeed}
                                humidity= {this.props.data.currently.humidity}
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
}

const mapStateToProps = (state, props) => {
    return {
        position: state.position,
        data: state.data
    }
}

const mapActionToProps = {
    onApiRequest: oneDayRequest
};

export default connect(mapStateToProps, mapActionToProps)(OneDay);
