import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { css } from 'glamor';

import Navbar from './components/Navbar';
import Home from './components/Home';
import OneDay from './components/OneDay';

const About = () => { return (<div>About</div>) }
const Users = () => { return (<div>Users</div>) }

// color : '#33464E'
// color : '#2C3C43'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    let wrapper = css({
      backgroundColor: '#33464E',
      height: '100%',
      width: '100%'
    })

    let contentWrapper = css({
      height: '90%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    })

    return (
      <BrowserRouter>
        <div {...wrapper}>
          {/* Navbar */}
          <Navbar/>
          {/* Rendered components */}
          <div {...contentWrapper}>
            <Route path="/" exact component={Home} />
            <Route path="/today" component={OneDay} />
            <Route path="/users" component={Users} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
