import React, { Component } from 'react';
import { css } from 'glamor';
import { connect } from 'react-redux';
import { showPosition } from '../redux/actions/pos-action';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lon: null
        }
        this.displayLocationInfo = this.displayLocationInfo.bind(this);
        this.fetchPosition = this.fetchPosition.bind(this);
        this.routeChange = this.routeChange.bind(this);
    }
    
    
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        } else {
            // not awesome...
            alert('You must allow location access to use this app.')
        }
    }
    
    displayLocationInfo(position) {
        //Once location is retrieved
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        this.setState({lat: lat});
        this.setState({lon: lng});
        console.log(`longitude: ${ this.state.lon } | latitude: ${ this.state.lat }`);
        // 1. dispatch action
        this.props.onGetLocation(lat, lng);
    }

    fetchPosition() {
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }

    routeChange() {
        let path = 'today';
        this.props.history.push(path);
    }

    render() {
        let title = css({
            marginTop: '15%',
            marginBottom: '10%',
            fontSize: '34px'
        })
    
        let wrapper = css({
            color: 'white',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
        })
    
        let homeWrapper = css({
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        })
    
        return(
            <div {...wrapper}>
                <span {...title}>What's the weather like?!</span>
                <div {...homeWrapper}>
                    <span>We can tell you!</span>
                    <span>This app uses your current location to grab weather data.</span>
                    <button type="button" className="btn btn-dark" onClick={this.fetchPosition}>Get Location</button>
                    {
                        this.props.position ? 
                            <div {...homeWrapper}>
                                <span>Your location should be a button below... Click it!</span>
                                <button type="button" className="btn btn-dark" onClick={this.routeChange}>{this.props.position.latitude},{this.props.position.longitude}</button>
                            </div>
                        : null
                    }
                </div>
    
            </div>
        );
    }

}

const mapStateToProps = (state, props) => {
    return {
        position: state.position
    }
}

const mapActionToProps = {
    onGetLocation: showPosition
};

export default connect(mapStateToProps, mapActionToProps)(Home);